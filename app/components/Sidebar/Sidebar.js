import React from 'react';
import { Image, View } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

const logo = require('./../../static/Logo.png');

const Sidebar = ({ navigation, items }) => (
  <Container>
    <Content bounces={false} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} resizeMode="contain" style={styles.logo} />
      </View>
      <List
        dataArray={items}
        renderRow={({ routeName }) => (
          <ListItem style={styles.listItem} onPress={() => navigation.navigate(routeName)}>
            <Text style={styles.text}>{routeName}</Text>
          </ListItem>
        )}
      />
    </Content>
  </Container>
);

Sidebar.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default Sidebar;
