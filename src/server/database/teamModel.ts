import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Team} from "../../lib/model";

export default makeEntityFn<Team>('team', {
  name: ORM.STRING,
  avatar: ORM.TEXT,
  description: ORM.STRING(512),
});
