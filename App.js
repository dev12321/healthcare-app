import React from 'react';
import {Root} from 'native-base';
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Detection from './screens/detection';
import News from './screens/news';
import SideBar from './screens/sidebar';

const Drawer = createDrawerNavigator(
  {
    Detection: {screen: Detection},
    Reminder: {screen: Detection},
    News: {screen: News},
  },
  {
    initialRouteName: 'Detection',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {screen: Drawer},
    Detection: {screen: Detection},
    Reminder: {screen: Detection},
    News: {screen: Detection},
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);
