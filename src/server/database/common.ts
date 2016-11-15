import * as ORM from "sequelize";

export const ID = {
  type: ORM.INTEGER,
  primaryKey: true,
  autoIncrement: true
};

const EntityFields = {
  id: ID,
  createdAt: ORM.TIME,
  updatedAt: ORM.TIME,
  createdBy: ORM.STRING,
  updatedBy: ORM.STRING,
};

// Returns function that will define Sequelize model
export function makeEntityFn<TInstance>(name: string, attrs: any, options?: ORM.DefineOptions<TInstance>) {
  return (orm: ORM.Sequelize) => {
    return orm.define<TInstance, any>(name, Object.assign({}, EntityFields, attrs), options);
  };
}
