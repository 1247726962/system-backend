import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { AModelInfo, SearchBar, ATable, DrawerForm } from '../../components';

import '../henye/style/style.scss';

function GoodsManage() {

    useEffect(() => {

    }, [])

    return (<>
        {/* <ATable
            api=""
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
        >

        </ATable> */}
    </>)

}

export default GoodsManage;