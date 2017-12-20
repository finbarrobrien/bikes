//import { combineReducers } from 'redux';

const bikesReducers = (state, action) => {
  switch (action.type) {
    case 'set-bike-parking-mode':
      return {
        ...state,
        showingBikes: !state.showingBikes,
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
    case 'set-map-region':
      return {
        ...state,
        region: {
          ...state.region,
          ...action.region
        }
      };
    case 'map-data-state':
      return {
        ...state,
        states: {
          mapData: action.status,
        }
      };
    case 'country-data-state':
      return {
        ...state,
        states: {
          countryData: action.status,
        }
      };
    default:
      return state;
  }
};

export { bikesReducers };
