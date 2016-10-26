import * as express from 'express';
import resolveUser from '../ldap/client';
import {User} from '../src/lib/model';

export function login(req: express.Request, res: express.Response): void {
    let login: string = req.body.login;
    let pwd: string = req.body.pwd;
    resolveUser(login, pwd, (error: string, user: User) => {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(user);
        }
    });
}

export function logout(req: express.Request, res: express.Response): void {
    res.end();
};