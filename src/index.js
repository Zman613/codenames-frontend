import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ActionCableProvider } from 'react-actioncable-provider'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT } from './constants'
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <ActionCableProvider url={API_WS_ROOT} >
      <Route path="/" component={App} />
    </ActionCableProvider>
  </Router>, 
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
