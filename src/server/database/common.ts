import * as ORM from "sequelize";

const EntityFields = {
  id: {
    type: ORM.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: ORM.TIME,
  createdBy: ORM.STRING,
  updatedAt: ORM.TIME,
  updatedBy: ORM.STRING,
};

// Returns function that will define Sequelize model
export function makeEntityFn<TInstance>(name: string, attrs: any, options?: ORM.DefineOptions<TInstance>) {
  return (orm: ORM.Sequelize) => {
    return orm.define<TInstance, any>(name, Object.assign({}, EntityFields, attrs), options);
  };
}
