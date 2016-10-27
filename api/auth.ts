import * as express from 'express';
import resolveUser from '../ldap/client';
import {User} from '../src/lib/model';

export async function login(req: express.Request, res: express.Response) {
    let login: string = req.body.login;
    let pwd: string = req.body.pwd;
    try {
    await resolveUser(login, pwd, (error: string, user: User) => {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(user);
        }
    });
    } catch (error) {
        res.send(error);
    }
}

export async function logout(req: express.Request, res: express.Response) {
    res.sendStatus(200);
};