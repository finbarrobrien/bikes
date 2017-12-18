import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import { ReduxBikesMapView } from '../views/BikesMapView';
import { FloatingActionButton } from '../../FloatingActionButton';
import { icons } from '../commons/icons';

import { connect } from 'react-redux';
import {
  setBikeParkingMode,
  updateNetwork,
  updateCountryList,
} from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  controls: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 10,
    padding: 16,
  },
});

const mapStateToProps = store => {
  return {
    network: store.selectedNetwork,
    region: store.region,
    showingBikes: store.showingBikes,
    activity: store.states.mapData === 'loading',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleBikeParking: () => {
      dispatch(setBikeParkingMode());
    },
    refreshStations: () => {
      if (ownProps.network) {
        dispatch(updateNetwork(ownProps.network));
      }
    },
    updateCountries: () => {
      dispatch(updateCountryList());
    },
  };
};

class BikesApp extends Component {
  componentDidMount() {
    this.props.updateCountries();
  }

  render() {
    const {
      showingBikes,
      toggleBikeParking,
      refreshStations,
      network,
      region,
      activity,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.map} />
        <ReduxBikesMapView />
        {
          activity ? <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#ff4081" />
          </View> : null
        }

        <View style={styles.controls}>
          <View style={styles.button}>
            <Link
              key="country-list"
              to="/citybikes"
              component={FloatingActionButton}
              color="#ff4081"
              src={icons.city}
              style={{ paddingTop: 16 }}
            />
            {network.stations ? (
              <FloatingActionButton
                style={{ paddingTop: 16, paddingRight: 8 }}
                key="biker"
                color="#757de8"
                small={true}
                src={showingBikes ? icons.bike : icons.parking}
                onPress={toggleBikeParking}
              />
            ) : null}
            {network.stations ? (
              <FloatingActionButton
                style={{ paddingRight: 8, paddingTop: 16 }}
                key="sync"
                color="#757de8"
                small={true}
                src={icons.refresh}
                onPress={() => {
                  refreshStations();
                }}
              />
            ) : null}
            <Link
              key="favourites"
              to="/favourites"
              component={FloatingActionButton}
              color="#757de8"
              small={true}
              src={icons.favourite}
              style={{ paddingTop: 16, paddingRight: 8 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const ReduxBikesApp = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BikesApp),
);

export { ReduxBikesApp };
