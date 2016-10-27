import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";

export function getAll(): Promise<User[]> {
    return database.users.findAll() as any;
}

export function get(id: number): Promise<User> {
    return database.users.findById(id) as any;
}