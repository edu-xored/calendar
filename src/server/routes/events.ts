import {makeRouter} from './common';
import db from '../database';

const router = makeRouter({
  orm: db.events,
  collectionName: 'events',
  resourceName: 'event',
});

export default router;
