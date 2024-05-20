// import React, { LazyExoticComponent }  from 'react';
// import { Suspense } from 'react';
// import urlConfig from './URL';
// import { message } from 'antd';
// import { BrowserRouter, Routes, Route } from "react-router-dom";



// const LazyImportComponent = (props: {
//   lazyChildren:LazyExoticComponent<() => JSX.Element>;
// }) => {
//   return (
//     <React.Suspense fallback={<>Loading...</>}>
//       <props.lazyChildren />
//     </React.Suspense>
//   );
// };

// function RouterConfig() {
  
//   return (
//     // <BrowserRouter>
//       <Routes>
//         {router.map(i=>{
//           return <Route path={i.url}  element={<LazyImportComponent lazyChildren={ React.lazy(() => import(i.component))} />} />
//         })}
//       </Routes>
//     // </BrowserRouter>
//   );
// }

// export default RouterConfig;
