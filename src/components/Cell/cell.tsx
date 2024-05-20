import './style/cell.scss'
import React, { useState } from 'react';
import { Popover } from 'antd';
import { FormOutlined, DeleteOutlined } from '../../until/icon';

interface cellProps {
    select?: Boolean,
    title: string,
    _id: string,
    onDelete?: (_id: string) => void,
    onEdit?: (_id: string) => void,
    onDragEnter?: (_id: string, e: any) => void;
    onDragStart?: (_id: string, e: any) => void;
    onDragEnd?: (_id: string, e: any) => void;
}

function Cell(props: cellProps) {

    const { select = false, title, _id, onDelete, onEdit, onDragEnter, onDragStart, onDragEnd } = props;

    const [open, setOpen] = useState(false)
    const operateOption = () => {

        return <>
            <div>
                <div style={{ cursor: 'pointer' }} onClick={() => {
                    onEdit(_id)
                    setOpen(false)
                }}><FormOutlined />编辑</div>
                <div style={{ cursor: 'pointer' }} onClick={() => {
                    onDelete(_id)
                    setOpen(false)
                }}><DeleteOutlined />删除</div>
            </div>
        </>

    }

    return <>
        <div style={select ? { borderBottom: '1px #ade0ff solid' } : {}} title={title} draggable='true' onDragStart={(e) => { onDragStart(_id, e) }} onDragEnter={(e) => { onDragEnter(_id, e) }} onDragEnd={(e) => { onDragEnd(_id, e) }} className='cell' >
            <div className='title'>{title}</div>

            <Popover open={open} placement="bottomLeft" content={operateOption} trigger="click">
                <div className='other' onClick={() => { setOpen(true) }} style={{ transform: 'rotate(90deg)', display: 'inline-block', cursor: 'pointer' }}>...</div>
            </Popover>

        </div>
    </>

}

export default Cell;