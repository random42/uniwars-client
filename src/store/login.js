import { observable, action, computed, toJS } from 'mobx';
import PhoneNumber from 'awesome-phonenumber';

const minUserLength = 4;

const regex = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,255}$/g,
  username: /^(\w|\d){3,20}$/g,
}

export class LoginStore {
  constructor () {
    // TODO use DeviceInfo to get country
    this.phoneNumber = '+39'
  }

  @observable user = '';
  @observable password = '';
  @observable phoneNumber;

  loginType;

  @action setForm(text,key) {
    this[key] = text;
  }

  validForm() {
    let valid = {};
    valid.password = regex.password.test(this.password);
    valid.user = regex.email.test(this.user.trim()) || regex.username.test(this.user.trim());
    valid.phoneNumber = new PhoneNumber(this.phoneNumber.trim()).isValid();
    return valid;
  }

  async login() {
    let valid = this.validForm();
    if (this.loginType === 0 && valid.user && valid.password) { // username
    } else if (this.loginType === 1 && valid.phoneNumber) { // phone
    } else {
    }
  }
}
