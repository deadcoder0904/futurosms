import React from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../index/colors';
import styles from './styles';

const HeaderComponent = ({ title, navigation }) => (
  <Header
    style={styles.header}
    androidStatusBarColor={colors.$statusBar}
    iosBarStyle="dark-content"
  >
    <Left style={styles.left}>
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Image source={require('../../static/Menu.png')} />
      </TouchableOpacity>
    </Left>
    <Body style={styles.body}>
      <Title style={styles.title}>{title}</Title>
    </Body>
    <Right style={styles.right} />
  </Header>
);

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default HeaderComponent;
