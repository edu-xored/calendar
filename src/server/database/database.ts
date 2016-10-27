import Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("../../../dbconfig.json")[env];

const database = new Sequelize('database', 'username', 'password', {
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

export default database;
