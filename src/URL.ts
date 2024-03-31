import IndexPage from './pages/subConfig';
import LoginPage from './login/loginPage';
import Home from './menu';

import { useState, useRef, useEffect, lazy, Suspense } from 'react';

/*  路由地址映射，路由及其对应页面文件 */
let urlConfig = [
    { url:'/login', component: require('./loginPages/loginPage'), model:'./loginPages/loginModel' },
    { url:'/home', component: require('./login/loginPage') }
]


export default urlConfig