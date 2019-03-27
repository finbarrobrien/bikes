import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

import { ListItem } from '../components/drawer/ListItem';
import { ListViewHeader } from '../components/drawer/ListViewHeader';
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
    favourites: store.favourites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNetwork: network => {
      dispatch(updateNetwork(network));
    },
  };
};

const title = 'Favourite Networks';

class FavouriteListView extends Component {
  filterText = '';

  static defaultProps = {
    favourites: [],
  };

  render() {
    const { match, location, history, favourites, selectNetwork } = this.props;
    return (
      <View style={styles.containerFullScreen}>
        <ListViewHeader history={history} title={title} />
        <FlatList
          data={favourites}
          keyExtractor={item => {
            const { network } = item;
            return network;
          }}
          renderItem={({ item }) => {
            const { label, country, city, network } = item;
            return (
              <Link
                key={`${network}/${city}/${country}`}
                to={`/citybikes/${country}/${city}/${network}`}
                onPress={() => {
                  selectNetwork(network);
                }}
                component={ListItem}
                text={`${label}/${city}/${country}`}
              />
            );
          }}
        />
      </View>
    );
  }
}

const ReduxFavouriteListView = connect(mapStateToProps, mapDispatchToProps)(
  FavouriteListView,
);

export { ReduxFavouriteListView };
