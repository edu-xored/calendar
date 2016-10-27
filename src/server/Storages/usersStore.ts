import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";
import userModel from "../database/models/userModel";

export function getAll(): any {
    return database.sync()
        .then(() => {
            return userModel.findAll()
        })
        .then((data) => {
            return data;
        });
}

export function get(id: number): any {
    return database.sync()
        .then(() => {
            return userModel.findById(id)
        })
        .then((entity) => {
            return entity;
        });
}