import {ChatStore} from './chat';
import {ProfileStore} from './profile';
import {GameStore} from './game';
import {ApiStore} from './api';


let store = {
  chat: new ChatStore(),
  profile: new ProfileStore(),
  game: new GameStore(),
  api: new ApiStore()
}

export default store
