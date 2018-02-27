import React from 'react';
import ReactDOM from 'react-dom';
import Layout from "./pages/Layout";
import Example from "./pages/Example";
import {
  HashRouter,
  Route,
  IndexRoute,
  Link
} from 'react-router-dom';
import Settings from "./pages/Settings";
import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import BoseMain from "./pages/BoseMain";
import Nav from "./Nav";



// ========================================

ReactDOM.render(
  <HashRouter>
  <div>
    <Route path="/layout" component={Layout}></Route>
    <Route path="/archives" component={Archives}></Route>
    <Route path="/Featured" component={Featured}></Route>
    <Route path="/Settings" component={Settings}></Route>
    <Route path="/" component={BoseMain}></Route>


  </div>
  </HashRouter>
  ,
  document.getElementById('root')
);