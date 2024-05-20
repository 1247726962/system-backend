import React, { useState } from 'react';
import { Input, Button, Select, Radio, DatePicker } from 'antd';
import { SearchOutlined, UndoOutlined } from '../../../until/icon';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import '../style/searchOption.scss';


interface SearchOptionProps {
    onSearch?: (param: {}) => void
}

function SearchOption(props: SearchOptionProps) {

    const { onSearch } = props;

    let initSearchParam = {} as any
    let searchOption = [
        { label: '订单编号', field: 'orderNumber' },
        { label: '企业名称', field: 'Name' },
        { label: '统一社会信用代码', field: 'CreditCode' },
        { label: '受理人手机号码', field: 'phone' },
        { label: '法人姓名', field: 'OperName' },
        { label: '服务项目', field: 'project' },
        { label: '支付状态', field: 'state' },
        { label: '支付时间', field: 'orderTime' },
    ]

    searchOption.map(i => {
        initSearchParam[i.field] = ''
    })
    initSearchParam.state = '全部'

    let dropdownItems = [
        { label: '年报申请', key: '1', value: "年报申请" },
        { label: '线上作废', key: '2', value: "线上作废" },
        { label: '税务注销', key: '3', value: "税务注销" },
        { label: '线下注销', key: '4', value: "线下注销" },
    ];

    const [searchParam, setSearchParam] = useState(initSearchParam as any);
    const [date, setDate] = useState(['', ''] as any);

    return (<>


        <div className='searchOptions'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='option' >
                    <span className='option_title'>订单编号：</span>
                    <Input
                        value={searchParam.orderNumber}
                        onChange={(e) => {
                            let param = { ...searchParam, orderNumber: e.target.value }
                            setSearchParam(param)
                        }}
                        placeholder="订单编号" />
                </div>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '40%' }}>企业名称：</span>
                    <Input
                        value={searchParam.Name}
                        onChange={(e) => {
                            let param = { ...searchParam, Name: e.target.value }
                            setSearchParam(param)
                        }}
                        placeholder="企业名称"
                    /></div>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '60%' }}>统一社会信用代码：</span>
                    <Input
                        value={searchParam.CreditCode}
                        onChange={(e) => {
                            let param = { ...searchParam, CreditCode: e.target.value }
                            setSearchParam(param)
                        }}
                        placeholder="统一社会信用代码"
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "15px" }}>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '40%' }}>法人姓名：</span>
                    <Input
                        value={searchParam.OperName}
                        onChange={(e) => {
                            let param = { ...searchParam, OperName: e.target.value }
                            setSearchParam(param)
                        }}
                        placeholder="法人姓名"
                    />
                </div>

                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '40%' }}>服务项目：</span>
                    <Select
                        style={{ width: '100%' }}
                        value={searchParam.project == '' ? null : searchParam.project}
                        onSelect={(e) => {
                            let param = { ...searchParam, project: e }
                            setSearchParam(param)
                        }}
                        placeholder="服务项目"
                        options={dropdownItems}
                    ></Select>
                </div>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '60%' }}>受理人手机号码：</span>
                    <Input
                        value={searchParam.phone}
                        onChange={(e) => {
                            let param = { ...searchParam, phone: e.target.value }
                            setSearchParam(param)
                        }}
                        placeholder="受理人手机号码"
                    />
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: "15px" }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '7%' }}>支付状态：</span>
                    <Radio.Group value={searchParam.state} onChange={e => {
                        let param = { ...searchParam, state: e.target.value }
                        setSearchParam(param)
                    }} optionType="button" buttonStyle="solid">
                        <Radio.Button value="全部">全部</Radio.Button>
                        <Radio.Button value="未支付">未支付</Radio.Button>
                        <Radio.Button value="已支付">已支付</Radio.Button>
                        <Radio.Button value="已回执">已回执</Radio.Button>
                        <Radio.Button value="退款中">退款中</Radio.Button>
                        <Radio.Button value="退款成功">退款成功</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "15px" }}>
                <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span style={{ wordWrap: 'break-word', width: '40%' }}>支付时间：</span>
                    <DatePicker.RangePicker
                        value={searchParam.orderTime == '' ? ['', ''] : date}
                        style={{ width: '100%' }}
                        locale={locale}
                        onChange={(e, o) => {
                            let param = { ...searchParam, orderTime: o }
                            setDate(e)
                            setSearchParam(param)
                        }}
                    />
                </div>
                <div>
                    <Button type="primary" icon={<SearchOutlined />}
                        onClick={() => { onSearch(searchParam) }}
                    >查询</Button>
                    <Button icon={<UndoOutlined />} onClick={() => {

                        setSearchParam(initSearchParam)

                    }}>重置</Button>
                </div>
            </div>

        </div>

    </>)

}

export default SearchOption;



