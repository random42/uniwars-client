import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import { List, ListItem, Icon, Divider } from 'react-native-elements'
import Button from 'react-native-button';
import Avatar from 'react-native-user-avatar'
import { inject, observer } from 'mobx-react/native';

const WINDOW = Dimensions.get('window')

@inject('store') @observer
export class Profile extends Component {

  renderOptions() {

  }

  renderInfos() {
    const user = this.props.store.profile;
    const infos = [{
        key: 'username',
        icon: {
          size: 30,
          name: 'person'
        },
        text: "@" + user.username,
        style: {fontSize: 18, fontWeight: 'bold'}
      },{
        key: 'uni',
        icon: {
          size: 25,
          name: 'university',
          type: 'font-awesome'
        },
        text: user.uni.name,
        style: {}
      },{
        key: 'major',
        icon: {
          size: 25,
          name: 'graduation-cap',
          type: 'font-awesome'
        },
        text: user.major,
        style: {}
      }
    ];
    if (user.team) {
      infos.push({
        key: 'team',
        icon: {
          size: 25,
          name: 'users',
          type: 'entypo'
        },
        text: user.team.name,
        style: {}
      })
    }

    const renderItem = (item) => {
      if (item)
      return (
        <View key={item.key} style={styles.infoView}>
          <Icon {...item.icon}/>
          <Text style={[styles.infoText,item.style]}>{item.text}</Text>
        </View>
      )
    }
    return (
      <View style={styles.infosView}>
        {renderItem(infos[0])}
        <Divider />
        {renderItem(infos[1])}
        <Divider />
        {renderItem(infos[2])}
      </View>
    );
  }

  render(){
    const user = this.props.store.profile;
    return (
        <View style={styles.container}>
          <View style={styles.topView}>
            <Avatar
              size={WINDOW.width / 3.5}
              name={user.username}
              src={user.picture}
              >
            </Avatar>
            {this.renderInfos()}
          </View>
          <View style={styles.bottomView}></View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: 'yellow',
    },
    topView: {
      height: WINDOW.width * 0.4,
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingLeft: WINDOW.width * 0.03
    },
    bottomView: {
      flex: 2,
      backgroundColor: 'blue'
    },
    imageView: {
      flex: 1,
    },
    infosView: {
      flex: 1.3,
      marginLeft: 20,
      marginRight: 10,
    },
    infoView: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      marginLeft: 10,
    },
    name: {

    },
    uni: {

    },
    major: {

    },
});
