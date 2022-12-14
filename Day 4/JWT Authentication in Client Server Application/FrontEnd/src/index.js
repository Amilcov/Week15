import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from  './store/session';

import './index.css';
import App from './App';

import configureStore  from './store';

const store = configureStore();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
};

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>  
  );
};

ReactDOM.render( 
  <React.StrictMode>
    <Root /> 
  </React.StrictMode>,
  document.getElementById('root')
);
