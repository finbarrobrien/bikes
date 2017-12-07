import React, {Component} from 'react';
import { View, StyleSheet, FlatList, TextInput, } from 'react-native';
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

const title = 'Select a Country';

class CountryListView extends Component  {

  filterText = '';

  static defaultProps = {
    countries: [],
  };


  render() {
    const { countries, location, history } = this.props;
    return (
        <View style={styles.containerFullScreen}>
          <ListViewHeader history={history} title={ title }/>
          <TextInput style={{width: '100%', height: 48, paddingLeft: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.12)'}} onChange={(text) => {this.filterText = text}}/>
          <FlatList
              data={countries}
              keyExtractor={(item) => {
                return item.path
              }}
              renderItem={({item}) => {
                if (item.label.startsWith(this.filterText)) {
                  return (<Link key={item.path} to={`${location.pathname}/${item.path}`} component={ListItem}
                              text={item.label}/>);
                }
              }}
          />
        </View>
    );
  }
};

const ReduxCountryListView = connect(mapStateToProps)(CountryListView);

export { ReduxCountryListView };