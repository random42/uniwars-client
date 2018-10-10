import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {Actions} from "react-native-router-flux";
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-native-elements'
import { GiftedChat } from 'react-native-gifted-chat';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';
import Avatar from 'react-native-user-avatar'
import { WINDOW } from '../../constants'

@inject('store') @observer
export class Chat extends Component {

  constructor(props) {
    super(props)
    this.chat = this.props.store.chat.getChat(this.props._id)
  }

  static propTypes = {
    _id: PropTypes.string
  }

  onSend(messages = []) {
    this.props.store.chat.sendMessages(this.props._id, messages)
  }


  renderHeader() {
    const ICON_SIZE = WINDOW.width * 0.075
    const HEIGHT = WINDOW.width * 0.22
    return (
      <View style={[{height: HEIGHT}, styles.header]}>
        <Icon id="back"
          name="arrow-back"
          onPress={() => Actions.pop()}
          size={ICON_SIZE}
          />
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => null/* TODO Actions.push() */}
          >
          <Avatar size={HEIGHT * 0.7} name={this.chat.name} src={this.chat.picture}/>
          <Text style={styles.chatName}>{this.chat.name}</Text>
        </TouchableOpacity>
        <Icon id="options"
          type="material-community"
          name="dots-vertical"
          size={ICON_SIZE}
          />
      </View>
    )
  }

  render() {
    const chat = this.chat
    const profile = this.props.store.profile
    const user = {
      _id: profile._id,
      name: profile.username,
      avatar: profile.picture
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <GiftedChat
          messages={toJS(chat.messages)}
          user={user}
          onSend={(mex) => this.onSend(mex)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: WINDOW.width * 0.05
    },
    chatName: {
      fontSize: 20
    }
});
