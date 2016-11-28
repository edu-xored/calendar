import * as _ from 'lodash';
import db from '../database';
import { makeRouter, makeResultHandler, makeErrorHandler } from './common';

const passwordHash = require('password-hash');

function omitPassword(data: any) {
  return _.omit(data, ['pwdhash']);
}

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
  filter: omitPassword,
});

router.get('/me', (req, res) => {
  const errorHandler = makeErrorHandler(req, res);
  const resultHandler = makeResultHandler(res);
  const id = +(req as any).user.user.id;
  db.users.findById(id, console.log).then((value: any) => {
    if (value) {
      const user = omitPassword(value.toJSON());
      console.log("InsudeActualUser:", value.toJSON());
      resultHandler(user);
    }
    else {
      res.sendStatus(500);
    }
  }, errorHandler);
});

export default router;
