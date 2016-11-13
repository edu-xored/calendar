import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Team} from "../../lib/model";

export default makeEntityFn<Team>('Team', {
  name: ORM.STRING,
  avatar: ORM.STRING,
  description: ORM.STRING,
});
