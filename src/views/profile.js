import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import {Actions} from "react-native-router-flux";
import { List, ListItem, Avatar, Icon, Divider } from 'react-native-elements'
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';

@inject('store') @observer
export class Profile extends Component {

  renderOptions() {

  }

  renderInfos() {
    let user = this.props.store.profile;
    let infos = [{
        key: 'name',
        icon: {
          size: 30,
          name: 'person'
        },
        text: user.name,
        style: {fontSize: 20, fontWeight: 'bold'}
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

    let renderItem = (item) => {
      if (item)
      return (
        <View key={item.key} style={styles.infoView}>
          <Icon {...item.icon}/>
          <Text style={[styles.infoText,item.style]}>{item.text}</Text>
        </View>
      )
    }
    if (user.team) {
      return (
        <View style={styles.infosView}>
          {renderItem(infos[0])}
          <Divider />
          {renderItem(infos[1])}
          <Divider />
          {renderItem(infos[2])}
          <Divider />
          {renderItem(infos[3])}
        </View>
      );
    }
    else {
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
  }

  render(){
    let user = this.props.store.profile;
    return (
        <View style={styles.container}>
          <View style={styles.topView}>
            <Avatar rounded
              containerStyle={{marginLeft: 10}}
              xlarge
              source={{uri: user.image}}
              component={View}>
              <Icon name=''/>
            </Avatar>
            {this.renderInfos()}
          </View>
          <View style={styles.bottomView}></View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: 'yellow',
    },
    topView: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
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
