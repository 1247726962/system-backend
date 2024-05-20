import React, { useState, useEffect } from 'react';
import { Menu, Table, Tag, Avatar, Modal, Upload, message, Descriptions, Image } from 'antd';
import { MenuOutlined, ZoomInOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from '../../until/icon';
import * as qiniu from 'qiniu-js';
import SearchOption from './components/SearchOption';
import '../henye/style/style.scss';

let wx = {} as any

async function post(sql_name, data = {} as any, pageOption = { pageSize: 50, pageIndex: 1 }, openid = false) {
    let sort = {}
    if (data.orderBy) {
        //@ts-ignore
        sort.orderBy = data.orderBy
        delete data.orderBy
    }
    //@ts-ignore
    return wx.cloud.callFunction({
        name: 'web',
        data: {
            type: "post",
            sql_name: sql_name,
            openid: openid,
            ...sort,
            ...pageOption,
            data,
        },
    }).then(res => { return res.result })
}

async function patch(sql_name, oldData = {}, newData = {}) {
    //@ts-ignore
    return wx.cloud.callFunction({
        name: 'action',
        data: {
            type: "patch",
            sql_name: sql_name,
            oldData,
            newData,
        },
    }).then(res => {
        return res.result
    })

}

const tagRender = (state) => {
    switch (state) {
        case '未支付':
            return <Tag color="#2db7f5">未支付</Tag>
        case '已支付':
            return <Tag color="#87d068">已支付</Tag>
        case '已回执':
            return <Tag color="#cd201f">已回执</Tag>
        case '退款中':
            return <Tag color="warning">退款中</Tag>
        case '退款成功':
            return <Tag color="#f50">退款成功</Tag>
        default:
            return <></>
    }
}

let uploadToken = ''

function HenyeOrders() {

    document.title = '系统管理'

    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)
    const [pageOption, setPageOption] = useState({ pageSize: 50, pageIndex: 1 })
    const [searchParam, setSearchParam] = useState({} as any)
    const [imageUrl, setImageUrl] = useState([]);
    const [loading, setLoading] = useState(false);
    const [henyeIdentity, setHenyeIdentity] = useState('业务员');


    const search = async (searchParam, pageOption) => {
        let result = await post('orders', { ...searchParam, orderBy: ['orderTime', 'desc'] }, pageOption)
        result.data.map((i, o) => { i.key = o })

        setOrders(result.data)
        setTotal(result.total)
    }

    useEffect(() => {

        let henyeIdentity = window.localStorage.getItem('henyeIdentity')
        setHenyeIdentity(henyeIdentity)

        let script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = 'https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.4.0/cloud.js';
        script2.onload = () => {
            new Promise(async (resolve, reject) => {
                //@ts-ignore
                var c1 = new window.cloud.Cloud({
                    resourceAppid: 'wxe718b9ea9d043bce', // 资源方 AppID
                    resourceEnv: 'goshang-0gr9za8s37caad8e',// 资源方环境 ID
                    identityless: true,// 必填，表示是未登录模式
                })
                await c1.init()
                wx.cloud = c1

                await search(searchParam, pageOption)

            })
        }
        script2.async = false
        document.getElementById('root').appendChild(script2);

    }, [])

    const [item, setItem] = useState({} as any);
    const columns = [
        { key: 'sort', title: '序号', dataIndex: 'sort', width: 100, align: 'center', fixed: 'left', render: (text, o, v) => <span>{pageOption.pageSize * (pageOption.pageIndex - 1) + v + 1}</span> },
        { key: 'Name', title: '企业名称', dataIndex: 'Name', width: 250, fixed: 'left', render: (text) => <a>{text}</a> },
        { key: 'orderNumber', title: '订单编号', dataIndex: 'orderNumber', width: 250, align: 'center', render: (text) => <a>{text}</a> },
        { key: 'state', title: '支付状态', dataIndex: 'state', width: 100, align: 'center', render: (text) => <a>{tagRender(text)}</a> },
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
                <span>
                    <a style={{ fontSize: '10px' }} onClick={() => {
                        let data = { ...record }
                        data['-'] = '-'
                        data.code = 6688
                        data.preferential = data.preferential + ' 元'
                        data.pay = (record.price * 100 - record.preferential * 100) / 100 + ' 元'
                        setItem(data)
                        setIsModalInfoOpen(true)
                    }}><ZoomInOutlined style={{ fontSize: '15px' }} />详情</a>
                    {
                        henyeIdentity === '业务员' ? <></> : <>
                            <a style={{ fontSize: '10px', marginLeft: '10px' }} onClick={() => {
                                setItem(record)
                                setImageUrl(record.img ? record.img.map(i => { return { uid: i, status: 'done', url: i } }) : [])
                                wx.cloud.callFunction({
                                    name: 'getUploadToken',
                                    data: {},
                                }).then(res => {
                                    uploadToken = res.result.uploadToken
                                })
                                showModal()
                            }}><UploadOutlined style={{ fontSize: '15px' }} />上传结果</a>
                        </>
                    }
                </span>
            ),
        }
    ];

    const upload = (item, uploadToken, file) => {
        const options = {
            quality: 0.92,
            noCompressIfLarger: true
        }
        let key = item.orderNumber + new Date().getTime()
        let putExtra = {}
        let config = {}
        const observer = {
            next(res) {
                let { percent } = res.total;
                if (percent == 100) {
                    message.success('上传成功')

                    setImageUrl([...imageUrl, { uid: `http://photo.flowercat.top/${key}`, status: 'done', url: `http://photo.flowercat.top/${key}` }])
                    patch('orders', { _id: item._id }, { img: { _: true, method: "addToSet", value: `http://photo.flowercat.top/${key}` } })

                    let newOrders = [...orders]
                    let index = newOrders.findIndex(i => { return i._id == item._id })
                    if (newOrders[index].img) {
                        newOrders[index].img = [...newOrders[index].img, `http://photo.flowercat.top/${key}`]
                    } else {
                        newOrders[index].img = [`http://photo.flowercat.top/${key}`]
                    }
                    setOrders(newOrders)

                }
                setLoading(false);
            },
            error(err) {
                setLoading(false);
            },
            complete(res) {
                // ...
            }
        }
        qiniu.compressImage(file, options).then(data => {
            const observable = qiniu.upload(data.dist as any, key, uploadToken, putExtra, config)
            const subscription = observable.subscribe(observer) // 上传开始
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);

    const showModal = () => {

        setIsModalOpen(true);

    };
    const handleOk = () => {

        setImageUrl([])
        setIsModalOpen(false);

    };
    const handleCancel = () => {

        setImageUrl([])
        setIsModalOpen(false);

    };


    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (<>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
            <Modal title={"上传回执" + '(' + item.Name + ')'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='确定' cancelText="取消" destroyOnClose={true}>
                <Upload
                    fileList={imageUrl}
                    accept="image/png, image/jpg"
                    maxCount={2}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    onChange={({ file, fileList }) => {

                        if (file.status === 'uploading') {
                            setLoading(true);
                        }
                        if (file.status! == 'uploading') {
                            if (file.size > 1024 * 1024 * 2) {
                                message.warning('图片大小超过限制，最大2M')
                                setLoading(false);
                                return
                            }
                            let realFile = file.originFileObj
                            upload(item, uploadToken, realFile)

                        }
                    }}
                    onRemove={(file) => {
                        wx.cloud.callFunction({
                            name: 'getUploadToken',
                            data: {
                                type: 'delete',
                                key: file.url.split('http://photo.flowercat.top/')[1]
                            },
                        }).then(res => { })
                        setImageUrl(imageUrl.filter(i => { return i.url != file.url }))
                        patch('orders', { _id: item._id }, { img: { _: true, method: "pull", value: file.url } })

                        let newOrders = [...orders]
                        let index = newOrders.findIndex(i => { return i._id == item._id })
                        newOrders[index].img = newOrders[index].img.filter(i => { return i != file.url })

                        setOrders(newOrders)

                        return true
                    }}
                >
                    {/* {imageUrl.map(i => {
                        return <img src={i} alt="加载失败" style={{ width: '100%' }} />
                    })} */}
                    {imageUrl.length < 2 ? uploadButton : null}
                </Upload>
            </Modal>

            <Modal width='80%' title="订单详情" open={isModalInfoOpen} onOk={() => { setIsModalInfoOpen(false) }} onCancel={() => { setIsModalInfoOpen(false) }} okText='确定' cancelText="取消" destroyOnClose={true}>
                <Descriptions bordered>
                    {columns.map(i => {
                        if (i.title == '序号' || i.title == '操作') return <></>
                        if (i.title == '支付状态') return <Descriptions.Item label={i.title}>{tagRender(item[i.dataIndex])}</Descriptions.Item>
                        return <Descriptions.Item label={i.title}>{item[i.dataIndex]}</Descriptions.Item>
                    })}
                    <Descriptions.Item label='回执单截图'>{item.img && item.img.length != 0 ?
                        item.img.map(i => {
                            return <Image
                                width={200}
                                src={i}
                            />
                        }) : <span style={{ color: 'red' }}>暂未回执</span>}</Descriptions.Item>
                </Descriptions>
            </Modal>

            <div style={{ width: '15%' }}>
                <div style={{ backgroundColor: '#001529', color: '#fff', fontSize: '18px', padding: '10px', paddingLeft: '30px', fontWeight: 'bold', borderBottom: '1px #636363 solid' }}>企业小管家代理</div>
                <Menu
                    theme='dark'
                    onClick={() => { }}
                    style={{
                        width: '100%',
                        height: '100vh',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    }}
                    defaultSelectedKeys={['sub1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={[
                        { key: 'sub1', label: '恒业订单', icon: <MenuOutlined /> }
                    ]}
                />

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '85%', overflow: 'auto' }}>
                <div style={{ display: "inline-flex", alignItems: 'center', minHeight: '50px', justifyContent: 'flex-end', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', width: '100%', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 99 }}>
                    <div style={{ display: "inline-flex", alignItems: 'center', height: '100%', justifyContent: 'flex-end', margin: '30px', color: '#afafaf' }}>
                        {
                            henyeIdentity === '业务员' ? <>
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" style={{ backgroundColor: '#f56a00', marginRight: '10px' }} />
                                业务员
                            </> : <>
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" style={{ backgroundColor: '#87d068', marginRight: '10px' }} />
                                管理员
                            </>
                        }
                    </div>
                </div>

                <div style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', margin: '1.5%', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '30px' }}>
                    <SearchOption onSearch={async (param) => {

                        let searchParam = {} as any
                        for (const x in param) {
                            if (param[x]) searchParam[x] = param[x]
                        }
                        searchParam.state == '全部' ? delete searchParam.state : ''
                        if (searchParam.orderNumber !== '') delete searchParam.orderNumber
                        setPageOption({ pageSize: 50, pageIndex: 1 })
                        setSearchParam(searchParam)

                        await search(searchParam, { pageSize: 50, pageIndex: 1 })

                    }}></SearchOption>

                    <Table
                        style={{
                            height: '80%',
                            marginTop: '15px',
                            paddingBottom: '0px',
                            minHeight: '80%'
                        }}
                        //@ts-ignore
                        columns={columns}
                        dataSource={orders}
                        scroll={{
                            x: '100%',
                            y: 'calc(100vh*0.5)',
                        }}
                        pagination={{
                            pageSize: pageOption.pageSize,
                            total: total,
                            showTotal: (total) => {
                                return <>共 {total} 条</>
                            },
                            onChange: async (page, pageSize) => {
                                await search(searchParam, { pageSize: pageOption.pageSize, pageIndex: page })
                            }
                        }}
                    />
                </div>

            </div>

        </div>
    </>)

}

export default HenyeOrders;

//@ts-ignore
// navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
//     if (result.state == "granted" || result.state == "prompt") {
//         alert("Write access granted!");
//     }
// });


// function getTableScroll({ extraHeight, ref } = {}) {
//     if (typeof extraHeight == "undefined") {
//         //  默认底部分页64 + 边距10
//         extraHeight = 74
//     }
//     let tHeader = null
//     if (ref && ref.current) {
//         tHeader = ref.current.getElementsByClassName("ant-table-thead")[0]
//     } else {
//         tHeader = document.getElementsByClassName("ant-table-thead")[0]
//     }
//     //表格内容距离顶部的距离
//     let tHeaderBottom = 0
//     if (tHeader) {
//         tHeaderBottom = tHeader.getBoundingClientRect().bottom
//     }
//     // 窗体高度-表格内容顶部的高度-表格内容底部的高度
//     // let height = document.body.clientHeight - tHeaderBottom - extraHeight
//     let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
//     // 空数据的时候表格高度保持不变,暂无数据提示文本图片居中
//     if (ref && ref.current) {
//         let placeholder = ref.current.getElementsByClassName('ant-table-placeholder')[0]
//         if (placeholder) {
//             placeholder.style.height = height
//             placeholder.style.display = "flex"
//             placeholder.style.alignItems = "center"
//             placeholder.style.justifyContent = "center"
//         }
//     }
//     return height
// }