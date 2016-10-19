import * as express from 'express';
import { User } from '../../lib/model';
import { UsersService } from "./../Services/UsersService";

const router = express.Router();

router.get('/users', (req, res) => {
  res.json(UsersService.Users());
});

router.get('/user/:id', (req, res) => {
  let user = UsersService.User(req.params.id);
  if (user != null) 
  {
    res.json(user);
  }
  res.sendStatus(404);
});

export default router;
