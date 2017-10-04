import Realm from 'realm';

import Person from './person';
import Theme from './theme';

export default new Realm({ schema: [Person, Theme] });
