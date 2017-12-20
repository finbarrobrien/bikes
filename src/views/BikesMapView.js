import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { icons } from '../commons/icons';
import { updateMapRegion } from '../redux/actions';
import isEqual from 'lodash/isEqual';

const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_REGION = {
  latitude: 53.347539,
  longitude: -6.259272,
  latitudeDelta: INITIAL_LATITUDE_DELTA,
  longitudeDelta: INITIAL_LONGITUDE_DELTA,
};

const mapStateToProps = store => {
  return {
    showingBikes: store.showingBikes,
    stations: store.selectedNetwork.stations,
    region: store.region,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMapRegion: region => {
      dispatch(updateMapRegion(region));
    },
  };
};

const getStationDescription = station => {
  return `${station.free_bikes || 0} bikes, ${station.empty_slots || 0} spaces`;
};

const getPin = (station, showingBikes) => {
  if (showingBikes) {
    return station.free_bikes === 0 || !station.free_bikes
      ? { uri: icons.marker.grey }
      : station.free_bikes < station.extra.slots * 0.33
        ? { uri: icons.marker.red }
        : station.free_bikes < station.extra.slots * 0.5
          ? { uri: icons.marker.amber }
          : { uri: icons.marker.green };
  } else {
    return station.empty_slots === 0 || !station.empty_slots
      ? { uri: icons.marker.grey }
      : station.empty_slots < station.extra.slots * 0.33
        ? { uri: icons.marker.red }
        : station.empty_slots < station.extra.slots * 0.5
          ? { uri: icons.marker.amber }
          : { uri: icons.marker.green };
  }
};
const stationCoordinates = s => {
  return {
    latitude: s.latitude,
    longitude: s.longitude,
  };
};

class BikesMapView extends React.Component {
  shouldFitMarkers = true;

  fitToMarkers() {
    if (this.props.stations && this.props.stations.length) {
      setTimeout(() => {
        this.shouldFitMarkers = false;
        this.map.fitToCoordinates(this.props.stations.map(stationCoordinates), {
          animated: true,
          edgePadding: { top: 82, right: 82, bottom: 82, left: 82 },
        });
      }, 200);
    }
  }

  // only for updates caused by new stations or mode change
  componentDidUpdate(prev) {
    if (!isEqual(prev.stations, this.props.stations)) {
      this.shouldFitMarkers = true;
    } else {
      /*if(this.props.stations && !isEqual(prev.showingBikes, this.props.showingBikes)){
        this.fitToMarkers();
      }*/
    }
  }


  componentDidMount() {
    // Exit on back button press when in map view
    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp();
      return false;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', function() {
      BackHandler.exitApp();
      return false;
    });
  }


  render() {
    const { region, stations, showingBikes, updateMapRegion, history } = this.props;
    let mapRegion;
    if (!region) {
      mapRegion = DEFAULT_REGION;
    } else {
      mapRegion = {
        ...DEFAULT_REGION,
        ...region,
      };
    }

    return (
      <MapView
        style={styles.map}
        region={mapRegion}
        ref={elem => {
          this.map = elem;
        }}
        onRegionChangeComplete={r => {
          updateMapRegion(r);
        }}
        onLayout={() => { if(this.shouldFitMarkers) { this.fitToMarkers(); }}}
      >
        {stations
          ? stations.map(s => {
              return (
                <MapView.Marker
                  image={getPin(s, showingBikes)}
                  key={s.id}
                  title={s.extra.address || s.name}
                  description={getStationDescription(s)}
                  coordinate={stationCoordinates(s)}
                />
              );
            })
          : null}
      </MapView>
    );
  }
}

const ReduxBikesMapView = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BikesMapView),
);

export { ReduxBikesMapView };
