import Sequelize = require("sequelize");
const env = 'development' || process.env.NODE_ENV;
const config = require("../../../dbconfig.json")[env];

export default class Database {
    static sequelize = new Sequelize(config.database, config.username, config.password, config);

    static users: Sequelize.Model<any,any> = require('./models/userModel').default(Database.sequelize);
    static teams: Sequelize.Model<any,any> = require('./models/teamModel').default(Database.sequelize);
}
