import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { icons } from '../commons/icons';


const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO;

const mapStateToProps = store => {
  return {
    showingBikes: store.showingBikes,
    stations: store.selectedNetwork.stations,
    center: store.mapCenter,
  };
};

const getStationDescription = station => {
  return `${station.free_bikes || 0} bikes, ${station.empty_slots || 0} spaces`;
};

/*const getLocation = () => {
  let watchId = null;
  if (navigator.geolocation) {
    const position = navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: INITIAL_LATITUDE_DELTA,
              longitudeDelta: INITIAL_LONGITUDE_DELTA,
            },
            error: null,
          })
        },
        (error) => { console.warn(error); }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  } else {
    this.setState({
      error: 'Geolocation is not available'
    })
  }
  return watchId;
}*/

const getPin = (station, showingBikes) => {
  if (showingBikes) {
    return station.free_bikes === 0
      ? { uri: icons.marker.grey }
      : station.free_bikes < station.extra.slots * 0.33
        ? { uri: icons.marker.red }
        : station.free_bikes < station.extra.slots * 0.5
          ? { uri: icons.marker.amber }
          : { uri: icons.marker.green };
  } else {
    return station.empty_slots === 0
      ? { uri: icons.marker.grey }
      : station.empty_slots < station.extra.slots * 0.33
        ? { uri: icons.marker.red }
        : station.empty_slots < station.extra.slots * 0.5
          ? { uri: icons.marker.amber }
          : { uri: icons.marker.green };
  }
};

class BikesMapView extends React.Component {

  render() {
    const { center, stations, showingBikes } = this.props;
    const region = {
      latitude: center.latitude,
      longitude: center.longitude,
      latitudeDelta: INITIAL_LATITUDE_DELTA,
      longitudeDelta: INITIAL_LONGITUDE_DELTA,
    };

    let markers = [];
    if(stations) {
      markers = stations.map(station => {
        return (
            <MapView.Marker
                image={getPin(station, showingBikes)}
                key={station.id}
                title={station.extra.address || station.name}
                description={getStationDescription(station)}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
            />
        );
      });
    }
    return (
      <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton
      >
        { markers }
      </MapView>
    );
  }
};

const ReduxBikesMapView = withRouter(connect(mapStateToProps)(BikesMapView));

export { ReduxBikesMapView };