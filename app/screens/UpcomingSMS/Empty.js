import React from 'react';
import { Body, H2, Thumbnail } from 'native-base';

import styles from './styles';

const Icon = require('./../../static/Clock.png');

const Empty = () => (
  <Body style={styles.body}>
    <Thumbnail source={Icon} style={styles.icon} />
    <H2 style={styles.h2}>Add some SMS to your list & they will be shown here</H2>
  </Body>
);

export default Empty;
