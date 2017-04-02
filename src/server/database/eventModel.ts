import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Event} from "../../lib/model";

export default makeEntityFn<Event>('event', {
  type: ORM.STRING(64), // TODO enum type
  comment: ORM.STRING(512),
  start: ORM.TIME,
  end: ORM.TIME,
  duration: ORM.STRING(64),
});
