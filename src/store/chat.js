import { observable, action, computed, toJS } from 'mobx';

let testMessages = [
  {
    _id: 1,
    text: 'Hi there',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    // Any additional custom parameters are passed through
  },
  {
    _id: 6,
    text: 'This is a system message',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
    // Any additional custom parameters are passed through
  },
  {
    _id: 2,
    text: 'Hey babe, I\'m so horny right now, come here pleasseeeeeeeeeeee',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 1)),
    user: {
      _id: 2,
      name: 'Giammixx',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    },
  },
  {
    _id: 3,
    text: 'Weeeeee uaglioo',
    createdAt: new Date(Date.UTC(2015, 5, 11, 17, 20, 0)),
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
    createdAt: new Date(Date.UTC(2017, 5, 11, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
  {
    _id: 5,
    text: 'Hi there',
    createdAt: new Date(Date.UTC(2016, 5, 11, 18, 20, 0)),
    user: {
      _id: 1,
      name: 'Roberto Sero',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    },
  },
]

let testUser = {_id:1};

export class ChatStore {

  @observable activeChat = '0';

  @observable chats = [
    {
      name: 'Community',
      image: 'https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.jpg',
      _id: '0',
      messages: [],
    },
    {
      name: 'University of Turin',
      image: 'https://cdn2.iconfinder.com/data/icons/crazy-paparazzi-collection-svg/100/Noun_Project_100Icon_10px_grid_2-47-128.png',
      _id: '1',
      messages: testMessages,
    },
    {
      name: 'MyTeam',
      image: 'https://www.colourbox.com/preview/18846189-team-icon-set.jpg',
      _id: '2',
      messages: [],
    },
  ];

  @action sendMessage(messages) {
    let chat = this.chats.find((el) => el._id === this.activeChat);
    chat.messages = chat.messages.concat(messages);
  }

  @computed get messages() {
    let chat = this.chats.find((el) => el._id === this.activeChat);
    return toJS(chat.messages);
  }

  @action selectChat(id) {
    this.activeChat = id;
  }
}
