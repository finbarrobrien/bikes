import { AsyncStorage } from 'react-native';

const templateStore = {
  countries: [],
  showingBikes: true,
  selectedCountry: {},
  selectedCity: {},
  selectedNetwork: {},
  region: null,
  favourites: [{
    country: 'Ireland',
    city: 'Dublin',
    network: 'dublinbikes',
  }],
  states: {
    mapData: 'empty',
    countryData: 'empty',
    cityData: 'empty',
    networkData: 'empty',
  }
};


export { templateStore };
