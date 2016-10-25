var Sequelize = require('sequelize');
export var dbConfig = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'database.db'
});

export var MUser = dbConfig.define('User', {
  createdBy: Sequelize.STRING,
  updatedBy: Sequelize.STRING,
  name: Sequelize.STRING,
  login: Sequelize.STRING
});