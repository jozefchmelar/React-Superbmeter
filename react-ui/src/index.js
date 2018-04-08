import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myApp from './reducers'

 const  store = {}//createStore(myApp)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


export default store