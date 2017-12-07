import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

import { ListItem } from '../components/drawer/ListItem';
import { updateNetwork } from '../redux/actions';

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

const mapDispatchToProps = (dispatch) => {
  return {
    selectNetwork: (network) => {
      dispatch(updateNetwork({ network }));
    },
  };
};

const NetworkListView = ({countries, selectNetwork, location, match}) => {
  const selectedCountry = countries.find((c) => { return c.path === match.params.country; });
  const selectedCity = selectedCountry.cities.find((city) => { return city.path === match.params.city; });
  return(
    <View style={styles.containerFullScreen}>
      <FlatList
          data={selectedCity.networks}
          keyExtractor={(item) => { return item.id }}
          renderItem={ ({item}) => {
            return (<Link key={item.id} to={`${location.pathname}/${item.id}`} component={ListItem} onPress={ () => { selectNetwork(item.id)} } text={item.name}/>);
          }}
      />
    </View>
  );
}

NetworkListView.defaultProps = {
  networks: [],
};

const ReduxNetworkListView = connect(mapStateToProps, mapDispatchToProps)(NetworkListView);

export { ReduxNetworkListView };