import * as authorization from '../ldap/auth';
import db from '../database';
import {makeRouter} from './common';

const router = makeRouter({
  orm: db.users,
  collectionName: 'users',
  resourceName: 'user',
});

router.post('/login', (req, res) => {
  authorization.login(req.body.login, req.body.pwd)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/logout', (req, res) => {
  authorization.logout(req)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

export default router;
