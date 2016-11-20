import * as ORM from 'sequelize';
import defineUserModel from './userModel';
import defineTeamModel from './teamModel';
import defineEventModel from './eventModel';
import defineCalendarModel from './calendarModel';
import {ID} from './common';
import {User, TeamMember} from "../../lib/model";

const passwordHash = require('password-hash');

const env = process.env.NODE_ENV || 'development';
const config = require("../../../dbconfig.json")[env];

const withLog = {logging: console.log};

const orm = new ORM(config.database, config.username, config.password, config);

const user = defineUserModel(orm);
const team = defineTeamModel(orm);

const event = defineEventModel(orm);
const calendar = defineCalendarModel(orm);

// no need to define teamId and userId columns
// they will be defined below as associations
const member = orm.define<TeamMember, any>('team_member', {
  id: ID,
  createdBy: ORM.STRING,
  updatedBy: ORM.STRING,
});

user.belongsToMany(team, { through: member }); // will define userId column in team_member join table
team.belongsToMany(user, { through: member }); // will define teamId column in team_member join table

event.belongsTo(calendar);
event.belongsTo(user);

calendar.hasMany(event);
calendar.belongsTo(team);

team.hasMany(calendar);

const db = {
  orm,
  sequelize: orm,
  users: user,
  teams: team,
  members: member,
  events: event,
  calendars: calendar,
};

export default db;

let initialized = false;

export function initdb(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (initialized) {
      return resolve(true);
    }
    const onError = (err: any) => {
      initialized = true;
      reject(err);
    };
    return orm.sync({logging: console.log}).then(() => {
      initAdminUser().then(() => {
        initialized = true;
        resolve(true);
      }, onError);
    }, onError);
  });
}

function initAdminUser() {
  return findUserByLogin('admin').then(user => {
    if (user) {
      return user;
    }
    return createAdminUser();
  }, err => {
    console.log('error:', err);
    return createAdminUser();
  });
}

function createAdminUser() {
  // TODO get admin user from config
  return user.create({
    name: 'admin',
    login: 'admin',
    pwdhash: passwordHash.generate('admin'),
    role: 'admin',
  }, withLog);
}

export function findUserByAttr(attr: string, value: string): Promise<User> {
  return user.findOne({ where: { [attr]: value }, logging: console.log }) as any;
}

export function findUserByLogin(login: string): Promise<User> {
  return user.findOne({ where: { login }, logging: console.log }) as any;
}
