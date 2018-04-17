import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, FlatList, Image} from "react-native";
import {Avatar} from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';


export class ChatChoice extends Component {

  renderItem({item}) {
    return (
      <ChatChoiceItem
        item={item}
        selected={this.props.selected}
        onPress={this.props.onPressItem}
        />
    );
  }

  _keyExtractor(item) { return item._id; }

  render() {
    let data = this.props.data;
    let {selected} = this.props;
    return (
      <FlatList
        bounces={false}
        contentContainerStyle={styles.view}
        extraData={selected}
        data={data}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}


class ChatChoiceItem extends Component {

  _onPress() {
    this.props.onPress(this.props.item._id);
  }

  render() {
    let {item, selected} = this.props;
    let style = selected === item._id ? StyleSheet.flatten([styles.item,styles.selItem]) : styles.item;
    return (
      <View style={style}>
        <Avatar rounded medium source={{uri: item.image}}
          activeOpacity={0.7}
          onPress={this._onPress.bind(this)}
          />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15
  },
  itemText: {
    marginTop: 5
  },
  selItem: {
    borderWidth: 1
  },
  avatarContainer: {

  },
});
