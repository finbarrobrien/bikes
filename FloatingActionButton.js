import React from 'react';
import { StyleSheet, Image, View, TouchableNativeFeedback } from 'react-native';

const Button = StyleSheet.create({
  roundButton: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default class FloatingActionButton extends React.Component {
  static defaultProps = {
    src: '',
    elevation: 2,
    radius: 56,
    color: '',
    onPress: () => {},
    size: 'normal' // 'normal' or 'small'
  };

  render() {
    const {
      accessibilityLabel,
      color,
      src,
      onPress,
      disabled,
      testID,
      elevation,
      radius,
    } = this.props;

    const buttonStyle = [Button.roundButton];
    const accessibilityTraits = ['button'];

    if (color) {
      buttonStyle.push({ backgroundColor: this.props.color });
    }
    if(elevation) {
      buttonStyle.push({ elevation: this.props.elevation });
    }
    if (radius) {
      buttonStyle.push({
        width: this.props.radius,
        height: this.props.radius,
        borderRadius: this.props.radius,
      });
    } else {
      if (this.props.small) {
        buttonStyle.push({
          width: this.props.small ? 40 : 56,
          height: this.props.small ? 40 : 56,
          borderRadius: this.props.small ? 40 : 56,
        });
      }
    }

    return (
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyle}>
          <Image style={Button.icon} source={{ uri: src }} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}
