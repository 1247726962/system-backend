import React from 'react';
import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import { message } from 'antd';
import urlConfig from './URL';

import '../style/index.scss';

routerGuard()

let router = urlConfig.map(i => {
  return {
    path: i.url,
    element: <React.Suspense fallback={<>Loading...</>}>
      {<i.component />}
    </React.Suspense>
  }
})

import('react-dom').then(res => {
  res.render(
    <React.StrictMode>
      <RouterProvider router={createHashRouter(router)} />
    </React.StrictMode>,
    document.getElementById('root')
  )
})

function routerGuard() {

  if (window.location.hash == '#/henyeOrders') {

    let henyeIdentity = window.localStorage.getItem('henyeIdentity')
    let loginTime = window.localStorage.getItem('loginTime')
    if (!henyeIdentity || !loginTime) window.location.hash = '/henye'
    if (loginTime && (new Date().getTime() - Number(loginTime) > 86400000 * 7)) {
      window.location.hash = '/henye'
      message.warning('登陆时间超过七天，请重新登录')
    }

  }

  if (window.location.hash == '#/editor') {

    const token = localStorage.getItem('token');
    if (!token) window.location.hash = '/login'

  }

  window.addEventListener('hashchange', (e) => {

    if (window.location.hash == '#/henyeOrders') {

      let henyeIdentity = window.localStorage.getItem('henyeIdentity')
      let loginTime = window.localStorage.getItem('loginTime')
      if (!henyeIdentity || !loginTime) window.location.hash = '/henye'
      if (loginTime && (new Date().getTime() - Number(loginTime) > 86400000 * 7)) {
        window.location.hash = '/henye'
        message.warning('登陆时间超过七天，请重新登录')
      }
      return

    }

    const token = localStorage.getItem('token');
    if (!token) window.location.hash = '/login'

  })
}


