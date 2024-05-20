import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '../../until/icon'
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { Input, message, Button } from 'antd';
import { IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';
import Ajax from '../../until/ajax';
import { listSort } from '../../until/until';

import Cell from '../../components/cell/cell';

function CustomEditor() {

  const [editor, setEditor] = useState<IDomEditor | null>(null)
  // const [html, setHtml] = useState(<p>hello</p>)
  const [str, setStr] = useState('')
  const [images, setImages] = useState([])

  let editorConfig = {   // TS 语法
    placeholder: '内容...',
    MENU_CONF: {},
    withCredentials: true,
    readOnly: true
  } as any

  editorConfig.MENU_CONF['uploadImage'] = {
    server: 'http://localhost:8080/api/editorUpload',
    fieldName: 'editorImage',
  }
  editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode) {  // TS 语法
      // onInsertedImage(imageNode) {                    // JS 语法
      if (imageNode == null) return

      const { src, alt, url, href } = imageNode
      setImages([...images, src])
    }
  }

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [currentId, setId] = useState('')

  useEffect(() => {
    let param = { type: 'get', data: {}, sql_name: 'doc' }
    Ajax.post('/api/action', param).then(res => {
      if (res.status === 200) {
        
        setNotes(listSort(res.data))

        if (res.data.length != 0) {
          setTitle(res.data[0].title)
          setStr(res.data[0].content)
        }

      }
    })

  }, [])

  const add = () => {

    if (!disabled) {
      message.success('文档还未保存')
      return
    }

    let param = { type: 'put', data: { title: '无标题文档', pre: notes[notes.length - 1] ? notes[notes.length - 1]._id : null }, sql_name: 'doc' }
    //创建新文档请求
    Ajax.post('/api/action', param).then(res => {

      if (res.status === 200) message.success('添加新文档成功')
      //ui层

      editor.enable()
      setDisabled(false)
      setId(res.data._id)
      setNotes([...notes, { _id: res.data._id, title: '', sort: notes.length + 1, content: '' }])
      setTitle('')
      setStr('')
    })

  }

  const Delete = async (_id) => {
    let param1 = { type: 'delete', data: { _id }, sql_name: 'doc' }

    let nextData = notes.find(i => { return i.pre === _id })
    let data = notes.find(i => { return i._id === _id })

    Ajax.post('/api/action', param1).then(res => {
      if (res.status === 200) message.success('删除文档成功')

      let newNotes = notes.filter(i => { return i._id !== _id })
      setNotes(newNotes)

    })

    if (nextData) {
      nextData.pre = data.pre
      let param2 = { type: 'patch', newData: { pre: nextData.pre }, oldData: { _id: nextData._id }, sql_name: 'doc' }
      Ajax.post('/api/action', param2).then(res => {
        if (res.status === 200) {

          let index = notes.findIndex(i => { return i._id == nextData._id })
          let newNotes = [...notes]
          newNotes[index].pre = nextData.pre
          setNotes(newNotes)

        }
      })
    }

  }

  const edit = (_id) => {
    let data = notes.find(i => { return i._id == _id })
    editor.enable()
    setDisabled(false)
    setId(_id)
    setTitle(data.title)
    setStr(data.content)
  }

  const save = () => {
    if (!currentId) return
    let formData = {
      title: title,
      content: str,
    }
    let param = { type: 'patch', newData: formData, oldData: { _id: currentId }, sql_name: 'doc' }
    Ajax.post('/api/action', param).then(res => {
      if (res.status === 200) {
        message.success('文档已保存')
        let index = notes.findIndex(i => { return i._id == currentId })
        notes[index] = { ...notes[index], ...formData }
        setNotes(notes)
        editor.disable()
        setDisabled(true)
      }
    })

  }

  editorConfig.onChange = (editor: IDomEditor) => {
    // editorConfig.onChange = (editor) => {
    // editor changed
  }

  editorConfig.onBlur = (editor: IDomEditor) => {

  }

  editorConfig.onFocus = (editor: IDomEditor) => {
    // editorConfig.onFocus = (editor) => {
    // editor focused
  }

  const [currentDrag, setDrag] = useState<String>('')
  const [endDrag, setEndDrag] = useState<String>('')
  const dragSort = (current_id, end_id) => {
    if (current_id === end_id) {
      setEndDrag('')
      return
    }
    let data = notes.find(i => { return i._id === current_id })

    let newNotes = notes.filter(i => { return i._id !== current_id })

    let index = notes.findIndex(i => { return i._id === end_id })
    newNotes.splice(index, 0, data)

    if (newNotes[0].pre) {
      let param3 = { type: 'patch', newData: { pre: '' }, oldData: { _id: newNotes[0]._id }, sql_name: 'doc' }
      Ajax.post('/api/action', param3).then(res => { if (res.status === 200) { } })
    }
    //以当前数据为上一条的数据
    let nextData = notes.find(i => { return i.pre === current_id })
    if (nextData) {
      let param1 = { type: 'patch', newData: { pre: data.pre ?? null }, oldData: { _id: nextData._id }, sql_name: 'doc' }
      Ajax.post('/api/action', param1).then(res => { if (res.status === 200) { } })
    }

    let param2 = { type: 'patch', newData: { pre: newNotes[index - 1]._id ?? null }, oldData: { _id: data._id }, sql_name: 'doc' }
    Ajax.post('/api/action', param2).then(res => { if (res.status === 200) { } })

    if (newNotes[index + 1]) {
      let param3 = { type: 'patch', newData: { pre: data._id }, oldData: { _id: newNotes[index + 1]._id }, sql_name: 'doc' }
      Ajax.post('/api/action', param3).then(res => { if (res.status === 200) { } })
    }

    setEndDrag('')
    setNotes(newNotes)

  }
  //自定义主题色
  //color:[ backgroundColor:'black', background-image: linear-gradient(60deg, #29323c 0%, #485563 100%); ]
  return (
    <div className='editor' style={{ height: '100vh', display: 'flex', }}>
      <div style={{ height: '100vh', width: '250px', backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' }}>
        <div className='menu'>
          <div style={{ padding: '20px', fontSize: '2rem', fontFamily: 'cursive', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>文档 <PlusOutlined onClick={() => add()} style={{ fontSize: '1rem' }} /></div>
          <div className='title' style={{ padding: '20px', fontSize: '26px', fontFamily: 'cursive', color: '#fff' }}>
            {notes.map((i, o) => {
              return <Cell select={i._id === endDrag} onDragEnter={(_id, e) => {
                setEndDrag(_id)
              }} onDragStart={(_id, e) => { setDrag(_id) }} onDragEnd={(_id, e) => { dragSort(currentDrag, endDrag) }} key={i._id} title={`${o + 1}，${i && i.title == '' ? '无标题文档' : i.title}`} _id={i._id} onDelete={(_id) => {
                Delete(_id)
              }} onEdit={(_id) => edit(_id)} ></Cell>

            })}
          </div>
        </div>
      </div>

      <div style={{ height: '100vh', width: '100%', padding: '30px', display: 'flex', flexDirection: "column" }}>

        {/* <div style={{}}> {html} </div>
        <div id='content'></div> */}

        <div style={{ border: '1px solid #ccc', zIndex: 100, height: '100%' }}>

          <Toolbar
            editor={editor}
            defaultConfig={{}}
            mode="default"
            style={{ borderBottom: '1px solid #ccc', height: '50px' }}
          />
          <Input disabled={disabled} className='title' value={title} onChange={e => { setTitle(e.target.value) }} placeholder="标题" bordered={false} style={{ height: '100px', fontSize: '2rem' }} />
          <Editor
            // defaultHtml={str}
            defaultConfig={editorConfig}
            value={str}
            onCreated={setEditor}
            onChange={editor => {
              setStr(editor.getHtml())
              // document.getElementById('content').innerHTML = editor.getHtml()
            }}
            mode="default"
            style={{ height: '500px', overflowY: 'hidden', fontSize: '1.2rem' }}
          />

        </div>

        <div style={{ textAlign: 'center', marginTop: '10px', borderRadius: '10px' }}><Button onClick={() => save()}>保存文档</Button></div>
      </div>

    </div>
  )
}

export default CustomEditor;


// function HTMLDecode(text) {
//   var temp = document.createElement("div");
//   temp.innerHTML = text;
//   var output = temp.innerText || temp.textContent;
//   temp = null;
//   return output;
// }
// function HTMLEncode(html) {
//   var temp = document.createElement("div");
//   (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
//   var output = temp.innerHTML;
//   temp = null;
//   return output;
// }

