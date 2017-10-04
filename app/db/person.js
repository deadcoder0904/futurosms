import Realm from 'realm';

class Person extends Realm.Object {}
Person.schema = {
  name: 'Person',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    number: 'string',
    date: 'string',
    msg: 'string',
  },
};

export default Person;
