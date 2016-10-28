import "sequelize";
import { User } from '../../lib/model';
import database from "../database/database";

export function getAll(): Promise<User[]> {
    return database.users.findAll() as any;
}

export function get(id: number): Promise<User> {
    return database.users.findById(id) as any;
}

export function create(user: User): Promise<User> {
    return database.users.create(
        {
            createdBy: user.createdBy,
            updatedBy: user.updatedBy,
            name: user.name,
            login: user.login,
            email: user.email,
            pwhash: user.pwdhash,
            avatar: user.avatar,
            role: user.role,
            position: user.position,
            place: user.place
        }
    ) as any;
}