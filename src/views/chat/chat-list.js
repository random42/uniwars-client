import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList} from "react-native"
import { Input, Divider, ListItem, Icon } from 'react-native-elements'
import {Actions} from "react-native-router-flux"
import PropTypes from 'prop-types'
import { SearchInput } from '../../components'
import { inject, observer } from 'mobx-react/native'
import { toJS } from 'mobx'


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
          Actions.push('chat-main', {_id: item._id})
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

  render() {
    return (
      <View style={styles.container}>
        <SearchInput
          defaultValue={this.state.search}
          onChangeText={(text) => {
            this.setState({search: text})
          }}
          />
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
