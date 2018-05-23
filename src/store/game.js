import { observable, action, computed, toJS } from 'mobx';

let testMyTeam = {
  id: 0,
  name: 'Gli sciagggurati',
  image: 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/marijuana-circle-green-128.png',
  members: [
    {
      id: 0,
      name: 'Roberto Sero',
    },
    {
      id: 1,
      name: 'Gianmarco Sciortino',
    },
    {
      id: 2,
      name: 'Gesoo Cristoh',
    },
    {
      id: 3,
      name: 'Mia Madre',
    },
    {
      id: 4,
      name: 'Tuo Padre',
    },
]};

let testEnemyTeam = {
  id: 1,
  name: 'Gli scemigguerra in tempo de pace',
  image: 'https://www.shareicon.net/data/128x128/2016/08/18/810231_security_512x512.png',
  members: [
    {
      id: 5,
      name: 'Ali G',
    },
    {
      id: 6,
      name: '50 Cents',
    },
    {
      id: 7,
      name: 'Emi',
    },
    {
      id: 8,
      name: 'Nem',
    },
    {
      id: 9,
      name: 'Cimino',
    },
]};

let testEnemy = {
  id : 1,
  name : 'Padre Maronno',
  image : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png'
};

let testQuestions = [
  {
    "_id": "5a3ef55139158e0b326edf36",
    "category": {
        "name": "Hip Hop Music",
        "question_count": 0,
        "id": 12,
        "createdAt": "2017-05-24T17:25:21.000Z",
        "updatedAt": "2017-05-24T17:25:21.000Z",
        "parent_category": null
    },
    "question": "Who originally sang \"(You) Got What I Need\", which Biz Markie used in his 1989 hit \"Just A Friend\"?",
    "option1": "Freddie Scott",
    "option2": "Herbie Mann",
    "option3": "Mason Williams",
    "option4": "Sonny James",
    "answers": 1,
    "id": 776,
    "createdAt": "2017-05-24T17:25:21.000Z",
    "updatedAt": "2017-05-24T17:25:21.000Z"
  },
  {
    "_id": "5a3ef55139158e0b326edf44",
    "category": {
        "name": "Movie Quotes",
        "question_count": 0,
        "id": 11,
        "createdAt": "2017-05-24T17:25:21.000Z",
        "updatedAt": "2017-05-24T17:25:21.000Z",
        "parent_category": null
    },
    "question": "Which movie had this funny line: \"Gentlemen, you can't fight in here! This is the War Room!\"",
    "option1": "Bonnie And Clyde",
    "option2": "Dr. Strangelove",
    "option3": "2001: A Space Odyssey",
    "option4": "Cool Hand Luke",
    "answers": 2,
    "id": 1290,
    "createdAt": "2017-05-24T17:25:21.000Z",
    "updatedAt": "2017-05-24T17:25:21.000Z"
  },
  {
    "_id": "5a3ef55139158e0b326edf5d",
    "category": {
        "name": "Basketball",
        "question_count": 0,
        "id": 1,
        "createdAt": "2017-05-24T17:25:21.000Z",
        "updatedAt": "2017-05-24T17:25:21.000Z",
        "parent_category": null
    },
    "question": "In the NBA, how far away from the basketball is the 3-point line?",
    "option1": "21 feet 7 inches",
    "option2": "23 feat, 9 inches",
    "option3": "27 feet, 3 inch",
    "option4": "25 feet, 5 inches",
    "answers": 2,
    "id": 15,
    "createdAt": "2017-05-24T17:25:21.000Z",
    "updatedAt": "2017-05-24T17:25:21.000Z"
  },
  {
    "_id": "5a3ef55139158e0b326edf5e",
    "category": {
        "name": "Football",
        "question_count": 0,
        "id": 9,
        "createdAt": "2017-05-24T17:25:21.000Z",
        "updatedAt": "2017-05-24T17:25:21.000Z",
        "parent_category": null
    },
    "question": "Where is the Pro Football Hall of Fame located?",
    "option1": "Las Vegas, NV",
    "option2": "Memphis, TN",
    "option3": "Canton, OH",
    "option4": "Cooperstown, NY",
    "answers": 3,
    "id": 271,
    "createdAt": "2017-05-24T17:25:21.000Z",
    "updatedAt": "2017-05-24T17:25:21.000Z"
  },
  {
    "_id": "5a3ef55139158e0b326edf5f",
    "category": {
        "name": "Baseball",
        "question_count": 0,
        "id": 3,
        "createdAt": "2017-05-24T17:25:21.000Z",
        "updatedAt": "2017-05-24T17:25:21.000Z",
        "parent_category": null
    },
    "question": "Which Phillie pitcher won 2 games in the 2008 World Series?",
    "option1": "Cole Hamels",
    "option2": "J.C. Romero",
    "option3": "Bret Myers",
    "option4": "Brad Lidge",
    "answers": 2,
    "id": 527,
    "createdAt": "2017-05-24T17:25:21.000Z",
    "updatedAt": "2017-05-24T17:25:21.000Z"
  },
];

export class GameStore {

  @observable gameOn = false;
  @observable type = 'team'; // ['solo','team']
  @observable myTeam = testMyTeam;
  @observable enemyTeam = testEnemyTeam;
  @observable enemy = testEnemy;
  @observable questions = testQuestions;

  @action endGame() {
    gameOn = false;
  }

  @action findGame(type) {
    this.type = type;
  }
}
