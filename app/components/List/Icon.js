import React from 'react';
import { Content, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

const Icon = ({ icon }) => (
  <Content contentContainerStyle={styles.content}>
    <Thumbnail source={icon} style={styles.icon} />
  </Content>
);

Icon.propTypes = {
  icon: PropTypes.any.isRequired,
};

export default Icon;
