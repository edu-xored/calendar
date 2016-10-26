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
export default function resolveUser(login: string, password: string,
                                    cb: (error: string, user: User) => void): void {
    let error: string;
    let user: User;
    if (!login || !password) {
        cb(ldap.LDAP_INAPPROPRIATE_AUTHENTICATION + ':null:No username or password:null', null);
        return;
    };
    let client: ldap.Client = makeClient((err: string) => {
        if (err)
            error = err;
    });
    if (error) {
        cb(error, null);
    }
    let searchOpts: ldap.Client.SearchOptions = ldapConfig.search;
    searchOpts.filter = '(login=' + login + ')';

    client.search('cn=' + login + ', ' + ldapConfig.base, searchOpts,
                                         (err: ldap.LDAPError, res: EventEmitter) => {
        res.on('searchEntry', (entry: ldap.SearchEntry) => {
            compare(client, entry.dn, 'pwdhash', password, (err: string) => {
                if (err) {
                    error = err;
                } else {
                    user = makeUserFromEntry(entry);
                }
                return cb(error, user);
            });
        });
        res.on('error', (err: ldap.LDAPError) => {
            cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name, null);
        });
    });
}

/**
 * Makes common client.
 */
function makeClient(cb: (error: string) => void): ldap.Client {
    let client: ldap.Client = ldap.createClient(clientOpts);
    client.on('error', (err: ldap.LDAPError) => {
        client = null;
        cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
    });
    return client;
}

/**
 * Compares equality of pair {attribute: string} : {value: string}
 */
function compare(client: ldap.Client, dn: ldap.DN, attribute: string,
                                              value: string, cb: (err: string) => void): void {
    client.compare(dn.toString(), attribute, value,
                                  (err: ldap.LDAPError, pass: boolean, res: ldap.LDAPResult) => {
        client.on('error', (err: ldap.LDAPError) => {
            return cb(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
        });
        if (!pass) {
            return cb(ldap.LDAP_INVALID_CREDENTIALS + ':null:Wrong username or password:null');
        }
        return cb(null);
    });
};

/**
 * Parses users attributes from the SearchEntry.
 */
function makeUserFromEntry(entry: ldap.SearchEntry): User {
    let user: User;
    let userPrototype: any = {};
    Object.keys(entry.object).forEach((value: string, index: number) => {
        userPrototype[value] = entry.object[value];
    });
    user = userPrototype as User;
    return user;
}
