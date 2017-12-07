import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { bikesReducers } from './reducers';
import { templateStore } from './templateStore';

const store = createStore(bikesReducers, templateStore, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const BikesProvider = (props) => {
  return(<Provider store={store}>
    { props.children }
  </Provider>)
}

export { BikesProvider };