import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { AModelInfo, SearchBar, ATable, DrawerForm } from '../../components';
import moment from 'moment';

import '../henye/style/style.scss';

function expert() {


    useEffect(() => {


    }, [])

    const [formData, setFormData] = useState({})
    const [open, setOpen] = useState(false)

    return (<>
        <AModelInfo open={false} data={{ test: 'ajhsd' }} options={[{ label: '123', field: 'test', render: (i) => { '46' } }]}></AModelInfo>

        <div style={{ margin: '30px', padding: '30px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', height: '100%' }}>
            <SearchBar defaultVlue={{ testpdoafpajuio: '1', test: "hasdu", testpdoafp: [moment('2022-04-05'), moment('2022-04-08')] }} items={[
                { label: '测试1', type: "input", field: "test", rules: [{ required: true, message: '此项必填' }] },
                { label: '测试2', type: "select", field: "testdfaj", options: [{ label: '123', value: '123', key: 1 }] },
                { label: '测试3', type: "datePicker", field: "testpdoafp" },
                { label: '测试4', type: "radio", field: "testpdoafpajuio", options: [{ label: "1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddd", value: "1", disabled: true }, { label: "2", value: "2" }, { label: "3", value: "3" }] },
                { label: '测试1', type: "input", field: "test", rules: [{ required: true, message: '此项必填' }] },
                { label: '测试2', type: "select", field: "testdfaj", options: [{ label: '123', value: '123', key: 1 }] },
                { label: '测试3', type: "datePicker", field: "testpdoafp" },
            ]} onSearch={(e) => { console.log(e) }}></SearchBar >

            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                <Button type="primary" onClick={() => {
                    setOpen(true)
                    console.log(123)
                }}>
                    新增
                </Button>
            </div>

            <DrawerForm open={open} data={formData} fields={[
                { label: '名称', field: 'name', type: "upload", rules: [{ required: true }] },
                { label: '开关', field: 'adb', type: "checkbox", rules: [{ required: true }] }
            ]} onConfirm={(e: any) => {
                console.log(e)
                // setFormData()
                setOpen(false)
            }} onCancel={() => {
                setOpen(false)
            }}></DrawerForm>

            <ATable
                api='/api/action'
                mode='post'
                columns={[
                    { key: 'sort', title: '序号', dataIndex: 'sort', width: 100, align: 'center', fixed: 'left', render: (text, o, v) => <span>{ }</span> },
                    { key: 'name', title: '商品名称', dataIndex: 'Name', width: 250, fixed: 'left', render: (text) => <a>{text}</a> },
                    { key: 'cover', title: '封面', dataIndex: 'orderNumber', width: 250, align: 'center', render: (text) => <a>{text}</a> },
                    { key: 'state', title: '', dataIndex: 'state', width: 100, align: 'center', render: (text) => <a>{ }</a> },
                    { key: '-', title: '销售', dataIndex: '-', render: (text) => <a>-</a> },
                    
                    {
                        key: 'operate', title: '操作', dataIndex: 'operate', fixed: 'right', width: 200, render: (_, record) => (

                            <a >详情</a>

                        ),
                    }
                ]}
            ></ATable>
        </div>
    </>)

}

export default expert;