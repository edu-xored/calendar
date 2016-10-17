import * as express from 'express';
import { User } from '../lib/model';

const router = express.Router();

const demoUser: User = {
  id: '1',
  name: 'Bob',
  login: 'bob',
};

router.get('/users', (req, res) => {
  // TODO read users from database
  res.json([demoUser]);
});

router.get('/user/:id', (req, res) => {
  // TODO read user from database
  if (req.params.id === demoUser.id) {
    res.json(demoUser);
  } else {
    res.sendStatus(404);
  }
});

export default router;
