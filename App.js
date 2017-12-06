import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  DrawerLayoutAndroid,
  FlatList,
  Dimensions,
} from 'react-native';

import { BikesMapView } from './src/views/BikesMapView';
import { ListItem } from './src/components/drawer/ListItem';
import { COUNTRY_CODES } from './src/commons/consts';
import { icons} from "./src/commons/icons";
import { getBikeNetworkInfo } from './src/api/api';
import { FloatingActionButton } from './FloatingActionButton';
import { AccordionItem } from './src/components/drawer/AccordionItem';


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
      showingBikes: true,
      region: {
        latitude: 53.347539,
        longitude: -6.259272,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA,
      },
      error: null,
    };
  }

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
            return c.shortCode === net.location.country;
          });
          if (!c) {
            const cMap = COUNTRY_CODES.find(country => {
              return country.shortCode === net.location.country;
            });
            if (cMap) {
              countries.push({
                title: cMap.label,
                shortCode: net.location.country,
                data: [net],
              });
            }
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
          countries: countries
        });
      })
      .catch(error => {
        console.warn(error);
      });
  };

  getBikesLocations = async (city) => {
    const network = await getBikeNetworkInfo(city);
    const newRegion = {
      latitude: network.location.latitude,
      longitude: network.location.longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    };
    //this.map.animateToRegion(newRegion);
    this.setState({
      city,
      stations: network.stations,
      region: newRegion,
    });
  };

  onRegionChange = region => {
    this.setState({ region });
  };



  toggleBikeParking = () => {
    this.setState({
      showingBikes: !this.state.showingBikes,
    });
  };

  onChangeCity = city => {
    if (city) {
      this.getBikesLocations(city.toLowerCase());
    }
  };

  accordionItemRenderer = (item) => {
    return (
      <ListItem
        key={item.id}
        text={item.location.city}
        onPress={() => {
          this.onChangeCity(item.id);
          this.drawer.closeDrawer();
        }}
      />
    );
  };

  cityListView = () => {
    return (
      <FlatList
        data={this.state.countries}
        keyExtractor={item => {
          return item.title;
        }}
        renderItem={({item}) => {
          return (
            <AccordionItem
              text={item.title}
              data={item.data}
              itemRenderer={this.accordionItemRenderer}
            />
          );
        }}
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
          <BikesMapView region={this.state.region} stations={this.state.stations} showingBikes={this.state.showingBikes}/>
          <View style={styles.controls}>
            <View style={styles.button}>
              <FloatingActionButton
                key="locations"
                color="#607D8B"
                src={icons.city}
                onPress={() => {
                  this.drawer.openDrawer();
                }}
              />
              <FloatingActionButton
                style={{ paddingLeft: 16, paddingRight: 16 }}
                key="biker"
                color="#607D8B"
                src={
                  this.state.showingBikes
                    ? icons.bike
                    : icons.parking
                }
                onPress={this.toggleBikeParking}
              />
              <FloatingActionButton
                key="sync"
                color="#607D8B"
                src={ icons.refresh}
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
    zIndex: 10,
    padding: 16,
  },
});
