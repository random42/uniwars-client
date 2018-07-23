import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions } from "react-native";
import {Actions} from "react-native-router-flux";
import { when } from "mobx"
import { inject, observer } from 'mobx-react/native';
import { MyInput } from '../../components';
import RCButton from 'react-native-button'
import { Input, ListItem, Divider, Button, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import Toast, {DURATION} from 'react-native-easy-toast'
import Api from '../../api'

const MAJORS = require('../../../data/majors.json');
const itemHeight = 70;
const separatorHeight = 1;
const WINDOW = Dimensions.get('window')
const HEIGHT = WINDOW.height
const WIDTH = WINDOW.width
const leftIconSize = 30;
const textInputProps = {
  autoCorrect: false,
}

const maxLength = {
  firstName: 1024,
  lastName: 1024,
  email: 254,
  password: 255,
  major: 255
}

const inputs = [
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
  // },{
  //   key: 'phoneNumber',
  //   icon: {
  //     name: 'phone',
  //     type: 'font-awesome',
  //   },
  //   props: {
  //     placeholder: 'Phone number',
  //     returnKeyType: 'done',
  //     keyboardType: 'numeric',
  //   }
  },{
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
    }
  },{
    key: 'rpassword',
    icon: {
      name: 'lock',
      type: 'font-awesome',
    },
    props: {
      placeholder: 'Re-type password',
      autoCapitalize: 'none',
      returnKeyType: 'done',
      secureTextEntry: true,
    }
  }
];



@inject('store') @observer
export class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store.register;
    this.onChangeText = this.onChangeText.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.inputs = {};
  }

  componentDidMount() {
  }

  refInputs = (ref,key) => {
    this.inputs[key] = ref;
  }

  register() {
    let form = {...this.store.form}

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

  onInputFocus(input) {
    this.store.switchFocus(input);
  }

  renderSearchItem = ({item,index}) => {
    return (<ListItem
      {...item}
      containerStyle={{}}
      onPress={() => this.store.selectMajor(item.title)}
    />);
  }

  renderSearchItemSeparator() {
    return (<Divider/>)
  }

  onChangeText(text,key) {
    let form = {};
    form[key] = text;
    this.props.store.register.setForm(form);
  }

  renderInput = (item,index) => {
    let validForm = this.store.validForm;
    if (this.props.type === 'phone' && (item.key === 'password' || item.key === 'rpassword')) {
      return;
    } else if (this.props.type === 'password' && item.key === ('phoneNumber')) {
      return;
    }
    let valid = validForm[item.key];
    let def =
    <MyInput {...item.props} {...textInputProps}
      valid={valid}
      key={item.key}
      name={item.key}
      onFocus={() => this.store.switchFocus(item.key)}
      inputRef={(ref) => this.refInputs(ref,item.key)}
      onChangeText={(text) => this.onChangeText(text,item.key)}
      maxLength={maxLength[item.key]}
      leftIcon={<Icon {...item.icon} />}
    />

    if (item.key === 'major') {
      let data = this.store.searchMajor;
      return (
      <Autocomplete
        key={item.key}
        data={data}
        hideResults={this.store.hideResults}
        renderItem={this.renderSearchItem}
        renderTextInput={() => def}
        itemHeight={itemHeight}
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
    let validForm = this.store.validForm
    let disabled = false
    for (let i in inputs) {
      if (validForm[inputs[i].key] !== true) {
        disabled = true
        break
      }
    }

    return (
      <View style={[styles.container]}>
        <RCButton containerStyle={styles.photoContainer}>
          <Icon name='camera' type='entypo' size={60}/>
          <Icon name='add' size={25} style={styles.addPhotoIcon}/>
        </RCButton>
        {inputs.map(this.renderInput)}
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
      </View>
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
