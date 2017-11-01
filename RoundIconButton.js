import React from 'react';
import { StyleSheet, Image, View, TouchableNativeFeedback } from 'react-native';

const Button = StyleSheet.create({
  roundButton: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: 56,
      height: 56,
      borderRadius: 56,
      elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});


export default class RoundIconButton extends React.Component {

  static defaultProps = {
    icon: '',
    color: '',
    onPress: null,
  }

  render() {
    const {
      accessibilityLabel,
      color,
      icon,
      onPress,
      disabled,
      testID,
    } = this.props;

    const buttonStyle = [Button.roundButton];
    const accessibilityTraits = ['button'];

    if (this.props.color) {
      buttonStyle.push({ backgroundColor: this.props.color });
    }

    return (
      <TouchableNativeFeedback
          accessibilityComponentType="button"
          accessibilityLabel={ accessibilityLabel }
          accessibilityTraits={ accessibilityTraits }
          testID={ testID }
          disabled={ disabled }
          onPress={ onPress }>
        <View style={ buttonStyle }>
          <Image style={ Button.icon } source={ { uri: this.props.icon } }/>
        </View>
      </TouchableNativeFeedback>
    );
  }

}

