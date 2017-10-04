import React from 'react';
import { List } from 'native-base';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

import Item from './Item';
import Icon from './Icon';

const trash = require('./../../static/Trash.png');
const edit = require('./../../static/Edit.png');

const renderItems = (items, deletePerson, navigation) =>
  items.map(({ id, name, number, msg, date }) => {
    const swipeoutBtns = [
      {
        backgroundColor: '#bada55',
        component: <Icon icon={edit} />,
        onPress: () =>
          navigation.navigate('Create Futuro SMS', {
            id,
            name,
            number,
            msg,
            date,
            inEditMode: true,
          }),
      },
      {
        backgroundColor: '#ce4a66',
        component: <Icon icon={trash} />,
        onPress: () => deletePerson(id),
      },
    ];
    return (
      <Swipeout right={swipeoutBtns} backgroundColor="transparent" key={id}>
        <Item name={name} msg={msg} date={date} />
      </Swipeout>
    );
  });

const ListComponent = ({ items, deletePerson, navigation }) => (
  <List>{renderItems(items, deletePerson, navigation)}</List>
);

ListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  deletePerson: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListComponent;
