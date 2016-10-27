import Sequelize = require("sequelize");
// TODO: Make dev script in package.json 'development' NODE_ENV
const env = 'development' || process.env.NODE_ENV; 
const config = require("../../../dbconfig.json")[env];
console.log(env);


export default class Database {
    static sequelize = new Sequelize(config.database, config.username, config.password, config);

    static users = require('./models/userModel').default(Database.sequelize);
}