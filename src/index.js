import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Routes from './Routes';
import reducers from './reducers';
import 'normalize.css';
import './assets/scss/index.scss';

import * as serviceWorker from './serviceWorker';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
