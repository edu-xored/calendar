import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Event} from "../../lib/model";

export default makeEntityFn<Event>('event', {
  type: ORM.STRING, // TODO enum type
  comment: ORM.STRING,
  calendarId: ORM.STRING,
  start: ORM.TIME,
  end: ORM.TIME,
  userId: ORM.STRING,
});
