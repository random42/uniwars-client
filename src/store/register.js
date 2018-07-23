import { observable, action, computed, autorun } from 'mobx';
import PhoneNumber from 'awesome-phonenumber';
import { MAJORS } from '../constants';

const regex = {
  username: /^.{3,15}$/i,
  firstName : /^[a-z]+(\s+[a-z]+)*$/i,
  lastName : /^[a-z]+(\s+[a-z]+)*$/i,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^.{8,255}$/,
  major: /^[a-z]+(\s+[a-z]+)*$/i
}

export class RegisterStore {

  @observable form = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    major: '',
    phoneNumber: '',
    password: '',
    rpassword: ''
  }

  countryCode;

  @observable inputFocus;

  phoneNumber;

  @computed get validForm() {
    let form = this.form;
    let valid = {};
    // check regexes
    for (let field in regex) {
      if (form[field] === '') valid[field] = undefined;
      else {
        valid[field] = regex[field].test(form[field].trim());
      }
    }
    // check the second password
    if (form.rpassword !== '' && (!valid.password || form.password !== form.rpassword)) valid.rpassword = false;
    else if (form.rpassword !== '' && valid.password && form.password === form.rpassword) valid.rpassword = true;
    // check phone number
    if (form.phoneNumber.length > 5) {
      valid.phoneNumber = this.phoneNumber.isValid();
    }
    // check major
    if (valid.major) {
      valid.major = MAJORS.filter((item) => {
        return item.major.toLowerCase() === form.major.trim().toLowerCase()
      }).length === 1
    }

    return valid;
  }

  @computed get searchMajor() {
    // filtra gli elementi
    let array =  MAJORS.filter(elem => {
      let query = this.form.major.trim().toLowerCase();
      return elem.major.toLowerCase().indexOf(query) > -1;
    }).map(item => {
      return {
        title: item.major,
        subtitle: item.major_category,
        hideChevron: true,
      }
    })
    return array;
  }

  @computed get hideResults() {
    if (this.inputFocus !== 'major') return true;
    return this.validForm.major// && this.searchMajor.length === 1;
  }

  @action setForm(form = {}) {
    for (let field in form) {
      this.form[field] = form[field].trim()
    }
  }

  @action selectMajor(major) {
    this.form.major = major;
  }

  @action switchFocus(input) {
    this.inputFocus = input;
  }
}
