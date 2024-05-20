// import React, { useState, useEffect } from 'react';
// import { connect } from 'dva';
// import { Menu, Table, Tag, Space, Avatar, Input, Button, Select, Radio, Modal, Upload } from 'antd';
// import { MenuOutlined, SearchOutlined, UndoOutlined, ZoomInOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from '../../until/icon';


// let wx = {} as any

// async function post(sql_name, data = {} as any, pageOption = { pageSize: 50, pageIndex: 1 }, openid = false) {
//     let sort = {}
//     if (data.orderBy) {
//         //@ts-ignore
//         sort.orderBy = data.orderBy
//         delete data.orderBy
//     }
//     //@ts-ignore
//     return wx.cloud.callFunction({
//         name: 'web',
//         data: {
//             type: "post",
//             sql_name: sql_name,
//             openid: openid,
//             ...sort,
//             ...pageOption,
//             data,
//         },
//     }).then(res => { return res.result })
// }

// let uploadToken = '', item = {}

// function HenyeOrders() {

//     const [orders, setOrders] = useState([])
//     const [total, setTotal] = useState(0)
//     const [pageOption, setPageOption] = useState({ pageSize: 50, pageIndex: 1 })
//     const [searchParam, setSearchParam] = useState({} as any)


//     const search = async (searchParam, pageOption) => {
//         let result = await post('orders', { ...searchParam, orderBy: ['orderTime', 'desc'] }, pageOption)
//         result.data.map((i, o) => { i.key = o })
        
//         setOrders(result.data)
//         setTotal(result.total)
//     }

//     useEffect(() => {
//         //@ts-ignore
//         // navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
//         //     if (result.state == "granted" || result.state == "prompt") {
//         //         alert("Write access granted!");
//         //     }
//         // });

//         let script2 = document.createElement('script');
//         script2.type = 'text/javascript';
//         script2.src = 'https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.4.0/cloud.js';
//         script2.onload = () => {
//             new Promise(async (resolve, reject) => {
//                 //@ts-ignore
//                 var c1 = new window.cloud.Cloud({
//                     resourceAppid: 'wxe718b9ea9d043bce', // 资源方 AppID
//                     resourceEnv: 'goshang-0gr9za8s37caad8e',// 资源方环境 ID
//                     identityless: true,// 必填，表示是未登录模式
//                 })
//                 await c1.init()
//                 wx.cloud = c1

//                 await search(searchParam, pageOption)

//             })
//         }
//         script2.async = false
//         document.getElementById('root').appendChild(script2);

//     }, [])

//     const columns = [
//         { key: 'sort', title: '序号', dataIndex: 'sort', width: 100, align: 'center', fixed: 'left', render: (text, o, v) => <span>{pageOption.pageSize * (pageOption.pageIndex - 1) + v + 1}</span> },
//         { key: 'Name', title: '企业名称', dataIndex: 'Name', width: 250, fixed: 'left', render: (text) => <a>{text}</a> },
//         { key: 'orderNumber', title: '订单编号', dataIndex: 'orderNumber', width: 250, align: 'center', render: (text) => <a>{text}</a> },
//         { key: 'state', title: '支付状态', dataIndex: 'state', width: 100, align: 'center', render: (text) => <a>{text}</a> },
//         { key: '-', title: '销售', dataIndex: '-', render: (text) => <a>-</a> },
//         { key: 'OperName', title: '法定代表人', dataIndex: 'OperName', width: 120, render: (text) => <a>{text}</a> },
//         { key: 'CreditCode', title: '统一社会信用编码', dataIndex: 'CreditCode', width: 250, render: (text) => <a>{text}</a> },
//         { key: 'project', title: '服务项目', dataIndex: 'project', width: 250, align: 'center', render: (text, o) => <a>{text + `(${o.price})`}</a> },
//         { key: 'preferential', title: '优惠金额', dataIndex: 'preferential', width: 100, render: (text) => <a>{text}</a> },
//         { key: 'phone', title: '受理人手机号码', dataIndex: 'phone', width: 150, render: (text) => <a>{text}</a> },
//         { key: 'code', title: '认证码', dataIndex: 'code', width: 150, render: (text) => <a>6688</a> },
//         { key: 'orderTime', title: '下单时间', dataIndex: 'orderTime', width: 180, render: (text) => <a>{text}</a> },
//         { key: 'payTime', title: '支付时间', dataIndex: 'orderTime', width: 180, render: (text) => <a>{text}</a> },
//         { key: 'pay', title: '实付', dataIndex: 'pay', width: 150, fixed: 'right', render: (text, o) => <a>实付：{(o.price * 100 - o.preferential * 100) / 100}</a> },
//         {
//             key: 'operate', title: '操作', dataIndex: 'operate', fixed: 'right', width: 200, render: (_, record) => (
//                 <span>
//                     <a style={{ fontSize: '10px' }}><ZoomInOutlined style={{ fontSize: '15px' }} />详情</a>
//                     <a style={{ fontSize: '10px', marginLeft: '10px' }} onClick={() => {
//                         wx.cloud.callFunction({
//                             name: 'getUploadToken',
//                             data: {},
//                         }).then(res => {
//                             uploadToken = res.result.uploadToken
//                         })
//                         showModal()
//                         item = record
//                     }}><UploadOutlined style={{ fontSize: '15px' }} />上传结果</a>
//                 </span>
//             ),
//         }
//     ];

//     const upload = (item, uploadToken, file) => {
//         const options = {
//             quality: 0.92,
//             noCompressIfLarger: true
//             // maxWidth: 1000,
//             // maxHeight: 618
//         }
//         let key = item.orderNumber
//         let putExtra = {}
//         let config = {}
//         qiniu.compressImage(file, options).then(data => {
//             const observable = qiniu.upload(data.dist as any, key, uploadToken, putExtra, config)
//             const subscription = observable.subscribe(observable as any) // 上传开始
//         })
//     }
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//     const [imageUrl, setImageUrl] = useState('');
//     const [loading, setLoading] = useState(false);

//     const uploadButton = (
//         <div>
//             {loading ? <LoadingOutlined /> : <PlusOutlined />}
//             <div style={{ marginTop: 8 }}>Upload</div>
//         </div>
//     );
//     return (<>
//         <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
//             <Modal title="上传回执" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//                 <Upload
//                     maxCount={2}
//                     name="avatar"
//                     listType="picture-card"
//                     className="avatar-uploader"
//                     showUploadList={false}
//                     // beforeUpload={beforeUpload}
//                     onChange={({ file, fileList }) => {
//                         if (file.status !== 'uploading') {
//                             console.log(file, fileList);
//                             let realFile = file.originFileObj
//                             upload(item, uploadToken, realFile)
//                         }
//                     }}
//                 >
//                     {imageUrl.length != 0 ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//                 </Upload>
//             </Modal>

//             <div style={{ width: '15%' }}>
//                 <div style={{ backgroundColor: '#001529', color: '#fff', fontSize: '18px', padding: '10px', paddingLeft: '30px', fontWeight: 'bold', borderBottom: '1px #636363 solid' }}>企业小管家代理</div>
//                 <Menu
//                     theme='dark'
//                     onClick={() => { }}
//                     style={{
//                         width: '100%',
//                         height: '100vh',
//                         boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
//                         // backgroundColor:,
//                     }}
//                     defaultSelectedKeys={['sub1']}
//                     defaultOpenKeys={['sub1']}
//                     mode="inline"
//                     items={[
//                         { key: 'sub1', label: '恒业订单', icon: <MenuOutlined /> }
//                     ]}
//                 />

//             </div>

//             <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '85%', overflow: 'auto' }}>
//                 <div style={{ display: "inline-flex", alignItems: 'center', minHeight: '50px', justifyContent: 'flex-end', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', width: '100%', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 99 }}>
//                     <div style={{ display: "inline-flex", alignItems: 'center', height: '100%', justifyContent: 'flex-end', margin: '30px', color: '#afafaf' }}>
//                         <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" style={{ backgroundColor: '#87d068', marginRight: '10px' }} />
//                         业务员
//                     </div>
//                 </div>

//                 <div style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', margin: '1.5%', display: 'flex', flexDirection: 'column', padding: '20px', paddingTop: '30px' }}>
//                     <SearchOption onSearch={async (param) => {

//                         let searchParam = {} as any
//                         for (const x in param) {
//                             if (param[x]) searchParam[x] = param[x]
//                         }
//                         searchParam.state == '全部' ? delete searchParam.state : ''
//                         setPageOption({ pageSize: 50, pageIndex: 1 })
//                         setSearchParam(searchParam)

//                         await search(searchParam, { pageSize: 50, pageIndex: 1 })

//                     }}></SearchOption>

//                     <Table
//                         style={{
//                             height: '80%',
//                             marginTop: '15px',
//                             // padding: '10px',
//                             paddingBottom: '0px',
//                             minHeight: '80%'
//                         }}
//                         //@ts-ignore
//                         columns={columns}
//                         dataSource={orders}
//                         scroll={{
//                             x: '100%',
//                             y: 'calc(100vh*0.5)',
//                         }}
//                         pagination={{
//                             pageSize: pageOption.pageSize,
//                             total: total,
//                             showTotal: (total) => {
//                                 return <>共 {total} 条</>
//                             },
//                             onChange: async (page, pageSize) => {
//                                 await search(searchParam, { pageSize: pageOption.pageSize, pageIndex: page })
//                             }
//                         }}
//                     />
//                 </div>

//             </div>

//         </div>
//     </>)

// }

// export default connect(({ example }) => ({ example }))(HenyeOrders);

