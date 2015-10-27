import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import reducer from '../lib/reducer';

import App from './lib/App';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer(
  'personal-details',
  ['name', 'phone']
));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);