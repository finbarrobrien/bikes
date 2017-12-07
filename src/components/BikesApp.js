import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import { ReduxBikesMapView } from '../views/BikesMapView';
import { FloatingActionButton } from '../../FloatingActionButton';
import { icons } from '../commons/icons';

import { connect } from 'react-redux';
import { setBikeParkingMode, updateNetwork, updateCountryList } from '../redux/actions';

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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    zIndex: 10,
    padding: 16,
  },
});


const mapStateToProps = store => {
  return {
    network: store.selectedNetwork,
    mapCenter: store.mapCenter,
    showingBikes: store.showingBikes,
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
    const { showingBikes, toggleBikeParking, refreshStations, network, mapCenter } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.map} />
        <ReduxBikesMapView
          center={mapCenter}
          stations={network}
          showingBikes={showingBikes}
        />
        <View style={styles.controls}>
          <View style={styles.button}>
            <Link key="country-list" to="/citybikes" component={FloatingActionButton} color="#607D8B" src={icons.city} style={{ paddingLeft: 16, paddingRight: 16 }} />
            <FloatingActionButton
              style={{  paddingRight: 16 }}
              key="biker"
              color="#607D8B"
              src={showingBikes ? icons.bike : icons.parking}
              onPress={toggleBikeParking}
            />
            <FloatingActionButton
              key="sync"
              color="#607D8B"
              src={icons.refresh}
              onPress={() => {
                refreshStations();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const ReduxBikesApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(BikesApp));

export { ReduxBikesApp };
