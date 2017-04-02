import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {User} from "../../lib/model";

export default makeEntityFn<User>('user', {
  name: ORM.STRING,
  email: ORM.STRING,
  login: ORM.STRING,
  pwdhash: ORM.STRING,
  avatar: ORM.TEXT,
  role: ORM.STRING(64),
  position: ORM.STRING(128),
  place: ORM.STRING
});
