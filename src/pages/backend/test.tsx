import React, { useState, useEffect } from 'react';
import { SearchBar, ATable } from '../../components/index';
import { Breadcrumb, Layout, Menu } from 'antd';
import moment from 'moment';

const { Header, Content, Footer } = Layout;
function Test() {

    return (<>

        <SearchBar defaultVlue={{ testpdoafpajuio: '1', test: "hasdu", testpdoafp: [moment('2022-04-05'), moment('2022-04-08')] }} 
        items={[
            { label: '测试12156156', type: "input", field: "test", rules: [{ required: true, message: '此项必填' }] },
            { label: '测试2', type: "select", field: "testdfaj", options: [{ label: '123', value: '123', key: 1 }] },
            { label: '测试3', type: "datePicker", field: "testpdoafp" },
            { label: '测试4', type: "radio", field: "testpdoafpajuio", options: [{ label: "1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddd", value: "1", disabled: true }, { label: "2", value: "2" }, { label: "3", value: "3" }] },
            { label: '测试1', type: "input", field: "test", rules: [{ required: true, message: '此项必填' }] },
            { label: '测试2', type: "select", field: "testdfaj", options: [{ label: '123', value: '123', key: 1 }] },
            { label: '测试3', type: "datePicker", field: "testpdoafp" },
            { label: '测试1', type: "input", field: "test", rules: [{ required: true, message: '此项必填' }] },
            { label: '测试2', type: "select", field: "testdfaj", options: [{ label: '123', value: '123', key: 1 }] },
            { label: '测试3', type: "datePicker", field: "testpdoafp" },
        ]} onSearch={(e) => { console.log(e) }}></SearchBar >

        <Content style={{ padding: '0 50px' }}>
            {/* <div style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', margin: '1.5%', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '30px' }}> */}
                <ATable
                    api='/api/action'
                    mode='post'
                    columns={[
                        { key: 'sort', title: '序号', dataIndex: 'sort', width: 100, align: 'center', fixed: 'left', render: (text, o, v) => <span>{ }</span> },
                        { key: 'Name', title: '企业名称', dataIndex: 'Name', width: 250, fixed: 'left', render: (text) => <a>{text}</a> },
                        { key: 'orderNumber', title: '订单编号', dataIndex: 'orderNumber', width: 250, align: 'center', render: (text) => <a>{text}</a> },
                        { key: 'state', title: '支付状态', dataIndex: 'state', width: 100, align: 'center', render: (text) => <a>{ }</a> },
                        { key: '-', title: '销售', dataIndex: '-', render: (text) => <a>-</a> },
                        { key: 'OperName', title: '法定代表人', dataIndex: 'OperName', width: 120, render: (text) => <a>{text}</a> },
                        { key: 'CreditCode', title: '统一社会信用编码', dataIndex: 'CreditCode', width: 250, render: (text) => <a>{text}</a> },
                        { key: 'project', title: '服务项目', dataIndex: 'project', width: 250, align: 'center', render: (text, o) => <a>{text + `(${o.price})`}</a> },
                        { key: 'preferential', title: '优惠金额', dataIndex: 'preferential', width: 100, render: (text) => <a>{text}</a> },
                        { key: 'phone', title: '受理人手机号码', dataIndex: 'phone', width: 150, render: (text) => <a>{text}</a> },
                        { key: 'code', title: '认证码', dataIndex: 'code', width: 150, render: (text) => <a>6688</a> },
                        { key: 'orderTime', title: '下单时间', dataIndex: 'orderTime', width: 180, render: (text) => <a>{text}</a> },
                        { key: 'payTime', title: '支付时间', dataIndex: 'orderTime', width: 180, render: (text) => <a>{text}</a> },
                        { key: 'pay', title: '实付', dataIndex: 'pay', width: 150, fixed: 'right', render: (text, o) => <a>实付：{(o.price * 100 - o.preferential * 100) / 100}</a> },
                        {
                            key: 'operate', title: '操作', dataIndex: 'operate', fixed: 'right', width: 200, render: (_, record) => (

                                <a >详情</a>

                            ),
                        }
                    ]}
                ></ATable>
            {/* </div > */}
        </Content>

    </>)

}

export default Test;