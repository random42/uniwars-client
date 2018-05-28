import {ChatStore} from './chat';
import {RegisterStore} from './register';
import {RankStore} from './rank';
import {ProfileStore} from './profile';
import {GameStore} from './game';
import {LoginStore} from './login';
import {ApiStore} from './api';


let store = {
  chat: new ChatStore(),
  register: new RegisterStore(),
  rank: new RankStore(),
  profile: new ProfileStore(),
  game: new GameStore(),
  login: new LoginStore(),
  api: new ApiStore()
};

export default store
