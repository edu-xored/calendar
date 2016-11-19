import db from '../database';
import {makeRouter} from './common';

const router = makeRouter({
  orm: db.users,
  collectionName: 'users',
  resourceName: 'user',
});

export default router;
