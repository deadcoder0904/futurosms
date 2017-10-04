import React from 'react';
import { Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AdMobInterstitial, AdMobRewarded } from 'react-native-admob';
import codePush from 'react-native-code-push';

import SideBar from './../components/Sidebar/index';
import UpcomingSMS from './../screens/UpcomingSMS/index';
import CreateFuturoSMS from './../screens/CreateFuturoSMS/index';
import Themes from './../screens/Themes/index';

import { getTheme } from './../db/index';
import { INTERSTITIAL_ID, REWARDED_ID, TESTDEVICE_ID } from './../utils/index';
import colors from './colors';

AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
AdMobInterstitial.setTestDeviceID(TESTDEVICE_ID);
AdMobRewarded.setAdUnitID(REWARDED_ID);

import './ReactotronConfig';

const titles = ['Upcoming SMS', 'Create Futuro SMS', 'Themes'];
const { width, height } = Dimensions.get('window');

const Index = DrawerNavigator(
  {
    [titles[0]]: { screen: UpcomingSMS },
    [titles[1]]: { screen: CreateFuturoSMS },
    [titles[2]]: { screen: Themes },
  },
  {
    contentComponent: props => <SideBar {...Object.assign({}, props)} />,
  },
);

EStyleSheet.build({
  $deviceHeight: height,
  $deviceWidth: width,
  $text: colors.$text,
  $black: colors.$black,
  $white: colors.$white,
  $statusBar: colors.$statusBar,
  $headerBg: colors.$headerBg,
  $theme: getTheme(),
});

export default codePush(Index);
