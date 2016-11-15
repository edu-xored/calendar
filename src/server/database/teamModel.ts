import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Team} from "../../lib/model";

export default makeEntityFn<Team>('team', {
  name: ORM.STRING,
  avatar: ORM.STRING,
  description: ORM.STRING,
});
