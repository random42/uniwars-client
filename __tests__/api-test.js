import {game, user, uni, socket} from '../src/api';

test('register-login-delete', async () => {
  let data = {username: 'bimbo', password: 'Ciaociao1?', email: "ciao.asd@edu.unito.it"};
  let r = await user.register(data);
  let login = await user.login({username: data.username, password: data.password});
  expect(login.email).toEqual(data.email);
  let del = await user.deleteAccount()
});
