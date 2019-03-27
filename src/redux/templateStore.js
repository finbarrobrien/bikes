
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
    label: 'dublinbikes',
  }, {
    country: 'Colombia',
    city: 'Medellin',
    network: 'encicla',
    label: 'EnCicla',
  }, {
    country: 'Canada',
    city: 'Montreal, QC',
    network: 'bixi-montreal',
    label: 'Bixi',
  }],
  states: {
    mapData: 'empty',
    countryData: 'empty',
    cityData: 'empty',
    networkData: 'empty',
  }
};


export { templateStore };
