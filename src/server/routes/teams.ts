import * as _ from 'lodash';
import * as express from "express";
import * as ORM from "sequelize";
import {makeRouter, makeResultHandler, makeErrorHandler} from './common';
import db from '../database';
import {User, Team} from '../../lib/model';

const withLog = {logging: console.log};

const router = makeRouter<Team>({
  orm: db.teams,
  collectionName: 'teams',
  resourceName: 'team',
});

function makeTeamHandler(handler: (req: express.Request, res: express.Response, val: ORM.Instance<Team>) => void) {
  return (req: express.Request, res: express.Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.sendStatus(404);
      return;
    }

    const errorHandler = makeErrorHandler(req, res);

    db.teams.findById(id, {
      logging: console.log,
    }).then((d: any) => {
      const team = d as ORM.Instance<Team>;
      if (!team) {
        res.sendStatus(404);
        return;
      }
      handler(req, res, team);
    }, errorHandler);
  };
}

router.get('/team/:id/members', makeTeamHandler((req, res, team) => {
  const resultHandler = makeResultHandler(res);
  const errorHandler = makeErrorHandler(req, res);
  (team as any).getUsers(withLog).then(resultHandler, errorHandler);
}));

function updateMembers(req: express.Request, res: express.Response, cb: (users: ORM.Instance<User>[]) => void) {
  if (!_.isArray(req.body) || _.isEmpty(req.body)) {
    res.sendStatus(400);
    return;
  }

  const userIds = req.body as string[];
  const errorHandler = makeErrorHandler(req, res);

  db.users.findAll({
    logging: console.log,
    where: {
      id: { $in: userIds },
    }
  }).then((d: any) => {
    const users = d as ORM.Instance<User>[];
    if (users.length !== userIds.length) {
      res.sendStatus(400);
      return;
    }
    cb(users);
  }, errorHandler);
}

router.post('/team/:id/members', makeTeamHandler((req, res, team) => {
  const errorHandler = makeErrorHandler(req, res);

  updateMembers(req, res, users => {
    (team as any).addUsers(users).then(t => {
      res.sendStatus(200);
    }, errorHandler);
  });
}));

router.delete('/team/:id/members', makeTeamHandler((req, res, team) => {
  const errorHandler = makeErrorHandler(req, res);

  updateMembers(req, res, users => {
    (team as any).removeUsers(users).then(t => {
      res.sendStatus(200);
    }, errorHandler);
  });
}));

export default router;
