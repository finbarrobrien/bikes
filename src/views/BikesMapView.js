import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { icons } from '../commons/icons';


const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

const mapStateToProps = store => {
  return {
    showingBikes: store.showingBikes,
    network: store.selectedNetwork,
    region: store.currentRegion,
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
    const { region, network, showingBikes } = this.props;
    let stations = []
    /*if(network) {
      console.warn(network);
      stations = network.stations.map(station => {
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
    }*/
    return (
      <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          region={region}
          showsUserLocation
          showsMyLocationButton
      >
        { stations }
      </MapView>
    );
  }
};

const ReduxBikesMapView = connect(mapStateToProps)(BikesMapView);

export { ReduxBikesMapView };