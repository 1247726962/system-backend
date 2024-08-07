import React from 'react';
import { useState, useEffect, createElement } from 'react';
import { Menu, Button, Spin } from 'antd';
import { Outlet } from "react-router-dom";
import { Link, useHref, useNavigate, useLinkClickHandler } from "react-router-dom";
import { useRef } from 'react';

const itemsTree = [
   { label: <Link to={'goodsManage'}>商品管理</Link>, key: 'item-1', to: 'goodsManage' }, // 菜单项务必填写 key
   { label: <Link to={'test'}>庄园管理</Link>, key: 'item-1', to: 'test' }, // 菜单项务必填写 key
   { label: <Link to={'manor'}>农业专家</Link>, key: 'item-2', to: 'manor' },
   {
      label: '测试',
      key: 'submenu',
      children: [{ label: <Link to={'abc'}>子菜单项</Link>, key: 'submenu-item-1' }],
   },
];

function Home(props) {

   const [collapsed, setCollapsed] = useState(false);
   const [defaultKey, setDefault] = useState('');

   return (<>

      <Menu
         style={{ width: !collapsed ? '13%' : '3%', height: '100vh', overflowX: 'visible', overflowY: 'auto', display: 'inline-block' }}
         selectedKeys={[defaultKey]}
         mode="inline"
         theme="dark"
         inlineCollapsed={collapsed}
         items={itemsTree}
      />

      <div style={{ width: !collapsed ? '87%' : '97%', display: 'inline-block', verticalAlign: 'top', height: '100vh', overflow: 'auto' }}>
         <Outlet />
      </div>

   </>)
}

export default (Home);
