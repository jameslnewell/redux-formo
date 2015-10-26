import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from '../lib/reducer';

import App from './lib/App';

let store = createStore(reducer(
  'personal-details',
  ['name', 'phone']
));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);