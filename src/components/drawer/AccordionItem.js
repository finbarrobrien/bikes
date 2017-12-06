import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ListItem } from './ListItem';
import { icons } from "../../commons/icons";

const styles = StyleSheet.create({
  listItem: {
    height: 48,
    width: '100%',
  },
  badge: {
    width: 24,
    height: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 32,
  },
  text: {
    paddingLeft: 16,
    paddingTop: 8,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'normal',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

const badges = {
  expand: icons.more,
  contract: icons.less,
};

class AccordionItem extends React.Component {
  state = {
    expanded: false,
  };

  static defaultProps = {
    data: [],
    text: '',
    itemRenderer: () => {},
  };

  onPress = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { data, text, itemRenderer } = this.props;
    const subItems = [];
    if (this.state.expanded) {
      data.forEach(item => subItems.push(itemRenderer(item)));
    }
    return (
        <View>
          <ListItem
            text={text}
            onPress={this.onPress}
            badge={this.state.expanded ? badges.contract : badges.expand}
          />
          { subItems }
        </View>
    );
  }
}

export { AccordionItem };
