import * as express from 'express';
import * as usersStore from "./../storages/usersStore";
import { User } from '../../lib/model';

const router = express.Router();

router.get('/getUsers', (req, res) => {
  usersStore.getAll()
    .then(result => {
      res.json(result);
    });
});

router.get('/getUser/:id', (req, res) => {
  usersStore.get(req.params.id)
    .then(result => {
      res.json({
        data: result
      });
    });
});

router.post('/createUser', (req, res) => {
  usersStore.create(req.body)
    .then(result => {
      res.json({
        data: result
      });
    })
});

export default router;
