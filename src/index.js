import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  IndexRoute,
  Link
} from 'react-router-dom';
import BoseMain from "./pages/BoseMain";
import { Provider } from "react-redux"
import store from "./store"



// ========================================

ReactDOM.render(
  <Provider store={store}>
  <BoseMain/>
  </Provider>
  ,
  document.getElementById('root')
);