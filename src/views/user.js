import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import PropTypes from 'prop-types';
import store from '../store';
import { Loading, CircularStats } from '../components';
import {Avatar, Text, Icon} from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import * as Api from '../api';

const buttons = [
  {
    key: "friend-request",
    text: "Add friend",
    icon: {
      type: 'material-icon',
      name: 'person-add',
    },
    style: {

    }
  },
  {
    key: "block-user",
    text: "Block user",
    icon: {
      type: 'entypo',
      name: 'block'
    },
    style: {

    }
  },{
    key: "challenge-user",
    text: "Challenge",
    icon: {
      type: 'material-community',
      name: 'sword-cross'
    },
    style: {

    }
  },{
    key: "chat-user",
    text: "Chat",
    icon: {
      type: 'entypo',
      name: 'chat'
    },
    style: {

    }
  }
]

const TEST = {
  "_id": {
      "$oid": "5abbd98270534c2bf947416c"
  },
  "username": "random",
  "email": "roberto.sero@edu.unito.it",
  "first_name": "Roberto",
  "last_name": "Sero",
  "full_name": "Roberto Sero",
  "uni": {
      "_id": {
          "$oid": "5a3dac7dfaaa577114d0cfaf"
      },
      "name": "University of Turin",
      "alpha_two_code": "IT"
  },
  "major": {
    "FOD1P": 1100,
    "name": "GENERAL AGRICULTURE",
    "category": "Agriculture & Natural Resources"
  },
  "perf": {
    "rating": 1234,
    "rd": 100, // rating deviation
    "vol": 0.06, // volatility
  },
  "stats": [{
    "category": "Engineering",
    "hit": 3425,
    "miss": 123
  }],
  "picture": {
    "small": "",
    "medium": "",
    "large": "",
  },
  "private": {
      "password": "$2a$12$DlPqzAkaq3r1PRAxHEDwI.mmx.R751qGKf90YY.QgvEE1AAYp/Kdi",
      "login_token": null,
      "phone_number": '+393461625500',
      "chats": ["_id"],
      "last_questions": ["_id"] // last tot questions
  },
  "teams": ["_id"],
  "games": {
    "solo": {
      "wins": 123,
      "losses": 123,
      "draws": 44
    },
    "squad": {},
    "team": {}
  },
  "activity": [{
    "interval": {
      "start": 125254254,
      "end": 134452435,
    },
    "games": {
      "solo": 23,
      "squad": 12,
      "team": 1
    },
    "ratings": [1234,1255,5435],
  }],
  "news": [{
    "type": "team_invitation", // team_challenge, challenge, friend_request, team_invitation
    "user": "_id",
    "team": "_id", // if necessary
    "created_at": Date.now()
  }],
  "online_time": 796,
  "online": true,
  "playing": true,
  "friends": ["_ids"]
}

@inject('store') @observer
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  static propTypes = {
    _id: PropTypes.string//.isRequired
  }

  static defaultProps = {
  }

  componentDidMount() {
  }

  renderOption(item, index, arr) {
    return (
      <Icon
        key={item.key}
        {...item.icon}
        size={30}
        onPress={() => null}
        underlayColor="yellow"
        raised
      />
    )
  }

  renderUser() {
    let {user} = this.state;
    let {profile} = this.props.store;
    return (
      <View style={styles.container}>
        <View id="pic-name"
          style={styles.topView}>
          <Avatar rounded size={140} source={{uri: user.picture.medium}}
            activeOpacity={0.7}
            onPress={() => console.log('avatar')}
            containerStyle={styles.avatar}
            />
          <Text >@{user.username}</Text>
          <Text >Rank: #{user.rank}, Rating:{user.perf.rating}</Text>
          <Text >{user.full_name}</Text>
        </View>
        <CircularStats id="stats"
          containerStyle={styles.statsView}
          stats={user.stats.map((i) => ({name: i.category, hit: i.hit, miss: i.miss}))}
        />
        <View id="options" style={styles.optionsView}>
          {buttons.map(this.renderOption)}
        </View>
      </View>
    )
  }

  render() {
    setTimeout(() => {
      this.setState((prev) => {
        return { user: TEST };
      })
    },1000)
    let r = this.state.user ? this.renderUser() : <Loading/>;
    return (
      <View style={{flex:1}}>
        {r}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  topView: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",

  },
  avatar: {
    //height: 150
  },
  statsView: {
    flex: 2.5,
    backgroundColor: "#e4a8f9",
  },
  optionsView: {
    flex: 1.5,
    backgroundColor: "#99ea86",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
