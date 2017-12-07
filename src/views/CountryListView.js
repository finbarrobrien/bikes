import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router'

import { ListItem } from '../components/drawer/ListItem';


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

const CountryListView = ({countries, location}) => {
  return(
    <View style={styles.containerFullScreen}>
      <FlatList
          data={countries}
          keyExtractor={(item) => { return item.path }}
          renderItem={ ({item}) => {
            return (<Link key={item.path} to={`${location.pathname}/${item.path}`} component={ListItem} text={item.label}/>);
          }}
        />
    </View>
  );
}

CountryListView.defaultProps = {
  countries: [],
};

const ReduxCountryListView = connect(mapStateToProps)(CountryListView);

export { ReduxCountryListView };