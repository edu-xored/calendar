import "sequelize";
import { User } from '../../lib/model';
import { sequelize } from "../database/database";
import { MUser } from "../database/models/MUser";

export function getAll(): Promise<User[]> {
    return sequelize.sync()
        .then(() => {
            return MUser.findAll()
        })
        .then((data) => {
            return data;
        });
}

export function get(id: number): Promise<User> {
    return sequelize.sync()
        .then(() => {
            return MUser.findById(id)
        })
        .then((entity) => {
            return entity;
        });
}