import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  IndexRoute,
  Link
} from 'react-router-dom';
import BoseMain from "./pages/BoseMain";



// ========================================

ReactDOM.render(
  <HashRouter>
  <div>
    <Route path="/" component={BoseMain}></Route>


  </div>
  </HashRouter>
  ,
  document.getElementById('root')
);