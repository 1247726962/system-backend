import React from 'react';
import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'dva/router';
import urlSet from './URL';

let urlSets = []
const urlRoute = (urlSet) => {
  urlSet.map(i => {
    // const Component = lazy( ()=>import( i.component ) )
    urlSets.push(<Route path={i.url} component={i.component} />)
  })
}
urlRoute(urlSet)
// window.addEventListener('hashchange', (e) => {
//     console.log('hashchange')
// })

function RouterConfig({ history }) {
  let region = [1, 2, 3]
  const [current, setCrrent] = useState(0);
  return (
    <Router history={history}>
      <Switch>
        {...urlSets}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
