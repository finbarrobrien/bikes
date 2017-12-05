import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  text: {
    paddingLeft: 16,
    paddingTop: 8,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '500',
    fontSize: 24,
    color: 'rgba(0, 0, 0, 1.0)',
  },
});

export default class SectionItem extends React.PureComponent {
  static defaultProps = {
    text: '',
    onPress: () => {},
  };

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
