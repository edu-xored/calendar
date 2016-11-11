import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";

export function getAll(): Promise<User[]> {
    return database.users.findAll() as any;
}

export function getById(id: number): Promise<User> {
    return database.users.findById(id) as any;
}

export function create(user: User): Promise<User> {
    user.id = null;
    return database.users.create(user) as any;
}

export function getByAttr(attr: string, value: string): Promise<User> {
    return database.users.findOne({where: {[attr]: value}}) as any;
}