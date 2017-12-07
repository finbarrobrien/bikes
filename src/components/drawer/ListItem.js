import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { fonts } from '../../commons/fonts';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
  },
  badge: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    //paddingRight: 16,
  },

});

class ListItem extends Component {
  static defaultProps = {
    text: '',
    badge: '',
    onPress: () => {},
  };

  render() {
    const { badge, text, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.listItem}>
          {badge ?
            <View style={styles.badge}>
              <Image style={{width: 24, height: 24}} source={{uri: badge}}/>
            </View> :
            null
          }
          <Text style={fonts.subheader} numberOfLines={1} ellipsizeMode="tail">
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export { ListItem };
