import { lazy } from 'react';

/*  路由地址映射，路由及其对应页面文件 */
let urlConfig = [
    { url: '/', component: lazy(() => import('./boke/note')) },
    // { url: '/home', component:  lazy( ()=>import( './menu' ) )  },
    { url: '/login', component: lazy(() => import('./loginPages/loginPage')) },
    { url: '/editor', component: lazy(() => import('./pages/bokeEditor/editContent')) },
    { url: '/henye', component: lazy(() => import('./loginPages/loginPage2')) },
    { url: '/henyeOrders', component: lazy(() => import('./pages/henye/orders')) },
]

export default urlConfig