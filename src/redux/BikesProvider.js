import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { bikesReducers } from './reducers';
import { templateStore } from './templateStore';

const store = createStore(bikesReducers, templateStore);

const BikesProvider = (props) => {
  return(<Provider store={store}>
    { props.children }
  </Provider>)
}

export { BikesProvider };