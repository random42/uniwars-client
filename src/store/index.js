import {ChatStore} from './chat';
import {RegisterStore} from './register';
import {RankStore} from './rank';
import {ProfileStore} from './profile';
import {GameStore} from './game';
import {ApiStore} from './api';


let store = {
  chat: new ChatStore(),
  register: new RegisterStore(),
  rank: new RankStore(),
  profile: new ProfileStore(),
  game: new GameStore(),
  api: new ApiStore()
}

export default store
