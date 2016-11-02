import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";

export function getAll(): Promise<User[]> {
    return database.users.findAll() as any;
}

export function get_by_id(id: number): Promise<User> {
    return database.users.findById(id) as any;
}

export function get_by_attr(attr: string, value: string): Promise<User> {
    return database.users.findOne({where: {login: value}}) as any;
}