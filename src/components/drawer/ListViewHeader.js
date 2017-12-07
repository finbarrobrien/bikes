import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../../commons/icons';
import { fonts } from '../../commons/fonts';

const styles = {
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 56,
    width: 'auto',
    backgroundColor: '#3f51b5',
  },
  backButton: { width: 56, padding: 16 },
  icon: { width: 24, height: 24 },
};
const ListViewHeader = ({ title, history }) => {
  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => {
            history.go(-1);
          }}
        >
          <Image style={styles.icon} source={{ uri: icons.backButton }} />
        </TouchableOpacity>
      </View>
      <Text style={fonts.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
};

export { ListViewHeader };
