import * as Sequelize from "sequelize";

const userModel = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    createdAt: Sequelize.TIME,
    createdBy: Sequelize.STRING,
    updatedAt: Sequelize.TIME,
    updatedBy: Sequelize.STRING,
    name: Sequelize.STRING,
    login: Sequelize.STRING,
    email: Sequelize.STRING,
    pwdhash: Sequelize.STRING,
    avatar: Sequelize.STRING,
    role: Sequelize.STRING,
    position: Sequelize.STRING,
    place: Sequelize.STRING
  });
};

export default userModel;
