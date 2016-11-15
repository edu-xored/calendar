import {makeRouter} from './common';
import db from '../database';

const router = makeRouter({
  orm: db.teams,
  collectionName: 'teams',
  resourceName: 'team',
});

export default router;
