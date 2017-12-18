import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
    favourites: store.favourites,
  };
};

const title = 'Favourite Networks';

class FavouriteListView extends Component  {

  filterText = '';

  static defaultProps = {
    favourites: [],
  };


  render() {
    const { match, location, history } = this.props;
    return(
        <View style={styles.containerFullScreen}>
          <ListViewHeader history={history} title={title} />
        </View>
    );
  }
};

const ReduxFavouriteListView = connect(mapStateToProps)(FavouriteListView);

export { ReduxFavouriteListView };