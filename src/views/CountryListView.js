import { View } from 'react-native';
import { ListItem } from '../components/drawer/ListItem';
import { Link } from 'react-router-native';

const selectCountry = (country) => {

}

const CountryListView = ({countries}) => {
  return(
    <View>
      {
        countries.forEach((c) => {
          <Link to={country}>
            <ListItem text={country} onPress={onPress}/>
          </Link>
        })
      }
    </View>
  );
}