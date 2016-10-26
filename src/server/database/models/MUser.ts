import { sequelize } from "../database";
const Sequelize = require('sequelize');

export const MUser = sequelize.define('User', {
  createdBy: Sequelize.STRING,
  updatedBy: Sequelize.STRING,
  name: Sequelize.STRING,
  login: Sequelize.STRING
});