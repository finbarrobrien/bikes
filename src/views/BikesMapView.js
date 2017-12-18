import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { icons } from '../commons/icons';
import { updateMapRegion } from '../redux/actions';

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
    region: store.region,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
  markerCoordinates = [];
  markers = [];

  componentDidUpdate() {
    if (this.map && this.markerCoordinates.length) {
      this.map.fitToCoordinates(this.markerCoordinates, {
        animated: true,
        edgePadding: { top: 16, right: 16, bottom: 16, left: 16 },
      });
    }
  }

  render() {
    const { stations, showingBikes, updateMapRegion } = this.props;
    let region;
    if (!this.props.region) {
      region = {
        latitude: 53.347539,
        longitude: -6.259272,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA,
      };
    } else {
      region = this.props.region;
    }

    if (stations) {
      this.markers = [];
      this.markerCoordinates = [];
      stations.forEach(station => {
        const marker = {
          latitude: station.latitude,
          longitude: station.longitude,
        };
        this.markerCoordinates.push(marker);
        this.markers.push(
          <MapView.Marker
            image={getPin(station, showingBikes)}
            key={station.id}
            title={station.extra.address || station.name}
            description={getStationDescription(station)}
            coordinate={marker}
          />,
        );
      });
    }
    return (
      <MapView
        style={styles.map}
        region={region}
        ref={elem => {
          this.map = elem;
        }}
        onRegionChangeComplete={(region) => updateMapRegion(region)}
      >
        {this.markers}
      </MapView>
    );
  }
}

const ReduxBikesMapView = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BikesMapView),
);

export { ReduxBikesMapView };
