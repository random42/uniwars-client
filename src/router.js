import React, {Component} from 'react';
//import { SearchView } from './components';
import {
  Login,
  Home,
  Chat,
  Rank,
  Profile,
  Intro,
  User
} from './views';
import {
  GameChoice,
  GameQuestion,
  GameChooseTeam,
  GameMatchPreview
} from './views/game';
import {
  RegisterEmail,
  RegisterForm,
  RegisterType
} from './views/register';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { inject } from 'mobx-react/native';

@inject('store')
export class MyRouter extends Component {

  changeRankTab = ({jumpToIndex, scene}) => {
    this.props.store.rank.setActive(scene.route.key.split('-')[1]);
    jumpToIndex(scene.index);
  }

  render() {
    const tabIconsName = [{type: 'ionicon', name: 'ios-home'},
    {type: 'ionicon', name: 'md-chatboxes'},
    {type: 'ionicon', name: 'ios-list'},
    {type: 'ionicon', name: 'ios-person'}];
    const tabIcons = tabIconsName.map((el) => {
      return () => (<Icon {...el} size={30}/>);
    });

    return (
      <Router>
        <Lightbox key="modal">
        <Scene key="root" hideNavBar path={"/"}>
          <Tabs key="tabs"
            wrap={false}
            swipeEnabled={false}
            animationEnabled={false}
            tabBarPosition="bottom"
            path={"/tabs"}>
            <Scene key="home" component={Home} icon={tabIcons[0]}/>
            <Scene key="chat" component={Chat} icon={tabIcons[1]}/>
            <Scene key="rank" component={Rank} icon={tabIcons[2]} />
            <Scene key="profile" component={Profile} icon={tabIcons[3]}/>
          </Tabs>
          <Scene key="login" component={Login} />
          <Scene key="intro" component={Intro} />
          <Stack key="register" hideNavBar>
            <Scene key="register-email" component={RegisterEmail}/>
            <Scene key="register-form" component={RegisterForm} />
            <Scene key="register-type" component={RegisterType}/>
          </Stack>
          <Stack key="game" hideNavBar>
            <Scene key="game-choice" component={GameChoice} />
            <Scene key="game-choose-team" component={GameChooseTeam} />
            <Scene key="game-match-preview" component={GameMatchPreview} />
            <Scene key="game-question" component={GameQuestion}/>
          </Stack>
          <Scene key="user" initial component={User} />
        </Scene>
        </Lightbox>
      </Router>
    );
  }
}
