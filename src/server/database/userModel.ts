import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {User} from "../../lib/model";

export default makeEntityFn<User>('User', {
  name: ORM.STRING,
  email: ORM.STRING,
  login: ORM.STRING,
  pwdhash: ORM.STRING,
  avatar: ORM.STRING,
  role: ORM.STRING,
  position: ORM.STRING,
  place: ORM.STRING
});
