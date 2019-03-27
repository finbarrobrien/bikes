import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { fonts } from '../../commons/fonts';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  badge: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },

});

class ListItem extends Component {
  static defaultProps = {
    text: '',
    action: '',
    onPress: () => {},
    onAction: () => {},
  };

  render() {
    const { action, text, onPress, onAction } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.listItem}>
          <Text style={fonts.subheader} numberOfLines={1} ellipsizeMode="tail">
            {text}
          </Text>
          {action ?
              <TouchableOpacity onPress={onAction}>
                <View style={styles.badge}>
                  <Image style={{width: 24, height: 24}} source={{uri: action}}/>
                </View>
              </TouchableOpacity> :
              null
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export { ListItem };
