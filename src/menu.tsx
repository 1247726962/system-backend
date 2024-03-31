import React from 'react';
import { getChildren } from './until/until';
import { useState, useEffect, createElement } from 'react';
import { connect } from 'dva';
import { Menu, Button, Spin } from 'antd';
import * as Icon from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function getItem(item) {
   const { label, _id, icon, pid } = item
   const iconElement = icon ? React.createElement(
      Icon[icon],
      {
         style: { fontSize: '16px' }
      }
   ) : ''
   return { key: _id, icon: iconElement, label, pid: pid || 0, _id: _id }
}

let items = [
   { _id: '1', label: '个人学习网站', icon: 'ReadOutlined', subUrl: '/edit', component: './typeManage' }
], itemsTree = []

items.map(i => { itemsTree.push(getItem(i)) })
itemsTree = getChildren(itemsTree, 0)

function Home(props) {
   const [loading, setloading] = useState(true);
   const [collapsed, setCollapsed] = useState(false);
   const [componentC, setComponentC] = useState(null)
   function showComponentC(url) {
      import(`${url}`)
         .then(module => module.default)
         .then(component => {
            setComponentC(createElement(component))
            setloading(false)
         })
         .catch(e => { console.log(e) })
   }
   useEffect(() => {

      let hash = window.location.hash;
      if (hash.split('/')[2]) {
         let item = items.find(i => { return '/' + hash.split('/')[2] == i.subUrl })
         showComponentC(item.component)
         setloading(false)
      } else {
         let item = itemsTree[0].children || itemsTree[0]
         showComponentC(item.component)
         setloading(false)
      }
   }, [])


   const toggleCollapsed = () => {
      setCollapsed(!collapsed);
   };
   return (<>
      <Menu
         style={{ width: !collapsed ? '13%' : '3%', height: '100vh', overflowX: 'visible', overflowY: 'auto', display: 'inline-block' }}
         defaultSelectedKeys={['asd']}
         defaultOpenKeys={['asd']}
         mode="inline"
         theme="dark"
         inlineCollapsed={collapsed}
         items={itemsTree}
         onSelect={(e) => {

            setloading(false)
            let item = items.find(i => { return e.key == i._id })
            window.location.hash = '/home' + item.subUrl
            showComponentC(item.component)
         }}
      />
      <Button type="primary" onClick={toggleCollapsed} style={{ position: 'fixed', top: 10, left: !collapsed ? '15%' : '4%', zIndex: 10 }}>
         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      <div style={{ width: !collapsed ? '87%' : '97%', display: 'inline-block', verticalAlign: 'top', height: '100vh' }}>
         {loading ? <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin tip="Loading..." size="large" />
         </div> : componentC}
      </div>
   </>
   )
}

export default connect()(Home);
// setKey(item._id)
// if(  )
// if (componentC) {
//    hideComponentC()
// } else {
// }
// render? Content1 = lazy(() => import(`${item.component}`)): Content = lazy(() => import(`${item.component}`));
// setRender(!render)
{/* <Suspense fallback={<div>Loading...</div>}>
   <Content />
</Suspense>  */}