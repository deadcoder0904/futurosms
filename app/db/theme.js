import Realm from 'realm';

class Theme extends Realm.Object {}
Theme.schema = {
  name: 'Theme',
  properties: {
    color: 'string',
  },
};

export default Theme;
