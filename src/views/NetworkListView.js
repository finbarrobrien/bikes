import { View, StyleSheet } from 'react-native';
import { ListItem } from '../components/drawer/ListItem';
import { Link } from 'react-router-native';

const styles = {
  containerFullScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    ...StyleSheet.absoluteFillObject,
  },
};

const NetworkListView = ({networks}) => {
  return(
    <View style={styles.containerFullScreen}>
      {
        networks.forEach((c) => {

          <Link key={c.id} to={`/citybikes/${c.id}`} component={BikesMapView} networks={c.networks}/>
        })
      }
    </View>
  );
}

NetworkListView.defaultProps = {
  cities: [],
};

export { CityListView };