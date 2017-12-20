import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

import { ListItem } from '../components/drawer/ListItem';
import { ListViewHeader } from '../components/drawer/ListViewHeader';
import { updateCountryList } from '../redux/actions';

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
    status: store.states.countryData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCountries: () => {
      dispatch(updateCountryList());
    },
  };
};

const title = 'Select a Country';

class CountryListView extends Component {
  filterText = '';

  static defaultProps = {
    countries: [],
  };

  render() {
    const { countries, location, history, updateCountries, status } = this.props;
    return (
      <View style={styles.containerFullScreen}>
        <ListViewHeader history={history} title={title} />
        <TextInput
          style={{
            width: '100%',
            height: 48,
            paddingLeft: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.12)',
          }}
          onChange={text => {
            this.filterText = text;
          }}
        />
        <FlatList
          data={countries}
          keyExtractor={item => {
            return item.path;
          }}
          renderItem={({ item }) => {
            if (item.label.startsWith(this.filterText)) {
              return (
                <Link
                  key={item.path}
                  to={`${location.pathname}/${item.path}`}
                  component={ListItem}
                  text={item.label}
                />
              );
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={status === 'loading'}
              onRefresh={updateCountries}
            />
          }
        />
      </View>
    );
  }
}

const ReduxCountryListView = connect(mapStateToProps, mapDispatchToProps)(
  CountryListView,
);

export { ReduxCountryListView };
