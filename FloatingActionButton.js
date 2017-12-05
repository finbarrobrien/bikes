import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableNativeFeedback,
  Animated,
  Easing,
} from 'react-native';

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
  state = {
    scale: new Animated.Value(0), // Initial value for opacity: 0
  };

  static defaultProps = {
    src: '',
    elevation: 2,
    radius: 28,
    color: '',
    onPress: () => {},
    small: false,
    size: 'normal', // 'normal' or 'small'
  };

  componentDidMount() {
    Animated.timing(this.state.scale, {
      toValue: 1,
      easing: Easing.in(),
      duration: 250,
    }).start();
  }

  componentWillUnmount() {
    Animated.timing(this.state.scale, {
      toValue: 0,
      easing: Easing.in(),
      duration: 250,
    }).start();
  }

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
    if (elevation) {
      buttonStyle.push({ elevation: this.props.elevation });
    }
    if (radius) {
      buttonStyle.push({
        width: 2 * this.props.radius,
        height: 2 * this.props.radius,
        borderRadius: 2 * this.props.radius,
      });
    } else {
      buttonStyle.push({
        width: this.props.small ? 20 : 28,
        height: this.props.small ? 20 : 28,
        borderRadius: this.props.small ? 20 : 28,
      });
    }
    buttonStyle.push({ transform: [{ scale: this.state.scale }]});

    return (
      <Animated.View style={buttonStyle}>
        <TouchableNativeFeedback
          accessibilityComponentType="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={accessibilityTraits}
          testID={testID}
          disabled={disabled}
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#ffffff', true)}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              flex: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image style={Button.icon} source={{ uri: src }} />
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    );
  }
}
