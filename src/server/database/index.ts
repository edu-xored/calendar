import * as ORM from 'sequelize';
import defineUserModel from './userModel';
import defineTeamModel from './teamModel';
import defineOrgModel from './organizationModel';
import defineEventModel from './eventModel';
import defineCalendarModel from './calendarModel';

const env = 'development' || process.env.NODE_ENV;
const config = require("../../../dbconfig.json")[env];

const orm = new ORM(config.database, config.username, config.password, config);

const db = {
  orm,
  sequelize: orm,
  users: defineUserModel(orm),
  teams: defineTeamModel(orm),
  organizations: defineOrgModel(orm),
  events: defineEventModel(orm),
  calendars: defineCalendarModel(orm),
};

export default db;
