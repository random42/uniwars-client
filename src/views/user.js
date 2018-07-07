import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import PropTypes from 'prop-types';
import store from '../store';
import { Loading, CircularStats } from '../components';
import {Avatar, Text} from 'react-native-elements';
import * as Api from '../api';

const TEST = {
  "_id": "5abbd98270534c2bf947416c",
  "username": "random",
  "email": "roberto.sero@edu.unito.it",
  "first_name": "Roberto",
  "last_name": "Sero",
  "full_name": "Roberto Sero",
  "uni": {
      "_id": "5a3dac7dfaaa577114d0cfaf",
      "name": "University of Turin",
      "alpha_two_code": "IT"
  },
  "major": {
    "FOD1P": 1100,
    "name": "GENERAL AGRICULTURE",
    "category": "Agriculture & Natural Resources"
  },
  "perf": {
    "rating": 2650,
    "rd": 100, // rating deviation
    "vol": 0.06, // volatility
  },
  "stats": [{
      "category": "Engineering",
      "hit": 3425,
      "miss": 3332
    },{
      "category": "Biology & Life Science",
      "hit": 4448,
      "miss": 1234
    },{
      "category": "Arts",
      "hit": 123,
      "miss": 2123
    },{
      "category": "Business",
      "hit": 4555,
      "miss": 3333
    },{
      "category": "Education",
      "hit": 3848,
      "miss": 1292
    },{
      "category": "Health",
      "hit": 3848,
      "miss": 8999
    },{
      "category": "Humanities & Liberal Arts",
      "hit": 10000,
      "miss": 1000
  }],
  "picture": {
    "small": "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4",
    "medium": "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4",
    "large": "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4",
  },
  "teams": [
  ],
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
  "rank": 324,
  "online_time": 796,
  "online": true,
  "playing": true,
  "friends": ["_ids"]
}

const buttons = [
  {
    key: "friend-request",
    text: "Add friend",
    icon: {
      type: '',
      name: ''
    },
    style: {

    }
  },
  {
    key: "block-user",
    text: "Block user",
    icon: {
      type: '',
      name: ''
    },
    style: {

    }
  },{
    key: "challenge-user",
    text: "Challenge",
    icon: {
      type: '',
      name: ''
    },
    style: {

    }
  },{
    key: "chat-user",
    text: "Chat",
    icon: {
      type: '',
      name: ''
    },
    style: {

    }
  }
]

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

  renderUser() {
    let {user} = this.state;
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
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",

  },
  avatar: {
    //height: 150
  },
  statsView: {
    flex: 3,
    backgroundColor: "blue",
  },
  optionsView: {
    flex: 3,
    backgroundColor: "red",
  }
});
