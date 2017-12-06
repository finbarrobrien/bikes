//import { combineReducers } from 'redux';

const bikesReducers = (state, action) => {
  switch (action.type) {
    case 'set-bike-parking-mode':
      return {
        ...state,
        showingBikes: action.mode,
      };
    case 'set-countries-info':
      return {
        ...state,
        countries: action.countries,
      };
    case 'set-selected-network-data':
      return {
        ...state,
        selectedNetwork: action.data,
      };
    default:
      return state;
  }
};

export { bikesReducers };
