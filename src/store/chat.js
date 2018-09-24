import { observable, action, computed, toJS } from 'mobx';
import _ from 'lodash/core'

const testMessages = [
  {
    _id: 1,
    text: 'Hi there',
    created_at: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    // Any additional custom parameters are passed through
  },
  {
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
    _id: 6,
    text: 'This is a system message',
    created_at: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
    // Any additional custom parameters are passed through
  },
  {
    _id: 2,
    text: 'Hey babe, I\'m so horny right now, come here pleasseeeeeeeeeeee',
    created_at: new Date(Date.UTC(2016, 5, 11, 17, 20, 1)),
    user: {
      _id: 2,
      name: 'Giammixx',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
  },
  {
    _id: 3,
    text: 'Weeeeee uaglioo',
    created_at: new Date(Date.UTC(2015, 5, 11, 17, 20, 0)),
    user: {
      _id: 3,
      name: 'Gnoccolona Arrapata',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
    image: 'https://facebook.github.io/react/img/logo_og.png',
  },
  {
    _id: 4,
    text: 'Hi there',
    created_at: new Date(Date.UTC(2017, 5, 11, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 5,
    text: 'Hi there',
    created_at: new Date(Date.UTC(2016, 5, 11, 18, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
]

const testUser = {_id: 1}
const testChats = [
  {
    name: 'Community',
    collection: 'users',
    picture: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2F4ib%2Fx6e%2F4ibx6eAxT.jpeg&f=1',
    _id: '0',
    messages: [],
  },
  {
    name: 'University of Turin',
    collection: 'uni',
    picture: 'https://cdn2.iconfinder.com/data/icons/crazy-paparazzi-collection-svg/100/Noun_Project_100Icon_10px_grid_2-47-128.png',
    _id: '1',
    messages: testMessages,
  },
  {
    name: 'MyTeam',
    collection: 'teams',
    picture: 'https://www.colourbox.com/preview/18846189-team-icon-set.jpg',
    _id: '2',
    messages: [],
  },
]

let map = observable.map()
for (let a of testChats) {
  map.set(a._id, a)
}

//

export class ChatStore {

  constructor() {
    for (let a of testChats) {
      this.newChat(a)
    }
    console.log(this.chats)
  }

  @observable chats = new Map()


  getChat(_id) {
    return this.chats.get(_id)
  }

  @action newChat(chat) {
    this.chats.set(chat._id, observable(chat))
    // TODO if (chat.collection !== 'users')
  }


  // TODO
  @action loadEarlierMessages(chat_id) {
    const chat = this.chats.get(chat_id)
  }

  @action newMessages(chat_id, messages) {
    const chat = this.chats.get(chat_id)
    chat.messages = chat.messages.concat(messages)
  }

  @action sendMessages(chat, messages) {
    this.newMessages(chat, messages)
  }

  @computed get chatList() {
    let arr = []
    for (let key of this.chats.keys()) {
      const chat = this.chats.get(key)
      const mex = _.last(chat.messages)
      if (mex) {
        const date = new Date(mex.created_at)
        arr.push({
          _id: chat._id,
          picture: chat.picture,
          name: chat.name,
          lastMessage: mex.text,
          time: date.getHours() + ':' + date.getMinutes()
        })
      }
      else {
        arr.push({
          _id: chat._id,
          name: chat.name,
          picture: chat.picture,
          lastMessage: '',
          time: ''
        })
      }
    }
    return arr
  }
}
