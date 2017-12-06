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

const CityListView = ({cities}) => {
  return(
    <View style={styles.containerFullScreen}>
      {
        cities.forEach((c) => {
          <Link key={c.name} to={`/citybikes/${c.id}`} component={NetworkListView} networks={c.networks}/>
        })
      }
    </View>
  );
}

CityListView.defaultProps = {
  cities: [],
};

export { CityListView };