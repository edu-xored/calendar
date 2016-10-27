import database from "../database";
import * as Sequelize from "sequelize";

const userModel = database.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  createdAt: Sequelize.TIME,
  createdBy: Sequelize.STRING,
  updatedAt: Sequelize.TIME,
  updatedBy: Sequelize.STRING,
  name: Sequelize.STRING,
  login: Sequelize.STRING
});

export default userModel;