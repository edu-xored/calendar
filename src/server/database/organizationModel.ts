import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Organization} from "../../lib/model";

export default makeEntityFn<Organization>('Organization', {
  name: ORM.STRING,
  avatar: ORM.STRING,
  description: ORM.STRING,
});
