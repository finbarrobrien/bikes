import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

import { ListViewHeader } from '../components/drawer/ListViewHeader';
import { ListItem } from '../components/drawer/ListItem';
import { updateNetwork, updateFavourites } from '../redux/actions';
import { icons } from '../commons/icons';

const styles = {
  containerFullScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...StyleSheet.absoluteFillObject,
  },
};

const mapStateToProps = store => {
  return {
    countries: store.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNetwork: network => {
      dispatch(updateNetwork(network));
    },
    addFavouriteNetwork: network => {
      dispatch(updateFavourites(network));
    },
  };
};

const title = 'Select a Provider';

const NetworkListView = ({
  countries,
  selectNetwork,
  location,
  match,
  history,
 addFavouriteNetwork,
}) => {
  const selectedCountry = countries.find(c => {
    return c.path === match.params.country;
  });
  const selectedCity = selectedCountry.cities.find(city => {
    return city.path === match.params.city;
  });
  return (
    <View style={styles.containerFullScreen}>
      <ListViewHeader history={history} title={title} />
      <FlatList
        data={selectedCity.networks}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({ item }) => {
          const favourite = {
            network: item.id,
            label: item.name,
            country: match.params.country,
            city: match.params.city,
          }
          return (
            <Link
              key={item.id}
              to={`${location.pathname}/${item.id}`}
              component={ListItem}
              onPress={() => {
                selectNetwork(item.id);
              }}
              text={item.name}
              action={icons.favouriteBorder}
              onAction={() => { console.log(favourite); addFavouriteNetwork(favourite) }}
            />
          );
        }}
      />
    </View>
  );
};

NetworkListView.defaultProps = {
  networks: [],
};

const ReduxNetworkListView = connect(mapStateToProps, mapDispatchToProps)(
  NetworkListView,
);

export { ReduxNetworkListView };
