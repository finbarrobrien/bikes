import { getBikeNetworkInfo, getCities } from '../api/api';
import { COUNTRY_CODES } from '../commons/consts';

const setCountriesInfo = ({ countries }) => {
  return {
    type: 'set-countries-info',
    countries,
  };
};

const setBikeParkingMode = ({ mode }) => {
  return {
    type: 'set-bike-parking-mode',
    mode,
  };
};

const updateSelectedNetwork = (data) => {
  return {
    type: 'set-selected-network-data',
    data,
  };
}

const updateCountryList =  () => {
  return async (dispatch) => {
    const responseJson = await getCities();
    const countries = [];
    responseJson.networks.forEach(net => {
      let c = countries.find(c => {
        return c.shortCode === net.location.country;
      });
      //const networkBikes = net.location.stations.reduce((sum, station) => { return sum + (station.free_bikes || 0); }, 0);
      if (!c) {
        const cMap = COUNTRY_CODES.find(country => {
          return country.shortCode === net.location.country;
        });
        if (cMap) {
          countries.push({
            title: cMap.label,
            shortCode: net.location.country,
            cities: {
              [net.location.city]: [net],
            },
          });
        } else {
          console.warn(net.location);
        }
      } else {
        c.cities[net.location.city]
            ? c.cities[net.location.city].push(net)
            : (c.cities[net.location.city] = [net]);
      }
    });
    countries.forEach(country => {
      country.data.sort((a, b) => {
        return a.location.city < b.location.city
            ? -1
            : a.location.city > b.location.city ? 1 : 0;
      });
    });
    countries.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
    dispatch(setCountriesInfo({countries}));
  }
};

const updateNetwork = city => {
  return async (dispatch) => {
    const network = await getBikeNetworkInfo(city);
    const newRegion = {
      latitude: network.location.latitude,
      longitude: network.location.longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    };
    dispatch(updateSelectedNetwork({city, stations: network.stations, region: newRegion }))
  }
};

export { setCountriesInfo, setBikeParkingMode, updateNetwork };
