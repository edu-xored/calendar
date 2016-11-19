import * as _ from 'lodash';
import db from '../database';
import {makeRouter} from './common';
const passwordHash = require('password-hash');

const router = makeRouter({
  orm: db.users,
  collectionName: 'users',
  resourceName: 'user',
  makeResource: (data: any) => {
    const password = data.password || '123';
    data = _.omit(data, ['password']);
    data.pwdhash = passwordHash.generate(password);
    return data;
  },
  filter: (data: any) => {
    return _.omit(data, ['pwdhash']);
  },
});

export default router;
