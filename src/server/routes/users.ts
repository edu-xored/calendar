import * as _ from 'lodash';
import db from '../database';
import { makeRouter } from './common';
const passwordHash = require('password-hash');
const expressJWT = require('express-jwt');
const secret = 'super secret';
const jwtMiddleware = expressJWT({ secret });

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

router.get(`/me`, (req, res) => {
  const errHandler = err => {
  };
  const next = (err?: any) => void

  jwtMiddleware(req, res, next);

  db.users.all().then((d : any) => {
    console.log("OUT::", d);
  });


  const id = (req as any).user.user.id;
  db.users.findById(id).then((d: any) => {  
    if (d) {
      res.json(_.omit(d.toJSON(), ['pwdhash']));
    } else {
      res.sendStatus(500);
    }
  });
});

export default router;
