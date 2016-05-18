import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {reducer as formReducer} from '..';
import App from './lib/App';

const reducer = combineReducers({
  form: formReducer,
  foo: (state, action) => {console.log(action); return state || {};}
});

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, enhancer);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);