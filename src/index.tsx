import React from 'react';
import {
  createHashRouter, RouterProvider,
  // createBrowserRouter,
  // Route,
  // Link,
} from "react-router-dom";
import routerGuard from './routerGuard';
import urlConfig from './router';
import '../style/index.scss';

routerGuard()

let router = urlConfig.map(i => {
  let children = []
  if (i.children) {
    children = i.children.map(o => {
      return {
        ...o,
        element: <React.Suspense fallback={<>Loading...</>}>
          {<o.element />}
        </React.Suspense>
      }
    })
  }
  return {
    path: i.url,
    element: <React.Suspense fallback={<>Loading...</>}>
      {<i.element />}
    </React.Suspense>,
    children: children
  }
})

import('react-dom/client').then(res => {

  const domNode = document.getElementById('root');
  const root = res.createRoot(domNode);
  root.render(<React.StrictMode>
    <RouterProvider router={createHashRouter(router)} />
  </React.StrictMode>);

})




