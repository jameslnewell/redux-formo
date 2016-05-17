import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducer} from '..';
import App from './lib/App';

const createStoreWithMiddleware = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  form: reducer,
  foo: (state, action) => {console.log(action); return state || {};}
}));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);