import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";

export function getAll(): User[] {
    return database.users.findAll() as any;
}

export function get(id: number): User {
    return database.users.findById(id) as any;
}