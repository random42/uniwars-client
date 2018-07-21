import Api from '../src/api';

const CREDENTIALS = {
  username: 'bimbo',
  password: 'Ciaociao1?',
  email: "ciao.asd@edu.unito.it"
}

function register() {
  return Api.User.register(CREDENTIALS);
}

function login() {
  return Api.User.login(CREDENTIALS)
}

test('register-login-delete', async () => {
  let data = CREDENTIALS;
  let r = await Api.User.register(data);
  let login = await Api.User.login(data);
  expect(login.email).toEqual(data.email);
  let del = await Api.User.deleteAccount(data);
});
