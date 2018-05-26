let API = {
  USER :  {
    REGISTER : {
      method: 'post',
      url: '/users/register',
      data: {
        username: '',
        email: '',
        password: '',
      },
    },
    LOGIN : {
      method: 'put',
      url: '/users/login',
      params: {
        username: '',
      },
      data: {
        password: ''
      }
    },
    LOGOUT : {
      method: 'put',
      url: '/users/logout',
      params: {
        username: 'random',
      }
    },
    DELETE_ACCOUNT : {
      method: 'delete',
      url: '/users/',
      data: {
        password: 'Mammamia123',
      }
    },
    SET_PICTURE :  {
      method: 'put',
      url: 'users/picture',
      headers: {'Content-Type': 'application/octet-stream'}
      // data: picture (buffer)
    },
    GET_PICTURE : {
      url : 'users/picture',
      // params: {
      //   _id,size (small,medium,large)
      // }
    },
    CHALLENGE: {
      method: 'put',
      url: 'users/challenge',
      params: {
        //user...
        to: "_id"
      }
    },
    RESPOND_CHALLENGE: {
      method: 'put',
      url: 'users/respond-challenge',
      params: {
        response: 'y',
        user: '_id'
      }
    },
    ADD_FRIEND: {
      method: 'put',
      url: 'users/add-friend',
      params: {
        to: '_id'
      }
    },
    RESPOND_FRIEND_REQUEST: {
      method: 'put',
      url: 'users/respond-friend-request',
      params: {
        response: 'y',
        user: '_id'
      }
    },
    GET_NEWS: {
      method: 'put',
      url: 'users/get-news',
    }
  },

  GAME : {
  },

  UNI : {
    GET: {
      url: '/unis',
      params: {
        _id: "5a3dac7dfaaa577114d0cfaf"
      }
    },
    TOP: {
      url: '/unis/top',
      params: {
        from: 0,
        to: 10,
        field: 'general'
      }
    },
    RANK: {
      url: '/unis/rank',
      params: {
        name: "University of Turin",
        field: 'general'
      }
    }
  },

  TEAM : {
    GET: {
      url: 'teams/',
      params: {
        _id: "5ab1768bceec0418f52e198f"
      }
    },
    INVITE: {
      method: 'put',
      url: 'teams/invite',
      params: {
        team: '5abbd738ca93b62b48ff2f3b',
        invited: '5abbd736ca93b62b48ff2f36'
      }
    },
    CHALLENGE: {
      method: 'put',
      url: 'teams/challenge',
      params: {
        team: '_id',
        enemy: '_id',
      }
    },
    RESPOND_CHALLENGE: {
      method: 'put',
      url: 'teams/respond-challenge',
      params: {
        team: '_id',
        enemy: '_id',
      }
    },
    CREATE: {
      method: 'post',
      url: 'teams/create',
      data: {
        name: "theBest",
      }
    },
    RESPOND_INVITE: {
      method: 'put',
      url: 'teams/respond-invite',
      headers: {'user' : '5abbd736ca93b62b48ff2f36'},
      params: {
        team: "5abbd738ca93b62b48ff2f3b",
        response: 'y' // y/n
      }
    },
    DELETE: {
      method: 'delete',
      url: 'teams/',
      params: {
        team: "5abbd738ca93b62b48ff2f3b"
      }
    }
  },

  CHAT : {
    GET_MESSAGES: {
      method: 'put',
      url: 'chat/messages',
      params: {
        time: Date.now(),
        chat: 'sdjgkfbsb'
      }
    },
    CREATE_GROUP: {
      method: 'post',
      url: 'chat/create-group',
      params: {
        name: 'asd',
        participants: ['_ids']
      }
    },
    CREATE_PRIVATE: {
      method: 'post',
      url: 'chat/create-private',
      params: {
        partner: '_id'
      }
    },
    LEAVE_GROUP: {
      method: 'put',
      url: 'chat/leave-group',
      params: {
        chat: '_id'
      }
    },
    ADD_USERS: {
      method: 'put',
      url: 'chat/add-users',
      params: {
        chat: '_id',
        invited: ['_ids']
      }
    },
    REMOVE_USERS: {
      method: 'put',
      url: 'chat/remove-users',
      params: {
        chat: '_id',
        removed: ['_ids']
      }
    }
  }
}

module.exports = API;
