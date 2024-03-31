import React from 'react';
import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'dva/router';
import urlConfig from './URL';

let urlSets = []
const urlRoute = (urlSet) => {
  urlSet.map(i => {
    // const Component = lazy( ()=>import( i.component ) )
    urlSets.push(<Route path={i.url} component={i.component} />)
  })
}
urlRoute(urlConfig)
window.addEventListener('hashchange', (e) => {
  const token = localStorage.getItem('token');
  if( !token )   window.location.hash = '/login'
})
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {...urlSets}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
