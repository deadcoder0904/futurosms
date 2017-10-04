import React from 'react';
import { View } from 'react-native';
import { ListItem, Left, Body, Right, Text, H3 } from 'native-base';
import PropTypes from 'prop-types';

import { randomColorGenerator, formatDate } from '../../utils/index';
import styles from './styles';

const ItemComponent = ({ name, msg, date }) => (
  <ListItem avatar>
    <Left>
      <View style={[styles.round, { backgroundColor: randomColorGenerator() }]}>
        <H3 style={styles.text}>{name.slice(0, 1)}</H3>
      </View>
    </Left>
    <Body>
      <Text>{name}</Text>
      <Text note>{msg}</Text>
    </Body>
    <Right>
      <Text note>{formatDate(date)}</Text>
    </Right>
  </ListItem>
);

ItemComponent.propTypes = {
  name: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ItemComponent;
