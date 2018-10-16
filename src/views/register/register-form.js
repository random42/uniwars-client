import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import {Actions} from "react-native-router-flux"
import { when } from "mobx"
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native'
import { MyInput } from '../../components'
import RCButton from 'react-native-button'
import { Input, ListItem, Divider, Button, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import Toast, {DURATION} from 'react-native-easy-toast'
import Api from '../../api'
import { WINDOW } from '../../constants'

const MAJORS = [
  {
    major: 'A',
    major_category: 'b',
  },{
    major: 'B',
    major_category: 'a'
  }
]

const majorListItemHeight = 70;
const separatorHeight = 1
const HEIGHT = WINDOW.height
const WIDTH = WINDOW.width
const leftIconSize = 30;
const textInputProps = {
  autoCorrect: false,
}

const MAX_LENGTH = {
  firstName: 1024,
  lastName: 1024,
  email: 254,
  password: 255,
  major: 255
}

const INPUTS = [
  //{
  //   key: 'firstName',
  //   icon: {
  //     name: 'person',
  //     //type: '',
  //   },
  //   props: {
  //     placeholder: 'First name',
  //     returnKeyType: 'next',
  //     autoCapitalize: 'words'
  //   }
  // },{
  //   key: 'lastName',
  //   icon: {
  //     name: 'person',
  //     //type: '',
  //   },
  //   props: {
  //     placeholder: 'Last name',
  //     returnKeyType: 'next',
  //     autoCapitalize: 'words'
  // }
  // },
  {
    key: 'username',
    icon: {
      name: 'person',
      //type: 'font-awesome',
    },
    props: {
      placeholder: '@username',
      autoCapitalize: 'none',
      returnKeyType: 'next',
      textContentType: 'username'
    }
  },
  {
    key: 'major',
    icon: {
      name: 'university',
      type: 'font-awesome',
    },
    props: {
      placeholder: 'Major of study',
      autoCapitalize: 'words',
      returnKeyType: 'next',
    }
  },
  {
    key: 'password',
    icon: {
      name: 'lock',
      type: 'font-awesome',
    },
    props: {
      placeholder: 'Password',
      autoCapitalize: 'none',
      returnKeyType: 'next',
      secureTextEntry: true,
      textContentType: 'password'
    }
  },
  {
    key: 'rpassword',
    icon: {
      name: 'lock',
      type: 'font-awesome',
    },
    props: {
      placeholder: 'Retype password',
      autoCapitalize: 'none',
      returnKeyType: 'done',
      secureTextEntry: true,
      textContentType: 'password'
    }
  }
];

@inject('store')
export class RegisterForm extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    email: PropTypes.string
  }

  inputs = {}

  state = {
    form: {
      username: '',
      major: '',
      password: '',
      rpassword: '',
    },
    focus: undefined
  }

  REGEX = {
    username: /^.{3,15}$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^.{8,255}$/,
    major: /^[a-z]+(\s+[a-z]+)*$/i
  }

  isFormValid() {
    let { form } = this.state
    let valid = {}
    // check regexes
    for (let field in this.REGEX) {
      if (form[field] === '')
        valid[field] = undefined
      else
        valid[field] = this.REGEX[field].test(form[field])
    }
    valid.rpassword = form.rpassword === '' ? undefined : valid.password && form.password === form.rpassword
    if (valid.major) {
      valid.major = MAJORS.filter((item) => {
        return item.major.toLowerCase() === form.major.trim().toLowerCase()
      }).length === 1
    }
    return valid
  }

  setForm(key, value) {
    this.setState((s) => {
      s.form[key] = value.trim()
      return s
    })
  }

  majors() {
    let text = this.state.form.major
    let array =  MAJORS.filter(elem => {
      let query = text.toLowerCase();
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

  register() {
    let form = {...this.state.form, email: this.props.email }

    for (let i in form) {
      if (form[i] === '')
        delete form[i]
    }
    delete form.rpassword
    Api.User.register(form).then((res) => {
      //this.refs.toast.show('Signed up successfully!', 1000)
      setTimeout(() => {
        Api.User.login({user: form.username, password: form.password})
        .then((data) => {
          this.props.store.profile.loadUser(data.user)
          Api.Socket.connect({_id: data.user._id, token: data.token})
          when(() => {
            return this.props.store.api.auth
          }).then(() => {
            Actions.home()
          })
        }).catch((err) => {
          console.log(err.message)
        })
      },
      1800
      )
    }).catch((err) => {
      console.log(err.message)
    })
  }

  onInputFocus(key) {
    this.setState({focus: key})
  }

  renderSearchItem({item,index}) => {
    return (<ListItem
      {...item}
      onPress={() => {
        this.setForm('major', item.title)
        this.onInputFocus(undefined)
      }}
    />);
  }

  renderSearchItemSeparator() => {
    return (<Divider/>)
  }

  renderInput(item,index) => {
    let { key } = item
    let { form } = this.state
    let validForm = this.isFormValid()
    let valid = validForm[key]
    let def =
    <MyInput {...item.props} {...textInputProps}
      valid={valid}
      key={key}
      name={key}
      defaultValue={form[key]}
      onFocus={() => this.onInputFocus(key)}
      onChangeText={(text) => this.setForm(key, text)}
      maxLength={MAX_LENGTH[key]}
      leftIcon={<Icon {...item.icon} />}
    />

    if (key === 'major') {
      let data = this.majors()
      return (
      <Autocomplete
        key={key}
        data={data}
        hideResults={this.state.focus !== 'major'}
        renderItem={this.renderSearchItem}
        renderTextInput={() => def}
        itemHeight={majorListItemHeight}
        separatorHeight={separatorHeight}
        maxItems={4}
        listStyle={styles.searchList}
        renderSeparator={this.renderSearchItemSeparator}
      />
      )
    }
    return def;
  }

  render() {
    let validForm = this.isFormValid()
    let disabled = false
    for (let i in INPUTS) {
      if (validForm[INPUTS[i].key] !== true) {
        disabled = true
        break
      }
    }

    return (
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior="padding"
        enabled
        >
        <RCButton containerStyle={styles.photoContainer}>
          <Icon name='camera' type='entypo' size={60}/>
          <Icon name='add' size={25} style={styles.addPhotoIcon}/>
        </RCButton>
        {INPUTS.map(this.renderInput)}
        <Button
          title="Done"
          buttonStyle={styles.signUp}
          titleStyle={styles.signUpText}
          onPress={() => this.register()}
          disabled={disabled}
        />
        <Toast
          ref="toast"
          style={{backgroundColor:'black'}}
          position='bottom'
          positionValue={200}
          fadeInDuration={400}
          fadeOutDuration={400}
          opacity={0.8}
          textStyle={{color:'white'}}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  photoContainer: {
    flexDirection: 'row',
  },
  addPhotoIcon: {
    alignSelf: 'flex-start',
  },
  signUpText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUp: {
    width: WIDTH * 0.4,
    height: WIDTH * 0.12,
    borderRadius: 5
  },
  searchList: {
  },
});
