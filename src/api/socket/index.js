export main from './main';
export game from './game';
export chat from './chat';

export const connect = async () => {
  chat.open();
  game.open();
  // main.open();
}
