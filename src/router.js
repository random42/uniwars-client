import React, {Component} from 'react';
import {
  Login,
  Home,
  Rank,
  Profile,
  Intro,
  User,
  Chat,
  ChatList,
  GameChoice,
  GameQuestion,
  GameChooseTeam,
  GameMatchPreview,
  GameEnd
} from './views';
import {
  RegisterEmail,
  RegisterForm,
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
import {TestComponent, LoadingView } from './components';


/**
 * MyRouter
 *
 */
@inject('store')
export class MyRouter extends Component {

  static TAB_ICONS = [
    {type: 'ionicon', name: 'ios-home'},
    {type: 'ionicon', name: 'md-chatboxes'},
    {type: 'ionicon', name: 'ios-list'},
    {type: 'ionicon', name: 'ios-person'}
  ]
  render() {
    const tabIcons = MyRouter.TAB_ICONS.map((el) => {
      return () => (<Icon {...el} size={30}/>);
    })

    return (
      <Router>
        <Lightbox key="modal">
        <Scene key="root" hideNavBar path="/">
          <Scene key="test" component={TestComponent} />
          <Tabs key="tabs"
            initial
            wrap={false}
            swipeEnabled={false}
            animationEnabled={false}
            tabBarPosition="bottom"
            >
            <Scene key="home" component={Home} icon={tabIcons[0]}/>
            <Stack key="chat-tab" initial hideNavBar icon={tabIcons[1]}>
              <Scene key="chat-list" initial component={ChatList} />
              <Scene key="chat-main" component={Chat} />
            </Stack>
            <Scene key="rank" component={Rank} icon={tabIcons[2]} />
            <Scene key="profile" component={Profile} icon={tabIcons[3]}/>
          </Tabs>
          <Scene key="login" component={Login} />
          <Scene key="intro" component={Intro} />
          <Stack key="register" hideNavBar>
            <Scene key="register-email" component={RegisterEmail}/>
            <Scene key="register-form" component={RegisterForm} />
          </Stack>
          <Stack key="game" hideNavBar>
            <Scene key="game-choice" component={GameChoice} />
            <Scene key="game-choose-team" component={GameChooseTeam} />
            <Scene key="game-match-preview" component={GameMatchPreview} />
            <Scene key="game-question" initial component={GameQuestion}/>
            <Scene key="game-end" component={GameEnd}/>
          </Stack>
          <Scene key="user" component={User} />
        </Scene>
        </Lightbox>
      </Router>
    );
  }
}
