import * as ldap from 'ldapjs';
import * as express from 'express';
import {EventEmitter} from 'events';
/* 
    TODO: fix auth (now it lets you to double login),
          ldapComparePwd() -> ldapCompare()
          more funcions,

          
*/
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
let ldapClient: ldap.Client = null;
let ldapRootClient: ldap.Client = null;

/**
 * Compares pwd of the entry on the server.
 */
function ldapComparePwd(ldapClient: ldap.Client, dn: ldap.DN, pwd: string, res: express.Response) {
    ldapClient.compare(dn.toString(), 'pwdhash', pwd, (err: ldap.LDAPError,
                                                            pass: boolean) => {
        res.on('error', (err: ldap.LDAPError) => {
            return res.send(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
        });
        if (!pass) {
            return res.send(ldap.LDAP_INVALID_CREDENTIALS + ':null:Wrong username or password:null');
        }
        return res.send('0:null:Ok:null');
    });
};

/**
 * Creates clients (common and root) in accroding to login,
 * binds rootClient to server.
 */
export function login(req: express.Request, res: express.Response) {
    if (req.query.login !== 'root') {
        if (ldapClient === null) {
            ldapClient = ldap.createClient(clientOpts);
            ldapClient.on('error', (err: ldap.LDAPError) => {
                ldapClient = null;
                return res.send(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
            });
        }
        authorize(ldapClient, req, res);
    } else {
        if (ldapRootClient === null) {
            ldapRootClient = ldap.createClient(clientOpts);
            ldapRootClient.on('error', (err: ldap.LDAPError) => {
                ldapRootClient = null;
                return res.send(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
            });
            ldapRootClient.bind('cn=root', req.query.pwd, (err: ldap.LDAPError) => {
                res.on('error', (err: ldap.LDAPError) => {
                    return res.send(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
                });
            });
        }
        authorize(ldapRootClient, req, res);
    }
};

/**
 * NOW: unbind root client, equate it to null.
 * FIX: do smth in case of common client.
 */
export function logout(req: express.Request, res: express.Response) {
    if (req.query.login === 'root') {
        ldapRootClient.unbind(undefined);
        ldapRootClient = null;
    }
    res.end();
};

/**
 * Searches for the entry on the server, compares pwd by ldapComparePwd.
 */
function authorize(ldapClient: ldap.Client, req: express.Request, res: express.Response) {
    let login: string = req.query.login;
    let pwd: string = req.query.pwd;
    if (!login || !pwd) {
        return res.send(ldap.LDAP_INAPPROPRIATE_AUTHENTICATION + ':null:No username or password:null');
    };

    let searchOpts: ldap.Client.SearchOptions = ldapConfig.search;
    if (searchOpts.filter) {
        searchOpts.filter = '(login=' + login + ')';
    };
    ldapClient.search('cn=' + login + ', ' + ldapConfig.base, searchOpts, (err: ldap.LDAPError, result: EventEmitter) => {
        result.on('searchEntry', (entry: ldap.SearchEntry) => {
            ldapComparePwd(ldapClient, entry.dn, pwd, res);
        });
        result.on('error', (err: ldap.LDAPError) => {
            return res.send(err.code + ':' + err.dn + ':' + err.message + ':' + err.name);
        });
    });
};
