import {game, user, uni, socket} from '../src/api';

const CREDENTIALS = {
  username: 'bimbo',
  password: 'Ciaociao1?',
  email: "ciao.asd@edu.unito.it"
}

function register() {
  return user.register(CREDENTIALS);
}

function login() {
  return user.login(CREDENTIALS)
}

test('register-login-delete', async () => {
  let data = CREDENTIALS;
  let r = await user.register(data);
  let login = await user.login(data);
  expect(login.email).toEqual(data.email);
  let del = await user.deleteAccount(data);
});
