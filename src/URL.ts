
import LoginPage from './login/loginPage';
import Menu from './menu';

import { useState, useRef, useEffect, lazy, Suspense } from 'react';

/*  路由地址映射，路由及其对应页面文件 */
let urlConfig = [
    { url: '/home', component: Menu   },
    { url: '/login', component: LoginPage  , model: './login/loginModel' },
]

export default urlConfig