import React from 'react';
import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { connect } from 'dva';
import { BackTop, Menu, Button } from 'antd';
import * as Icon from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getChildren } from '../until/until'


function getItem(item) {
    const { label, _id, icon, pid } = item
    const iconElement = icon ? React.createElement(
        Icon[icon],
        {
            style: { fontSize: '16px' }
        }
    ) : ''
    return { ...item, key: _id, icon: iconElement, label, pid: pid || 0, _id: _id }
}

let items = [
    { _id: '1', label: 'Option 1', icon: 'PieChartOutlined', subUrl: '/a', component: './page' },
    { _id: '2', label: 'Option 2', icon: 'DesktopOutlined', subUrl: '/b', component: './page' },
    { _id: '3', label: 'Option 3', icon: 'ContainerOutlined', subUrl: '/c', component: '' },
    { _id: 'sub1', label: 'Navigation One', icon: 'MailOutlined' },
    { _id: '5', label: 'Option 5', icon: '', pid: 'sub1', subUrl: '/f', component: '' },
    { _id: '6', label: 'Option 6', icon: '', pid: 'sub1', subUrl: '/sa', component: '' },
    { _id: '7', label: 'Option 7', icon: '', pid: 'sub1', subUrl: '/asd', component: '' },
    { _id: '8', label: 'Option 8', icon: '', pid: 'sub1', subUrl: '/asd', component: '' },
    { _id: 'sub2', label: 'Navigation Two', icon: 'AppstoreOutlined' },
    { _id: '9', label: 'Option 9', icon: '', pid: 'sub2', subUrl: '/asd', component: '' },
    { _id: '10', label: 'Option 10', icon: '', pid: 'sub2', subUrl: '/asd', component: '' },
];

items = items.map(i => getItem(i))
let itemsTree = getChildren(items, 0)

class Home1 extends React.Component {

    state={
        collapsed:false
    }

    componentDidMount() {

    }

    toggleCollapsed = () => {
        this.setState({collapsed:!this.state.collapsed});
    };

    render() {
        const { collapsed } = this.state;
        return <div style={{ width: '100%', margin: '0' }}>

            <Menu
                style={{ width: !this.state.collapsed ? '13%' : '3%', position: 'fixed', left: 0, height: '100%', overflowX: 'visible', overflowY: 'auto', display: 'inline-block' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
                items={itemsTree}
                onSelect={(e) => {
                    let item = items.find(i => { return e.key == i._id })
                    // setSubUrl(item._id)
                    window.location.hash = 'home' + item.subUrl
                    // console.log(window.location.hash)
                }}
            />
            <Button type="primary" onClick={this.toggleCollapsed} style={{ position: 'fixed', top: 10, left: !collapsed ? '15%' : '4%', zIndex: 10 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            {/* <div style={{ width: '80%', margin: '0 auto', display: 'inline-block' }}>
           <Suspense fallback={<div>Loading...</div>}>
              <Content />
           </Suspense>
        </div> */}

            <BackTop>
                <div className='back_top'>Back</div>
            </BackTop>
        </div>
    }
}

export default connect()(Home1);
