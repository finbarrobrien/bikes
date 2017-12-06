import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom';

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
    region: store.currentRegion,
    showingBikes: store.showingBikes,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleBikeParking: () => {
      dispatch(setBikeParkingMode({ showingBikes: !ownProps.showingBikes }));
    },
    refreshStations: () => {
      dispatch(updateNetwork(ownProps.network));
    },
  };
};

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO;

class BikesApp extends React.Component {

  componentDidMount() {
    dispatch(updateCountryList());
  }

  render() {
    const { showingBikes, toggleBikeParking, network, region } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.map} />
        <ReduxBikesMapView
          region={region}
          stations={network}
          showingBikes={showingBikes}
        />
        <View style={styles.controls}>
          <View style={styles.button}>
            <Link
              to="/citybikes"
              component={FloatingActionButton}
              color="#607D8B"
              src={icons.city}
            />
            <FloatingActionButton
              style={{ paddingLeft: 16, paddingRight: 16 }}
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

const ReduxBikesApp = connect(mapStateToProps, mapDispatchToProps)(BikesApp);

export { ReduxBikesApp };
