import * as Sequelize from "sequelize";

const teamModel = (sequelize) => {
  return sequelize.define('Team', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: Sequelize.TIME,
    createdBy: Sequelize.STRING,
    updatedAt: Sequelize.TIME,
    updatedBy: Sequelize.STRING,
    name: Sequelize.STRING,
    avatar: Sequelize.STRING,
    description: Sequelize.STRING,
  });
};

export default teamModel;
