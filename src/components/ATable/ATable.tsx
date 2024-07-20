import React, { useState, useEffect } from 'react';
import { Table, Tag, Avatar, Modal, Upload, message, Descriptions, Image } from 'antd';
import type { TableProps } from 'antd';
import Ajax from '../../until/ajax';
import SearchBar from '../SearchBar/SearchBar';

/* 
api:查询接口
mode：'get'|'post'// 一次全部获取数据|分页
*/

interface ATableProps extends TableProps<any> {

    api: string,
    mode?: 'get' | 'post',
    searchParam?: object,
    operate?: boolean,

}

function ATable(props: ATableProps) {

    const { api, mode = 'post', searchParam, operate = true, ...tableProps } = props;

    const [pageOption, setPageOption] = useState({ pageSize: 50, pageIndex: 1 })
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {


        let param = { type: mode, data: searchParam, sql_name: 'doc' }
        Ajax.post(api, param).then(res => {

            if (res.status === 200) {
                const { total, data } = res.data
                setTotal(total)
                setData(data)
            } else {
                message.error('数据请求失败')
            }

        })

    }, [])

    return (<>


        {/* <SearchBar></SearchBar> */}
        <Table

            {...tableProps}

            dataSource={tableProps.dataSource ?? data}
            pagination={tableProps.pagination ?? {
                pageSize: pageOption.pageSize,
                total: total,
                showTotal: (total) => {
                    return <>共 {total} 条</>
                },
                onChange: async (page, pageSize) => {
                    if (mode == 'post') {
                        let param = { type: mode, data: searchParam, sql_name: 'doc' }
                        Ajax.post(api, param).then(res => {

                            if (res.status === 200) {
                                const { total, data } = res.data
                                setTotal(total)
                                setData(data)
                            }

                        })
                    }
                }
            }}

        // style={{
        //     height: '80%',
        //     marginTop: '15px',
        //     paddingBottom: '0px',
        //     minHeight: '80%'
        // }}

        // scroll={{
        //     x: '100%',
        //     y: 'calc(100vh*0.5)',
        // }}

        />

    </>)

}

export default ATable;