import { v4 } from 'react-native-uuid';
import Schema from './schema';
import { Log } from './../utils/index';

export const getTheme = () => {
  const theme = Schema.objects('Theme');
  if (!Object.keys(theme).length) return '#4A90E2';
  return theme[0].color;
};

export const saveTheme = (color) => {
  Schema.write(() => {
    const theme = Schema.objects('Theme');
    if (!Object.keys(theme).length) Schema.create('Theme', { color }, true);
    else theme[0].color = color;
  });
};

export const getAllPeople = () => {
  const person = Schema.objects('Person').sorted('date', true);
  if (!Object.keys(person).length) return {};
  return person;
};

export const savePerson = (name, number, date, msg) => {
  Schema.write(() => {
    Schema.create('Person', {
      id: v4(),
      name,
      number,
      date,
      msg,
    });
  });
};

export const saveExistingPerson = (id, name, number, date, msg) => {
  Schema.write(() => {
    Schema.create('Person', { id, name, number, date, msg }, true);
  });
};

export const deleteAll = () => {
  Schema.write(() => {
    Schema.delete(Schema.objects('Person'));
    Schema.delete(Schema.objects('Theme'));
  });
};

export const deletePerson = (id) => {
  Schema.write(() => {
    Schema.delete(Schema.objectForPrimaryKey('Person', id));
  });
};
