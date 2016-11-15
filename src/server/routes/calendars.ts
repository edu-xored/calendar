import {makeRouter} from './common';
import db from '../database';

const router = makeRouter({
  orm: db.calendars,
  collectionName: 'calendars',
  resourceName: 'calendar',
});

export default router;
