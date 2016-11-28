import * as express from 'express';
import resolveUser from '../ldap/client';
import {User} from '../../lib/model';

/**
 * Returns user in case of success, if any else returns {error: string} as
 * "error.code:error.dn:error.message:error.name"
 */
export function login(login: string, pwd: string): Promise<User> {
    return resolveUser(login, pwd);
}
