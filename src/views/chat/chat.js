import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {Actions} from "react-native-router-flux";
import PropTypes from 'prop-types'
import { GiftedChat } from 'react-native-gifted-chat';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';

@inject('store') @observer
export class Chat extends Component {

  propTypes: {
    chat: PropTypes.string
  }

  onSend(messages = []) {
    this.props.store.chat.sendMessages(this.props.chat, messages)
  }

  render() {
    const chat = this.props.store.chat.getChat(this.props.chat)
    const profile = this.props.store.profile
    const user = {
      _id: profile._id,
      name: profile.username,
      avatar: profile.picture
    }
    return (
      <View style={styles.container}>
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
});
