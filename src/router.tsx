import { lazy } from 'react';

/*  路由地址映射，路由及其对应页面文件 */
let urlConfig = [

    { url: '/', element: lazy(() => import('./boke/note')) },

    //博客登录页，编辑器
    { url: '/login', element: lazy(() => import('./loginPages/loginPage')) },
    { url: '/editor', element: lazy(() => import('./pages/bokeEditor/editContent')) },

    //小程序后台
    {
        url: '/backend',
        element: lazy(() => import('./pages/backend/meun')),
        children: [
            // { index: true, element: lazy(() => import('./pages/backend/commodity')) },
            { path: 'manor', element: lazy(() => import('./pages/backend/manor')), index: true },
            { path: 'test', element: lazy(() => import('./pages/backend/test')) },
            { path: 'abc', element: lazy(() => import('./pages/backend/test')) },
            { path: 'goodsManage', element: lazy(() => import('./pages/backend/goodsManage')) },
        ],
    },

    //恒业代商务咨询公司
    { url: '/henye', element: lazy(() => import('./loginPages/loginPage2')) },
    { url: '/henyeOrders', element: lazy(() => import('./pages/henye/orders')) },

    { url: '/login1', element: lazy(() => import('./loginPages/loginPage3')) },
    { url: '/login2', element: lazy(() => import('./loginPages/loginPage4')) },
    
]

export default urlConfig