import { observable, action, computed, toJS, autorun } from 'mobx';

const testTable = [
  {name: 'Roberto Sero',major: 'Computer Science',rating: 2114,uni: 'University of Turin'},
  {name: 'Gianmarco Sciortino',major: 'Computer Engineering',rating: '1890',uni: 'College di Sta Minchia'},
  {name: 'Lynne Gagliardo', major: 'Art History', rating: 2688, uni: 'Poli'},
  {name: 'Krysta Novak', major: 'Philosophy', rating: 2834, uni: 'Bocconi'},
  {name: 'Meryl Colvard', major: 'Police Science', rating: 2032, uni: 'Normale di Pisa'},
];

const testRankings = [
  {
    name: 'Players',
    head: ['Name','University','Major','Rating'],
    data: testTable,
  },{
    name: 'Teams',
    head: ['Name','Rating'],
    data: [
      {
        name: 'MyTeam',
        rating: 3000
      },{
        name: 'OtherTeam',
        rating: 12345
      },{
        name: 'Ahia',
        rating: 1234
      },{
        name: 'JESUSSBACK',
        rating: 43245
      },{
        name: 'Famiglia',
        rating: 5442
      },{
        name: 'FastAndFuriosi',
        rating: 1234
      },{
        name: 'HEHE',
        rating: 4342
      },{
        name: 'HIHI',
        rating: 6545
      },
    ],
  },{
    name: 'Unis',
    head: ['Name','Country','Rating'],
    data: [
      {
        name: 'Polito',
        country: 'IT',
        rating: -10,
      },{
        name: 'University of Turin',
        country: 'IT',
        rating: 10292,
      },{
        name: 'asdio',
        country: 'US',
        rating: 1283,
      },{
        name: 'Maifdj',
        country: 'FR',
        rating: 4893,
      },{
        name: 'Sfdjaf',
        country: 'ES',
        rating: 5374,
      },{
        name: 'Aajkshdjh',
        country: 'MA',
        rating: 3487,
      },{
        name: 'adjkfhji',
        country: 'IP',
        rating: 3483,
      },{
        name: 'ajfha',
        rating: 3281,
      },{
        name: 'aslkdj',
        rating: 8394,
      }
    ]
  }
];

export class RankStore {
  @observable _active = 'players';
  @observable _players = testRankings[0];
  @observable _teams = testRankings[1];
  @observable _unis = testRankings[2];

  getRankings(which) {
    let sel = toJS(this['_'+which]);
    switch (which) {
      case 'players': {
        sel.data = sel.data.map((item) => [item.name,item.major,item.rating]);
        break;
      }
      case 'teams': {
        sel.data = sel.data.map((item) => [item.name,item.rating]);
        break;
      }
      case 'unis': {
        sel.data = sel.data.map((item) => [item.name,item.country,item.rating]);
        break;
      }
    }
    return sel;
  }

  @computed get top_5() {
    let players = toJS(this._players);
    return {
      head: players.head,
      data: players.data.slice(0,5).map(item => [item.name,item.uni,item.major,item.rating])
    }
  }

  @action setActive(which) {
    this._active = which;
  }

  sort = autorun(() => {
    let sortFunction = (a,b) => {
      if (a.rating > b.rating) return -1;
      else if (b.rating > a.rating) return 1;
      else return 0;
    }
    this._players.data = this._players.data.sort(sortFunction);
    this._teams.data = this._teams.data.sort(sortFunction);
    this._unis.data = this._unis.data.sort(sortFunction);
  });

}
