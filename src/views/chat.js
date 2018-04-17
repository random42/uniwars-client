import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {Actions} from "react-native-router-flux";
import {ChatChoice} from '../components';
import { GiftedChat } from 'react-native-gifted-chat';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';

const testUser = {
  _id: 1
}

@inject('store') @observer
export class Chat extends Component {

  onSend(messages = []) {
    this.props.store.chat.sendMessage(messages);
  }

  selectChat(id) {
    this.props.store.chat.selectChat(id);
  }

  render() {
    let {chat} = this.props.store;
    let messages = chat.messages;
    return (
        <View style={styles.container}>
          <View style={styles.chatChoiceView}>
            <ChatChoice
              data={chat.chats}
              selected={chat.activeChat}
              onPressItem={this.selectChat.bind(this)}/>
          </View>
          <View style={styles.chatView}>
            <GiftedChat
              messages={messages}
              user={testUser}
              onSend={this.onSend.bind(this)}
            />
          </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'yellow',
    },
    chatChoiceView: {
      flex: 1,
      backgroundColor: 'red',
    },
    chatView: {
      flex: 4
    }
});
