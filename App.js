import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Picker,
  Text,
  DrawerLayoutAndroid,
  SectionList,
} from 'react-native';
import MapView from 'react-native-maps';

import FloatingActionButton from './FloatingActionButton';
import SectionItem from './SectionItem';
import SectionHeader from './SectionHeader';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = INITIAL_LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      city: null,
      stations: [],
      needABike: true,
      region: {
        latitude: 53.347539,
        longitude: -6.259272,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA,
      },
      error: null,
    };
  }

  /*watchLocation() {
        if (navigator.geolocation) {
            this.watchId = navigator.geolocation.watchPosition((position) => {
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
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        } else {
            this.setState({
                error: 'Geolocation is not available'
            })
        }
    }*/

  componentDidMount() {
    //this.watchLocation();
    this.getCities();
    //this.getBikesLocations(this.state.city);
  }

  componentWillUnmount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  getCities = () => {
    console.warn('call me once');
    return fetch('https://api.citybik.es/v2/networks')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.warn('response not ok');
        }
      })
      .then(responseJson => {
        const countries = [];
        responseJson.networks.forEach(net => {
          let c = countries.find(c => {
            return c.title === net.location.country;
          });
          if (!c) {
            countries.push({ title: net.location.country, data: [net] });
          } else {
            c.data.push(net);
          }
        });
        countries.forEach(country => {
          country.data.sort((a, b) => {
            return a.location.city < b.location.city
              ? -1
              : a.location.city > b.location.city ? 1 : 0;
          });
        });
        countries.sort((a, b) => {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
        this.setState({
          countries: countries.filter(c => {
            return c.title === 'IE';
          }), // temporary measure till performance can be fixed
        });
      })
      .catch(error => {
        console.warn(error);
      });
  };

  getBikesLocations = city => {
    if (city) {
      return fetch(`https://api.citybik.es/v2/networks/${city}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.warn('response not ok');
          }
        })
        .then(responseJson => {
          const newRegion = {
            latitude: responseJson.network.location.latitude,
            longitude: responseJson.network.location.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          };
          this.map.animateToRegion(newRegion);
          this.setState({
            city,
            stations: responseJson.network.stations,
            region: newRegion,
          });
        })
        .catch(error => {
          console.warn(error);
        });
    }
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  getStationDescription = station => {
    return `${station.free_bikes} bikes, ${station.empty_slots} spaces`;
  };

  getPin = station => {
    if (this.state.needABike) {
      return station.free_bikes === 0
        ? { uri: 'ic_place_grey_24px' }
        : station.free_bikes < station.extra.slots * 0.33
          ? { uri: 'ic_place_red_24px' }
          : station.free_bikes < station.extra.slots * 0.5
            ? { uri: 'ic_place_amber_24px' }
            : { uri: 'ic_place_green_24px' };
    } else {
      return station.empty_slots === 0
        ? { uri: 'ic_place_grey_24px' }
        : station.empty_slots < station.extra.slots * 0.33
          ? { uri: 'ic_place_red_24px' }
          : station.empty_slots < station.extra.slots * 0.5
            ? { uri: 'ic_place_amber_24px' }
            : { uri: 'ic_place_green_24px' };
    }
  };

  toggleBikeParking = () => {
    this.setState({
      needABike: !this.state.needABike,
    });
  };

  onChangeCity = city => {
    if (city) {
      this.getBikesLocations(city.toLowerCase());
    }
  };

  cityListView = () => {
    return (
      <SectionList
        keyExtractor={item => {
          return item.id;
        }}
        maxToRenderPerBatch={200}
        renderItem={({ item }) => (
          <SectionItem
            text={item.location.city}
            onPress={() => {
              this.onChangeCity(item.id);
            }}
          />
        )}
        renderSectionHeader={({ section }) => (
          <SectionHeader text={section.title} />
        )}
        sections={this.state.countries}
      />
    );
  };

  render() {
    const region = this.state.region;

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={el => {
          this.drawer = el;
        }}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.cityListView}
      >
        <View style={styles.container}>
          <View style={styles.map} />
          <MapView
            style={styles.map}
            ref={ref => {
              this.map = ref;
            }}
            region={region}
            showsUserLocation
            showsMyLocationButton
          >
            {this.state.stations.map(station => {
              return (
                <MapView.Marker
                  image={this.getPin(station)}
                  key={station.id}
                  title={station.extra.address || station.name}
                  description={this.getStationDescription(station)}
                  coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                  }}
                />
              );
            })}
          </MapView>
          <View style={styles.controls}>
            <View style={styles.button}>
              <FloatingActionButton
                key="locations"
                color="#607D8B"
                src="ic_place_white_24px"
                onPress={() => {
                  this.drawer.openDrawer();
                }}
              />
              <FloatingActionButton
                key="biker"
                color="#607D8B"
                src={
                  this.state.needABike
                    ? 'ic_directions_bike_white_24px'
                    : 'ic_local_parking_white_24px'
                }
                onPress={this.toggleBikeParking}
              />
              <FloatingActionButton
                key="sync"
                color="#607D8B"
                src="ic_sync_white_24px"
                onPress={() => {
                  this.onChangeCity(this.state.city);
                }}
              />
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

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
  picker: {
    width: 180,
    height: 60,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    paddingTop: 16,
  },
  pickerText: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'normal',
    fontSize: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: 10,
  },
});
