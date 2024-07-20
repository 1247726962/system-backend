import React from 'react';
import { useState, useEffect, createElement } from 'react';
import { Menu, Button, Spin } from 'antd';
import { Outlet } from "react-router-dom";
import {
   Link,
   useHref,
   useNavigate,
   useLinkClickHandler
} from "react-router-dom";
import { useRef } from 'react';

const itemsTree = [
   { label: <Link to={'test'}>菜单项一</Link>, key: 'item-1', to: 'test' }, // 菜单项务必填写 key
   { label: <Link to={'commodity'}>菜单项二</Link>, key: 'item-2', to: 'commodity' },
   {
      label: '子菜单',
      key: 'submenu',
      children: [{ label: <Link to={'abc'}>子菜单项</Link>, key: 'submenu-item-1' }],
    },
];

{/* <Menu.Item><Link to={'test'}>菜单项一</Link></Menu.Item> 
<Menu.Item><Link to={'commodity'}>菜单项二</Link></Menu.Item>
<Menu.SubMenu title="子菜单">
   <Menu.Item><Link to={'abc'}>子菜单项 </Link> </Menu.Item>
</Menu.SubMenu> */}

let first = true
function Home(props) {
   const [loading, setloading] = useState(true);
   const [collapsed, setCollapsed] = useState(false);
   const [componentC, setComponentC] = useState(null);
   const [defaultKey, setDefault] = useState('');
   //@ts-ignore
   // itemsTree.map(i => { i.to = useLinkClickHandler(i.to) })

   // const domRef = useRef(null)
   // const [to, setTo] = useState('test')
   // let clickHandler = useLinkClickHandler(to)
   // clickHandler(e.domEvent as any)
   // useEffect(() => {
   // first = false
   // return () => {
   // setTimeout(()=>{

   // },10)
   // console.log(123)
   // }
   //   return 
   // }, [to])

   // if (!first) clickHandler(domRef.current as any)

   return (<>
      <Menu
         style={{ width: !collapsed ? '13%' : '3%', height: '100vh', overflowX: 'visible', overflowY: 'auto', display: 'inline-block' }}
         selectedKeys={[defaultKey]}
         mode="inline"
         theme="dark"
         inlineCollapsed={collapsed}
         items={itemsTree}
         onSelect={(e) => {
            // let key = e.key
            // let data = itemsTree.find(i => { return i.key == key })
            // domRef.current = e.domEvent
            // setTo(data.to)

         }}
      >

      </Menu>
      <div style={{ width: !collapsed ? '87%' : '97%', display: 'inline-block', verticalAlign: 'top', height: '100vh', overflow: 'auto' }}>
         {/* <Link to={'test'}>sahdoi</Link> */}
         <Outlet />
      </div>

      {/* <Button type="primary" onClick={toggleCollapsed} style={{ position: 'fixed', top: 10, left: !collapsed ? '15%' : '4%', zIndex: 10 }}>
         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}

      {/* <div style={{ width: !collapsed ? '87%' : '97%', display: 'inline-block', verticalAlign: 'top', height: '100vh', overflow: 'auto' }}>
         {loading ? <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin tip="Loading..." size="large" />
         </div> : componentC}
      </div> */}

   </>
   )
}

export default (Home);
