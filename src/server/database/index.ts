import * as _ from 'lodash';
import * as ORM from 'sequelize';
import defineUserModel from './userModel';
import defineTeamModel from './teamModel';
import defineEventModel from './eventModel';
import defineCalendarModel from './calendarModel';
import {ID} from './common';
import {User, Team, TeamMember} from "../../lib/model";

const passwordHash = require('password-hash');

const env = process.env.NODE_ENV || 'development';
const config = require("../../../dbconfig.json");

if (env === 'production') {
  config.dialect = 'postgres';
}
if (process.env.DIALECT) {
  config.dialect = process.env.DIALECT;
}

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

export function findUserByAttr(attr: string, value: string): Promise<User> {
  return user.findOne({ where: { [attr]: value }, logging: console.log }) as any;
}

export function findUserByLogin(login: string): Promise<User> {
  return user.findOne({ where: { login }, logging: console.log }) as any;
}

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
      initData().then(() => {
        initialized = true;
        resolve(true);
      }, onError);
    }, onError);
  });
}

function initData() {
  return Promise.all([
    initAdminUser(),
    initTeams()
  ]);
}

function initAdminUser(): Promise<any> {
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

function initTeams(): Promise<any> {
  const teamsJSON: any[] = require('../../../data/teams.json');
  const usersJSON: any[] = require('../../../data/users.json');
  const teams = _.map(teamsJSON, t => (
    _.assign({}, t, {
      members: _.map(t.members, userName => _.find(usersJSON, u => u.name === userName)).filter(_.identity)
    })
  ));
  return Promise.all(_.map(teams, initTeam));
}

function initTeam(input: any): Promise<any> {
  const members: any = input.members || [];
  const data: any = _.omit(input, ['members']);

  const initMembers = teamId => {
    console.log('init members for team:', data.name);
    return Promise.all(_.map(members, m => initMember(teamId, m)));
  };

  const initCalendars = team => (
    Promise.all([
      initCalendar(team, 'PTO'),
      initCalendar(team, 'WFH'),
    ])
  );

  const initRelations = (team: any) => (
    Promise.all([
      initMembers(team.id),
      initCalendars(team.toJSON())
    ])
  );

  const create = () => {
    console.log('init team:', data.name);
    return team.create(data, withLog).then((d: any) => initRelations(d));
  };

  return team.findOne({
    where: { name: data.name },
    logging: console.log
  }).then((d: any) => {
    if (!d) {
      return create();
    }
    return initRelations(d);
  }, err => {
    console.log('error:', err);
    return create();
  }) as any;
}

function initMember(teamId: number, data: any): Promise<any> {
  const link = (user: ORM.Instance<User>) => {
    return (user as any).getTeams(withLog).then((teams: any[]) => {
      const team = _.find(teams, t => +t.id === +teamId);
      if (team) return team;
      return (user as any).addTeam(teamId, withLog);
    });
  };

  const create = () => {
    console.log('init user:', data.name);
    if (!data.login) {
      data.login = data.name;
    }
    if (!data.role) {
      data.role = 'superhero';
    }
    if (!data.position) {
      data.position = 'superhero';
    }
    const pwd = data.password || data.login;
    data.pwdhash = passwordHash.generate(pwd);
    return user.create(data, withLog).then((u: any) => link(u));
  };

  return user.findOne({
    where: { name: data.name },
    logging: console.log
  }).then((d: any) => {
    if (!d) {
      return create();
    }
    return link(d);
  }, err => {
    console.log('error:', err);
    return create();
  }) as any;
}

function initCalendar(team: Team, type: string) {
  const create = () => {
    const name = `${team.name} ${type} Calendar`;
    console.log('init calendar:', name);
    const data = {
      name,
      type,
      teamId: +team.id,
    };
    return calendar.create(data, withLog);
  };

  return calendar.findOne({
    where: { type },
    logging: console.log
  }).then((c: any) => {
    return c || create();
  }, err => {
    console.log('error:', err);
    return create();
  });
}
