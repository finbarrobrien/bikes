import React, { Component } from 'react';
import { NativeRouter, AndroidBackButton } from 'react-router-native';
import { Route } from 'react-router-dom';
import { BikesProvider } from './src/redux/BikesProvider';
import { ReduxBikesApp } from './src/components/BikesApp';
import { ReduxCountryListView } from './src/views/CountryListView';
import { ReduxCityListView } from './src/views/CityListView';
import { ReduxNetworkListView } from './src/views/NetworkListView';

const routes = [
  <Route key="map" exact path="/" component={ReduxBikesApp} />,
  <Route key="countries" exact path="/citybikes" component={ReduxCountryListView} />,
  <Route key="cities" exact path="/citybikes/:country" component={ReduxCityListView} />,
  <Route key="networks" exact path="/citybikes/:country/:city" component={ReduxNetworkListView} />,
  <Route key="show-network" exact path="/citybikes/:country/:city/:network" component={ReduxBikesApp} />,
];

export default class App extends Component {

/*
  accordionItemRenderer = item => {
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
        renderItem={({ item }) => {
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
*/

  render() {
    return (
      <BikesProvider>
        <NativeRouter>
          <AndroidBackButton>
            {routes}
          </AndroidBackButton>
        </NativeRouter>
      </BikesProvider>
    );
  }
}

