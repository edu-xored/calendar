import * as ldap from 'ldapjs';
import * as express from 'express';
import {EventEmitter} from 'events';
import {User} from '../src/lib/model';

interface ILdapConfig {
    server: {
        url: string,
    };
    base: string;
    search: ldap.Client.SearchOptions;
}
let ldapConfig: ILdapConfig = {
    server: {
        url: 'ldap://0.0.0.0:1389',
    },
    base: 'o=eduxored',
    search: {
        filter: '(login=1)',
        scope: 'base',
    },
};

let clientOpts: ldap.Client.ClientOptions = {
    url: 'ldap://0.0.0.0:1389',
};

/**
 * Searches for a user by login, if it was found,
 * compares its password with the one in the request.
 */
export default async function resolveUser(login: string, password: string,
                                    cb: (error: string, user: User) => void) {
    let error: string;
    let user: User;
    let client: ldap.Client;
    if (!login || !password) {
        cb(ldap.LDAP_INAPPROPRIATE_AUTHENTICATION + ':null:No username or password:null', null);
        return;
    };
    try {
    client = await makeClient((err: string) => {
        if (err)
            error = err;
    });
    } catch (error) {
        cb(error, null);
    }
    if (error) {
        cb(error, null);
    }
    let searchOpts: ldap.Client.SearchOptions = ldapConfig.search;
    searchOpts.filter = '(login=' + login + ')';

    try {
    await client.search('cn=' + login + ', ' + ldapConfig.base, searchOpts,
                                         (err: ldap.LDAPError, res: EventEmitter) => {
        res.on('searchEntry', async (entry: ldap.SearchEntry) => {
            try {
            await compare(client, entry.dn, 'pwdhash', password, async (err: string) => {
                if (err) {
                    error = err;
                } else {
                    try {
                    user = await makeUserFromEntry(entry);
                    } catch (error) {
                        cb(error, null);
                    }
                }
                return cb(error, user);
            });
            } catch (error) {
                cb(error, null);
            }
        });
        res.on('error', (err: ldap.LDAPError) => {
            cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name, null);
        });
    });
    } catch (error) {
        cb(error, null);
    }
}

/**
 * Makes common client.
 */
async function makeClient(cb: (error: string) => void): Promise<ldap.Client> {
    let client: ldap.Client = ldap.createClient(clientOpts);
    client.on('error', (err: ldap.LDAPError) => {
        client = null;
        cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
    });
    return new Promise<ldap.Client>((resolve) => {
        resolve(client);
    });
}

/**
 * Compares equality of pair {attribute: string} : {value: string}
 */
async function compare(client: ldap.Client, dn: ldap.DN, attribute: string,
                                              value: string, cb: (err: string) => void): Promise<void> {
    client.compare(dn.toString(), attribute, value,
                                  (err: ldap.LDAPError, pass: boolean, res: ldap.LDAPResult) => {
        client.on('error', (err: ldap.LDAPError) => {
            return new Promise<void>((resolve) =>
                                cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name));
        });
        if (!pass) {
            return new Promise<void>((resolve) =>
                                cb(ldap.LDAP_INVALID_CREDENTIALS + ':null:Wrong username or password:null'));
        }
        return new Promise<void>((resolve) => cb(null));
    });
};

/**
 * Parses users attributes from the SearchEntry.
 */
async function makeUserFromEntry(entry: ldap.SearchEntry): Promise<User> {
    let user: User;
    let userPrototype: any = {};
    Object.keys(entry.object).forEach((value: string, index: number) => {
        userPrototype[value] = entry.object[value];
    });
    user = userPrototype as User;
    return new Promise<User>((resolve) => {
        resolve(user);
    });
}
