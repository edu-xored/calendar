import * as express from 'express';
import resolveUser from '../ldap/client';
import {User} from '../../lib/model';

export async function login(req: express.Request, res: express.Response): Promise<string> {
    let login: string = req.body.login;
    let pwd: string = req.body.pwd;
    try {
    await resolveUser(login, pwd, (error: string, user: User) => {  // could return user if need
        if (error) {
            return(error);
        } else {
            return('200');
        }
    });
    } catch (error) {
        return(error);
    }
}

export async function logout(req: express.Request, res: express.Response): Promise<string> {
    return('200');
};