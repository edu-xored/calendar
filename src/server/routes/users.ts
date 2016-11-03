import * as express from 'express';
import * as usersStore from "./../storages/usersStore";
import { User } from '../../lib/model';
import * as authorization from '../ldap/auth';

const router = express.Router();

router.get('/users', (req, res) => {
  usersStore.getAll()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get('/user/:id', (req, res) => {
  usersStore.getById(req.params.id)
    .then((result) => {
        res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
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
