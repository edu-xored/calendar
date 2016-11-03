import * as express from 'express';
import resolveUser from '../ldap/client';
import {User} from '../../lib/model';

/**
 * Returns user in case of success, if any else returns {error: string} as
 * "error.code:error.dn:error.message:error.name"
 */
export async function login(req: express.Request, res: express.Response): Promise<User> {
    return new Promise<User> ((resolve, reject) => {
        resolveUser(req.body.login, req.body.pwd)
        .then((user) => {
            resolve(user);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export async function logout(req: express.Request, res: express.Response): Promise<string> {
    return('200');
};