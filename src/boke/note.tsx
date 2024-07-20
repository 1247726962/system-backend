import React, { useState, useEffect } from 'react';
import { CheckOutlined } from "../until/icon";
import { Button } from 'antd';
import Ajax from '../until/ajax';
import { toChineseNumber, listSort } from '../until/until';

function Note() {

    document.title = '王小二知识库'

    const [currentNotes, setCurrentNotes] = useState(0)
    const [notes, setNotes] = useState([])

    const get = () => {
        let param = { type: 'get', data: {}, sql_name: 'doc' }
        Ajax.post('/api/action', param).then(res => {
            if (res.status === 200) {
                let notes = listSort(res.data)
                setNotes(notes)
                document.getElementById('content').innerHTML = notes[currentNotes].content
            }
        })
    }
    useEffect(() => {
        var link = document.createElement("link");
        link.rel = "icon"
        link.href = "./favicon.png"
        document.head.appendChild(link)
        get()
    }, [])

    return <div style={{ height: '100vh', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>

        <div className='top'>
            <div style={{ fontFamily: 'cursive' }}>王小二知识库</div>
            <Button type="primary" className='login_button' onClick={() => { window.location.hash = '/login' }}>登录</Button>
        </div>

        <div className='note_container'>

            <div className='left_sidebar'>
                {/*  */}
                <div className='menu'>
                    <div style={{ padding: '20px', fontSize: '26px', fontFamily: 'cursive' }}>王小二知识库</div>
                    {
                        notes.map((i, o) => {
                            return <div className='title' onClick={() => {
                                setCurrentNotes(o)
                                document.getElementById('content').innerHTML = notes[o].content || '暂无内容'
                            }}> <div>{toChineseNumber(o + 1) + '，' + i.title}</div> {currentNotes === o ? <CheckOutlined style={{ color: 'green', display: 'flex', alignItems: 'center' }} /> : null} </div>
                        })
                    }

                </div>
                {/* <div style={{ height: '100%', width: '2px', backgroundColor: '#000000', display:'inline-block', cursor:'w-resize' }} onMouseMove={(e)=>{ console.log(e) }}></div> */}

            </div>

            <div className='content'>

                <div style={{ width: '100%', height: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '20px', overflow: 'auto' }}>

                    <div className='content_title'> {notes[currentNotes] ? notes[currentNotes].title : ''} </div>

                    <div id='content' style={{ padding: '0 50px' }}></div>

                </div>

            </div>

        </div>

    </div>

}

export default Note;