import * as express from 'express';
import auth, { authMiddleware } from './auth';
import users from './users';
import teams from './teams';
import calendars from './calendars';
import events from './events';
import {sync} from '../database';

export default function install(app: express.Application) {
  // sync database on first api call
  app.use('/api/*', (req, res, next) => {
    sync().then(() => {
      authMiddleware(req, res, next);
    }, err => {
      res.sendStatus(500);
    });
  });

  app.use('/api', auth);
  app.use('/api', users);
  app.use('/api', teams);
  app.use('/api', calendars);
  app.use('/api', events);
}
