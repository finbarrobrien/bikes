import React, { Component } from 'react';
import { NativeRouter, AndroidBackButton } from 'react-router-native';
import { Route } from 'react-router-dom';
import { BikesProvider } from './src/redux/BikesProvider';
import { ReduxBikesApp } from './src/components/BikesApp';
import { CountryListView } from './src/views/CountryListView';

const routes = [
  <Route key="home" exact path="/citybikes" component={CountryListView} />,
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
            <ReduxBikesApp />
          </AndroidBackButton>
        </NativeRouter>
      </BikesProvider>
    );
  }
}

