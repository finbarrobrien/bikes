import { getBikeNetworkInfo, getCities } from '../api/api';
import { COUNTRY_CODES } from '../commons/consts';
import kebabCase from 'lodash/kebabCase';

const mapDataLoadingStatus = ({ status }) => {
  return {
    type: 'map-data-state',
    status,
  };
};

const countryDataLoadingStatus = ({ status }) => {
  return {
    type: 'country-data-state',
    status,
  };
};

const setCountriesInfo = ({ countries }) => {
  return {
    type: 'set-countries-info',
    countries,
  };
};

const setBikeParkingMode = () => {
  return {
    type: 'set-bike-parking-mode',
  };
};

const updateSelectedNetwork = data => {
  return {
    type: 'set-selected-network-data',
    data,
  };
};

const updateMapRegion = region => {
  return {
    type: 'set-map-region',
    region,
  };
};

const updateFavourites = (network) => {
  return {
    type: 'add-favourite',
    network,
  }
}

const updateCountryList = () => {
  return async dispatch => {
    dispatch(countryDataLoadingStatus({status: 'loading'}));
    try {
      const responseJson = await getCities();
      const countries = [];
      responseJson.networks.forEach(net => {
        let c = countries.find(c => {
          return c.path === net.location.country;
        });
        //const networkBikes = net.location.stations.reduce((sum, station) => { return sum + (station.free_bikes || 0); }, 0);
        if (!c) {
          const cMap = COUNTRY_CODES.find(country => {
            return country.shortCode === net.location.country;
          });
          if (cMap) {
            countries.push({
              label: cMap.label,
              path: net.location.country,
              cities: [
                {
                  label: net.location.city,
                  path: kebabCase(net.location.city),
                  networks: [net],
                },
              ],
            });
          } else {
            console.warn(net.location);
          }
        } else {
          const city = c.cities.find(city => {
            return city.label === net.location.city;
          });
          if (city) {
            city.networks.push(net);
          } else {
            c.cities.push({
              label: net.location.city,
              path: kebabCase(net.location.city),
              networks: [net],
            });
          }
        }
      });
      countries.forEach(country => {
        country.cities.sort((a, b) => {
          return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
        });
      });
      countries.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      });
      dispatch(countryDataLoadingStatus({status: 'complete'}));
      dispatch(setCountriesInfo({countries}));
    } catch(error) {
      dispatch(countryDataLoadingStatus({status: 'error'}));
    }
  }
};

const updateNetwork = network => {
  return async dispatch => {
    if (network) {
      dispatch(mapDataLoadingStatus({ status: 'loading' }));
      try {
        const res = await getBikeNetworkInfo(network);
        const center = {
          latitude: res.location.latitude,
          longitude: res.location.longitude,
        };
        dispatch(updateSelectedNetwork(res));
        dispatch(updateMapRegion(center));
        dispatch(mapDataLoadingStatus({ status: 'complete' }));
      } catch (error) {
        dispatch(mapDataLoadingStatus({ status: 'error' }));
      }
    }
  };
};

export {
  setCountriesInfo,
  setBikeParkingMode,
  updateNetwork,
  updateCountryList,
  updateMapRegion,
  updateFavourites,
};
