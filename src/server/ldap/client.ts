import * as ldap from 'ldapjs';
import * as express from 'express';
import { EventEmitter } from 'events';
import { User } from '../../lib/model';
const ldapConfig = require('../../../ldap.config.json');
/**
 * Searches for a user by login, if it was found,
 * compares its password with the one in the request.
 */
export default async function resolveUser(login: string, password: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
        // let user: User;
        let client: ldap.Client;
        if (!login || !password) {
            reject(ldap.LDAP_INAPPROPRIATE_AUTHENTICATION + ':null:No username or password:null');
            return;
        }

        let searchOpts: any = ldapConfig.search;
        searchOpts.filter = '(login=' + login + ')';

        try {
            client = await makeClient();
            client.search('cn=' + login + ', ' + ldapConfig.base, searchOpts,
                (err: ldap.LDAPError, res: EventEmitter) => {
                    res.on('searchEntry', async (entry: any) => {
                        await compare(client, entry.dn, 'pwdhash', password)
                            .then(() => {
                                makeUserFromEntry(entry)
                                    .then((user) => {
                                        resolve(user);
                                    })
                                    .catch((e) => {
                                        reject(e);
                                    });
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    });
                    res.on('error', (err: ldap.LDAPError) => {
                        reject(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
                    });
                });
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Makes common client.
 */
function makeClient(): Promise<ldap.Client> {
    return new Promise<ldap.Client>((resolve, reject) => {
        let client: ldap.Client = ldap.createClient(ldapConfig.server);
        client.on('error', (err: ldap.LDAPError) => {
          const error = err.code + ':' + err.dn + ':' + err.message + ':' + err.name;
          reject(error);
        });
        client.on('connect', () => {
          resolve(client);
        });
    });
}

/**
 * Compares equality of pair {attribute: string} : {value: string}
 */
async function compare(client: ldap.Client, dn: ldap.DN, attribute: string,
    value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        client.compare(dn.toString(), attribute, value,
            (err: ldap.LDAPError, matched: boolean) => {
                client.on('error', (err: ldap.LDAPError) => {
                    reject(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
                });
                if (!matched) {
                    reject(ldap.LDAP_INVALID_CREDENTIALS + ':null:Wrong username or password:null');
                    return;
                }
                resolve();
            });
    });
}

/**
 * Parses users attributes from the SearchEntry.
 */
async function makeUserFromEntry(entry: any): Promise<User> {
    return new Promise<User>((resolve) => {
        let user: User;
        let userPrototype: any = {};
        Object.keys(entry.attributes).forEach((value: string, index: number) => {
            userPrototype[entry.attributes[index].type] = entry.attributes[index].vals;
        });
        resolve(userPrototype);
    });
}
