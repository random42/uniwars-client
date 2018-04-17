import React, {Component} from 'react';
import {View, Text, Image, StyleSheet } from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { Icon } from 'react-native-elements';
import { MyInput } from '../../components';
import { Input, ListItem, Divider } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';

const MAJORS = require('../../../data/majors.json');
const itemHeight = 70;
const separatorHeight = 1;

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
  },{
    key: 'phoneNumber',
    icon: {
      name: 'phone',
      type: 'font-awesome',
    },
    props: {
      placeholder: 'Phone number',
      returnKeyType: 'done',
      keyboardType: 'numeric',
    }
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
    this.sendForm = this.sendForm.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.inputs = {};
  }

  componentDidMount() {
  }

  refInputs = (ref,key) => {
    this.inputs[key] = ref;
  }

  sendForm() {
  }

  onInputFocus(input) {
    this.store.switchFocus(input);
  }

  renderSearchItem = ({item,index}) => {
    return (<ListItem
      {...item}
      containerStyle={styles.searchItemContainer}
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
    let def = <MyInput {...item.props} {...textInputProps}
      defaultValue={this.store.form[item.key]}
      valid={valid}
      key={item.key}
      name={item.key}
      onFocus={() => this.store.switchFocus(item.key)}
      inputRef={(ref) => this.refInputs(ref,item.key)}
      onChangeText={(text) => this.onChangeText(text,item.key)}
      maxLength={maxLength[item.key]}
      leftIcon={<Icon {...item.icon} />}
       />;

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
    return (
      <View style={[styles.container]}>
        <Button containerStyle={styles.photoContainer}>
          <Icon name='camera' type='entypo' size={60}/>
          <Icon name='add' size={25} style={styles.addPhotoIcon}/>
        </Button>
        {inputs.map(this.renderInput)}
        <Button style={styles.signUp} onPress={this.sendForm}>Done
        </Button>
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
  signUp: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchList: {
  },
  searchItemContainer: {
    //height: itemHeight,
  },
});
