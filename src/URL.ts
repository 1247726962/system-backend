import IndexPage from './pages/IndexPage';
import page from './pages/page';
import LoginPage from './loginPages/loginPage';
import Home from './pages/home';
import Demo from './pages/demo';
import { useState, useRef, useEffect, lazy, Suspense } from 'react';

// 路由地址映射，路由及其对应页面文件

let urlMapping = [
    { url:'/login', component: LoginPage, model:'loginModel' },
    // { url:'/', component: IndexPage },
    // { url:'/a', component: page },
    { url:'/home', component: Home },
    { url:'/demo', component: Demo }
]


export default urlMapping