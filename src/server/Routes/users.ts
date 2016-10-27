import * as express from 'express';
import * as usersStore from "./../Storages/usersStore";
import { User } from '../../lib/model';

const router = express.Router();

router.get('/users', (req, res) => {
  usersStore.getAll()
    .then((result) => {
      res.json(result);
    });
});

router.get('/user/:id', (req, res) => {
  usersStore.get(req.params.id)
    .then((result) => {
        res.json(result);
    });
});

export default router;
