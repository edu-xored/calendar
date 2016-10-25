import "sequelize";
import { User } from '../../lib/model';
import { MUser, dbConfig } from "../database/database";

// I used it for testing and find it useful so I not deleted this code.
export function create(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
        dbConfig.sync()
            .then(() => {
                return MUser.create({
                    name: user.name,
                    login: user.login,
                    createdBy: user.createdBy,
                    updatedBy: user.updatedBy
                });
            })
            .then((record) => {
                resolve(record.toJSON());
            });
    });
}

export function getAll(): Promise<User[]> {
    return new Promise<User[]>((resolve) => {
        dbConfig.sync()
            .then(() => {
                return MUser.findAll()
            })
            .then((data) => {
                resolve(data);
            })
    });
}

export function get(id: number): Promise<User[]> {
    return new Promise<User[]>((resolve) => {
        dbConfig.sync()
            .then(() => {
                return MUser.findById(id)
            })
            .then((entity) => {
                resolve(entity);
            })
    });
}