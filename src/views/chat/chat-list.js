import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList} from "react-native"
import { Input, Divider, ListItem, Icon } from 'react-native-elements'
import {Actions} from "react-native-router-flux"
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'

const WINDOW = Dimensions.get('window')

@inject('store') @observer
export class ChatList extends Component {

  state = {
    search: ''
  }

  renderItem({item, index}) {
    return (
      <ListItem
        key={item._id}
        onPress={() => {
          Actions.push('chat-main', {chat: item._id})
        }}
        leftAvatar={{
          source: {uri: item.picture},
          rounded: true,
          overlayContainerStyle: {
            backgroundColor: 'white'
          },
        }}
        title={item.name}
        subtitle={item.lastMessage}
        rightTitle={item.time}
      />
    )
  }


  renderList() {
    const chats = this.props.store.chat.chatList.filter((item) => {
      return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
    })

    return (
      <FlatList
        data={chats}
        renderItem={(arg) => this.renderItem(arg)}
        keyExtractor={(item) => item._id}
      />
    )
  }

  renderSearchInput() {
    const { search } = this.state
    const icon = search !== '' ?
      (<Icon
        name="cancel"
        onPress={() => {
          this.refs.searchInput.clear()
          this.setState({search: ''})
        }}
      />)
        :
      (<Icon
        type="feather"
        name="search"
      />)
    return (
      <Input
        ref="searchInput"
        defaultValue={this.state.search}
        onChangeText={(text) => {
          this.setState({search: text.trim()})
        }}
        placeholder="Search through chats"
        containerStyle={styles.searchView}
        inputContainerStyle={styles.searchInputView}
        rightIcon={icon}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSearchInput()}
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    height: 100,
    width: WINDOW.width,
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  searchInputView: {
    marginHorizontal: WINDOW.width * 0.1
  },

});
