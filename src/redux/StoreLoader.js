import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { templateStore } from './templateStore';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { bikesReducers } from './reducers';

let defaultStore = createStore(
  bikesReducers,
  templateStore,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

class StoreLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: defaultStore,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites) {
      const newStore = {
        ...this.state.store,
        favourites: JSON.parse(favourites),
      };
      this.setState({
        loading: false,
        store: createStore(
          bikesReducers,
          newStore,
          composeWithDevTools(applyMiddleware(thunkMiddleware)),
        ),
      });
    }
  }

  render() {
    return <Provider store={this.state.store}>{this.props.children}</Provider>;
  }
}

export { StoreLoader };
