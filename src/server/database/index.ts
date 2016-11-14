import * as ORM from 'sequelize';
import defineUserModel from './userModel';
import defineTeamModel from './teamModel';
import defineOrgModel from './organizationModel';
import defineEventModel from './eventModel';
import defineCalendarModel from './calendarModel';
import {ID} from './common';
import {TeamMember} from "../../lib/model";

const env = process.env.NODE_ENV || 'development';
const config = require("../../../dbconfig.json")[env];

const orm = new ORM(config.database, config.username, config.password, config);

const user = defineUserModel(orm);
const team = defineTeamModel(orm);

// no need to define teamId and userId columns
// they will be defined below as associations
const member = orm.define<TeamMember, any>('team_member', {
  id: ID,
  createdBy: ORM.STRING,
  updatedBy: ORM.STRING,
});

user.belongsToMany(team, { through: member }); // will define userId column in team_member join table
team.belongsToMany(user, { through: member }); // will define teamId column in team_member join table

const db = {
  orm,
  sequelize: orm,
  users: user,
  teams: team,
  members: member,
  organizations: defineOrgModel(orm),
  events: defineEventModel(orm),
  calendars: defineCalendarModel(orm),
};

export default db;
