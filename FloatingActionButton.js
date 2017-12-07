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
  icon: {
    width: 24,
    height: 24,
  },
});


class FloatingActionButton extends React.Component {
  state = {
    scale: new Animated.Value(0), // Initial value for opacity: 0
  };

  static defaultProps = {
    style: {},
    src: '',
    elevation: 2,
    radius: null,
    color: '',
    onPress: () => {},
    small: false,
    animation: 'scale', // 'scale', 'slide'
    size: 'normal', // 'normal' or 'small'
  };

  componentDidMount() {
    switch(this.props.animation) {
      case 'slide':
        this.slide(0);
        break;
      case 'scale':
      default:
        this.scale(1);
        break;
    }
  }

  slide = (target) => {
    Animated.timing(this.state.scale, {
      toValue: target,
      easing: Easing.in(),
      duration: 250,
      delay: 200,
    }).start();
  }

  scale = (target) => {
    Animated.timing(this.state.scale, {
      toValue: target,
      easing: Easing.in(),
      duration: 250,
      delay: 200,
    }).start();
  }

  componentWillUnmount() {
    switch(this.props.animation) {
      case 'slide':
        this.slide(1);
        break;
      case 'scale':
      default:
        this.scale(0);
        break;
    }
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
      small,
      style,
    } = this.props;

    const buttonStyle = [];
    const accessibilityTraits = ['button'];

    if (color) {
      buttonStyle.push({ backgroundColor: color });
    }
    if (elevation) {
      buttonStyle.push({ elevation: elevation });
    }
    const buttonSize = {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: 2 * (radius ? radius : (small ? 20 : 28)),
      height: 2 * (radius ? radius : (small ? 20 : 28)),
      borderRadius: 2 * (radius ? radius : (small ? 20 : 28)),
    };
    buttonStyle.push(buttonSize);
    buttonStyle.push({ transform: [{ scale: this.state.scale }] });

    return (
      <View style={style}>
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
            <View style={buttonSize}>
              <Image style={Button.icon} source={{ uri: src }} />
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
      </View>
    );
  }
}

export { FloatingActionButton };