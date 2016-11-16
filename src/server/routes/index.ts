import * as express from 'express';
import users from './users';
import teams from './teams';
import calendars from './calendars';
import events from './events';

export default function install(app: express.Application) {
  app.use('/api', users);
  app.use('/api', teams);
  app.use('/api', calendars);
  app.use('/api', events);
}
