import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {reducer} from '..';

import App from './lib/App';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  form: reducer
}));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);