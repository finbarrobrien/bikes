import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

import { ListItem } from '../components/drawer/ListItem';
import { ListViewHeader } from '../components/drawer/ListViewHeader';

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

const title = 'Select a City';

const CityListView = ({countries, location, match, history}) => {
  const selectedCountry = countries.find((c) => { return c.path === match.params.country; });
  return(
    <View style={styles.containerFullScreen}>
      <ListViewHeader history={history} title={title} />
      <FlatList
          data={selectedCountry.cities}
          keyExtractor={(item) => { return item.path }}
          renderItem={ ({item}) => {
            return (<Link key={item.path} to={`${location.pathname}/${item.path}`} component={ListItem} text={item.label}/>);
          }}
      />
    </View>
  );
}

CityListView.defaultProps = {
  cities: [],
};

const ReduxCityListView = connect(mapStateToProps)(CityListView);

export { ReduxCityListView };