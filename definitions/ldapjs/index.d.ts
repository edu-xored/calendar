// Copyright (c) 2016, Felix Frederick Becker
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/client/client.d.ts
declare module '~ldapjs/lib/client/client' {

import {EventEmitter} from 'events';
import {TlsOptions} from 'tls';
import {Control} from '~ldapjs/lib/controls/index';
import {Filter} from '~ldapjs/lib/filters/index';
import {LDAPResult} from '~ldapjs/lib/messages/index';
import Change = require('~ldapjs/lib/change');

namespace Client {

    export interface ClientOptions {

        /**
         * A valid LDAP URL (proto/host/port only)
         */
        url?: string;

        /**
         * Socket path if using AF_UNIX sockets
         */
        socketPath?: string;

        /**
         * Bunyan logger instance (Default: built-in instance)
         */
        log?: any;

        /**
         * Milliseconds client should let operations live for before timing out (Default: Infinity)
         */
        timeout?: number;

        /**
         * Milliseconds client should wait before timing out on TCP connections (Default: OS default)
         */
        connectTimeout?: number;

        /**
         * Additional options passed to TLS connection layer when connecting via ldaps:// (See: The TLS docs for node.js)
         */
        tlsOptions?: TlsOptions;

        /**
         * Milliseconds after last activity before client emits idle event
         */
        idleTimeout?: number;

        /**
         * Force strict DN parsing for client methods (Default is true)
         */
        strictDN?: boolean;
    }

    export interface SearchOptions {
        /**
         * One of base, one, or sub. Defaults to base.
         */
        scope?: 'base' | 'one' | 'sub';

        /**
         * A string version of an LDAP filter (see below), or a programatically
         * constructed Filter object. Defaults to (objectclass=*).
         */
        filter?: string | Filter;

        /**
         * attributes to select and return (if these are set, the server will return
         * only these attributes). Defaults to the empty set, which means all
         * attributes. You can provide a string if you want a single attribute or an
         * array of string for one or many.
         */
        attributes?: string | string[];
        /**
         * boolean on whether you want the server to only return the names of the
         * attributes, and not their values. Borderline useless. Defaults to false.
         */
        attrsOnly?: boolean;

        /**
         * the maximum number of entries to return. Defaults to 0 (unlimited).
         */
        sizeLimit?: number;

        /**
         * the maximum amount of time the server should take in responding, in seconds. Defaults to 10. Lots of servers will ignore this.
         */
        timeLimit?: number;

        /**
         * enable and/or configure automatic result paging
         */
        paging?: boolean;
    }
}

class Client extends EventEmitter {

    /**
     * Constructs a new client.
     *
     * The options object is required, and must contain either a URL (string) or a
     * socketPath (string); the socketPath is only if you want to talk to an LDAP
     * server over a Unix Domain Socket.  Additionally, you can pass in a bunyan
     * option that is the result of `new Logger()`, presumably after you've
     * configured it.
     *
     * @param options must have either url or socketPath.
     * @throws {TypeError} on bad input.
     */
    constructor(options: Client.ClientOptions);

    /**
     * Performs a simple authentication against the server.
     *
     * @param {String} name the DN to bind as.
     * @param {String} credentials the userPassword associated with name.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    bind(dn: string, password: string, callback: (err?: any, res?: LDAPResult) => any): any;
    bind(dn: string, password: string, controls: Control | Control[], callback: (err?: any, res?: LDAPResult) => any): any;

    /**
     * Adds an entry to the LDAP server.
     *
     * Entry can be either [Attribute] or a plain JS object where the
     * values are either a plain value or an array of values.  Any value (that's
     * not an array) will get converted to a string, so keep that in mind.
     *
     * @param {String} name the DN of the entry to add.
     * @param {Object} entry an array of Attributes to be added or a JS object.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    add(dn: string, entry: { [attribute: string]: any }, callback: (err?: any, res?: LDAPResult) => any): any;
    add(dn: string, entry: { [attribute: string]: any }, controls: Control | Control[], callback: (err?: any, res?: LDAPResult) => any): any;

    /**
     * Compares an attribute/value pair with an entry on the LDAP server.
     *
     * @param {String} name the DN of the entry to compare attributes with.
     * @param {String} attribute name of an attribute to check.
     * @param {String} value value of an attribute to check.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, boolean, res).
     * @throws {TypeError} on invalid input.
     */
    compare(dn: string, attribute: string, value: string, callback: (err?: any, matched?: boolean, res?: LDAPResult) => any): any;
    compare(dn: string, attribute: string, value: string, controls: Control | Control[], callback: (err?: any, matched?: boolean, res?: LDAPResult) => any): any;

    /**
     * Deletes an entry from the LDAP server.
     *
     * @param {String} name the DN of the entry to delete.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    del(name: string, callback: (err?: any, res?: LDAPResult) => any): any;
    del(name: string, controls: Control | Control[], callback: (err?: any, res?: LDAPResult) => any): any;

    /**
     * Performs an extended operation on the LDAP server.
     *
     * Pretty much none of the LDAP extended operations return an OID
     * (responseName), so I just don't bother giving it back in the callback.
     * It's on the third param in `res` if you need it.
     *
     * @param {String} name the OID of the extended operation to perform.
     * @param {String} value value to pass in for this operation.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, value, res).
     * @throws {TypeError} on invalid input.
     */
    exop(name: string, value: string, callback: (err?: any, value?: any, res?: LDAPResult) => any): any;
    exop(name: string, value: string, controls: Control | Control[], callback: (err?: any, value?: any, res?: LDAPResult) => any): any;

    /**
     * Performs an LDAP modify against the server.
     *
     * @param {String} name the DN of the entry to modify.
     * @param {Change} change update to perform (can be [Change]).
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    modify(name: string, change: Change | Change[], callback: (err?: any, res?: LDAPResult) => any): any;
    modify(name: string, change: Change | Change[], controls: Control | Control[], callback: (err?: any, res?: LDAPResult) => any): any;

    /**
     * Performs an LDAP modifyDN against the server.
     *
     * This does not allow you to keep the old DN, as while the LDAP protocol
     * has a facility for that, it's stupid. Just Search/Add.
     *
     * This will automatically deal with "new superior" logic.
     *
     * @param {String} name the DN of the entry to modify.
     * @param {String} newName the new DN to move this entry to.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    modifyDN(name: string, newName: string, callback: (err?: any, res?: LDAPResult) => any): any;
    modifyDN(name: string, newName: string, controls: Control | Control[], callback: (err?: any, res?: LDAPResult) => any): any;

    /**
     * Performs an LDAP search against the server.
     *
     * Note that the defaults for options are a 'base' search, if that's what you
     * want you can just pass in a string for options and it will be treated as the
     * search filter.  Also, you can either pass in programatic Filter objects or a
     * filter string as the filter option.
     *
     * Responses from the search method are an EventEmitter where you will get a
     * notification for each searchEntry that comes back from the server. You will
     * additionally be able to listen for a searchReference, error and end event.
     * Note that the error event will only be for client/TCP errors, not LDAP error
     * codes like the other APIs. You'll want to check the LDAP status code (likely
     * for 0) on the end event to assert success. LDAP search results can give you a
     * lot of status codes, such as time or size exceeded, busy, inappropriate
     * matching, etc., which is why this method doesn't try to wrap up the code
     * matching.
     *
     * @param {String} base the DN in the tree to start searching at.
     * @param {Control} controls (optional) either a Control or [Control].
     * @param {Function} callback of the form f(err, res).
     * @throws {TypeError} on invalid input.
     */
    search(base: string, options: Client.SearchOptions, callback: (err?: any, res?: EventEmitter) => any): any;
    search(base: string, options: Client.SearchOptions, controls: Control | Control[], callback: (err?: any, res?: EventEmitter) => any): any;

    /**
     * Unbinds this client from the LDAP server.
     *
     * Note that unbind does not have a response, so this callback is actually
     * optional; either way, the client is disconnected.
     *
     * @param {Function} callback of the form f(err).
     * @throws {TypeError} if you pass in callback as not a function.
     */
    unbind(callback?: (err?: any) => any): any;

    /**
     * Attempt to secure connection with StartTLS.
     */
    starttls(options: TlsOptions, callback: (err?: any) => any): any;
    starttls(options: TlsOptions, controls: Control | Control[], callback: (err?: any) => any): any;

    /**
     * Initiate LDAP connection.
     */
    connect(): any;

    /**
     * Disconnect from the LDAP server and do not allow reconnection.
     *
     * If the client is instantiated with proper reconnection options, it's
     * possible to initiate new requests after a call to unbind since the client
     * will attempt to reconnect in order to fulfill the request.
     *
     * Calling destroy will prevent any further reconnection from occurring.
     *
     * @param {Object} err (Optional) error that was cause of client destruction
     */
    destroy(err: any): any;
}

export = Client;
}
declare module 'ldapjs/lib/client/client' {
import main = require('~ldapjs/lib/client/client');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/client/index.d.ts
declare module '~ldapjs/lib/client/index' {

import Client = require('~ldapjs/lib/client/client');
export {Client}

export function createClient(options: Client.ClientOptions): Client;
}
declare module 'ldapjs/lib/client/index' {
export * from '~ldapjs/lib/client/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/server.d.ts
declare module '~ldapjs/lib/server' {

import {
    SearchRequest,
    SearchResponse
} from '~ldapjs/lib/messages/index';

namespace Server {

    export interface ServerOptions {

        /**
         * You can optionally pass in a bunyan instance the client will use to acquire a logger.
         */
        log?: any;

        /**
         * A PEM-encoded X.509 certificate; will cause this server to run in TLS mode.
         */
        certificate?: any;

        /**
         * A PEM-encoded private key that corresponds to certificate for SSL.
         */
        key?: any;
    }

    export interface NextFunction {
        (err?: any): void;
    }
}

class Server {
    /**
     * Set this property to reject connections when the server's connection count gets high.
     */
    maxConnections: number;

    /**
     * The number of concurrent connections on the server. (getter only)
     */
    connections: number;

    /**
     * Returns the fully qualified URL this server is listening on. For example:
     * ldaps://10.1.2.3:1636. If you haven't yet called listen, it will always return
     * ldap://localhost:389.
     */
    url: string;

    constructor(options: Server.ServerOptions);

    /**
     * Begin accepting connections on the specified port and host. If the host is
     * omitted, the server will accept connections directed to any IPv4 address
     * (INADDR_ANY). This function is asynchronous. The last parameter callback will
     * be called when the server has been bound.
     */
    listen(port: number, callback?: Function): void;
    listen(port: number, host: string, callback?: Function): void;

    /**
     * Start a UNIX socket server listening for connections on the given path. This
     * function is asynchronous. The last parameter callback will be called when the
     * server has been bound.
     */
    listen(path: string, callback?: Function): void;

    /**
     * Start a server listening for connections on the given file descriptor. This
     * file descriptor must have already had the bind(2) and listen(2) system calls
     * invoked on it. Additionally, it must be set non-blocking; try fcntl(fd,
     * F_SETFL, O_NONBLOCK).
     */
    listenFD(fd: any): void;

    bind(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    add(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    add(dn: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    search(dn: string, handler: (req: SearchRequest, res: SearchResponse, next: Server.NextFunction) => any): this;
    search(dn: string, handlers: { (req: SearchRequest, res: SearchResponse, next: Server.NextFunction): any }[], 
    				   handler: (req: SearchRequest, res: SearchResponse, next: Server.NextFunction) => any): this;
    modify(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    modify(dn: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				   handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    del(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    del(dn: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    compare(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    compare(dn: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				    handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    modifyDN(dn: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    modifyDN(dn: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				   	 handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    exop(oid: string, handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    exop(oid: string, handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    				  handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    unbind(handler: (req: any, res: any, next: Server.NextFunction) => any): this;
    unbind(handlers: { (req: any, res: any, next: Server.NextFunction): any }[],
    	   handler: (req: any, res: any, next: Server.NextFunction) => any): this;
}

export = Server;
}
declare module 'ldapjs/lib/server' {
import main = require('~ldapjs/lib/server');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/dn.d.ts
declare module '~ldapjs/lib/dn' {

export interface RDNAttribute {
    name: string;
    order: number;
    value: string;
}

export class RDN {
    attrs: { [attribute: string]: RDNAttribute };
    constructor(obj: Object);
}

/**
 * Preservation Options use data recorded during parsing to preserve details of the
 * original DN
 */
export interface FormatPreservationOptions {

    /**
     * Order of multi-value RDNs.
     */
    keepOrder?: boolean;

    /**
     * RDN values which were quoted will remain so.
     */
    keepQuote?: boolean;

    /**
     * Leading/trailing spaces will be output.
     */
    keepSpace?: boolean;

    /**
     * Parsed attribute name will be output instead of lowercased version.
     */
    keepCase?: boolean;
}

/**
 * Modification options alter string formatting defaults
 */
export interface FormatModificationOptions {

    /**
     * RDN names will be uppercased instead of lowercased.
     */
    upperName?: boolean;

    /**
     * Disable trailing space after RDN separators
     */
    skipSpace?: boolean;
}

export interface FormatOptions extends FormatPreservationOptions, FormatModificationOptions { }

/**
 * The DN object is largely what you'll be interacting with, since all the server
 * APIs are setup to give you a DN object.
 */
export class DN {

    rdns: RDN[];

    constructor(rdns: Object);
    /**
     * Returns a boolean indicating whether 'this' is a child of the passed in dn.
     * The dn argument can be either a string or a DN.
     */
    childOf(dn: string | DN): boolean;

    parentOf(dn: string | DN): boolean;

    equals(dn: string | DN): boolean;

    parent(): DN;

    /**
     * Convert a DN object to string according to specified formatting options. These
     * options are divided into two types. Preservation Options use data recorded
     * during parsing to preserve details of the original DN. Modification options
     * alter string formatting defaults. Preservation options always take precedence
     * over Modification Options.
     */
    format(options: FormatOptions): string;

    /**
     * Sets the default options for string formatting when toString is called. It
     * accepts the same parameters as format.
     */
    setFormat(options: FormatOptions): void;

    /**
     * Returns the string representation of this.
     */
    toString(): string;
}

/**
 * The parseDN API converts a string representation of a DN into an ldapjs DN object;
 * in most cases this will be handled for you under the covers of the ldapjs
 * framework, but if you need it, it's there.
 */
export function parse(name: string): DN;
}
declare module 'ldapjs/lib/dn' {
export * from '~ldapjs/lib/dn';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/url.d.ts
declare module '~ldapjs/lib/url' {

import {Url} from 'url';

export function parse(urlStr: string, parseDN: boolean): Url;
}
declare module 'ldapjs/lib/url' {
export * from '~ldapjs/lib/url';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/filter.d.ts
declare module '~ldapjs/lib/filters/filter' {

export interface Filter {
    toBer(ber: any): any;
    matches(value: any): boolean;
}

export function isFilter(filter: any): filter is Filter;
}
declare module 'ldapjs/lib/filters/filter' {
export * from '~ldapjs/lib/filters/filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/and_filter.d.ts
declare module '~ldapjs/lib/filters/and_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface AndFilterOptions {
    filters: Filter[];
}

/**
 * The and filter is a complex filter that simply contains "child" filters. The
 * object will have a filters property which is an array of Filter objects. The name
 * property will be and.
 */
export class AndFilter implements Filter {
    name: 'and';
    filters: Filter[];
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: AndFilterOptions);
}
}
declare module 'ldapjs/lib/filters/and_filter' {
export * from '~ldapjs/lib/filters/and_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/approx_filter.d.ts
declare module '~ldapjs/lib/filters/approx_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface ApproximateFilterOptions {
    attribute: string;
    value: string;
}

/**
 * The approximate filter is used to check "approximate" matching of attribute/value
 * assertions. This object will have an attribute and value property, and the name
 * proerty will be approx. As a side point, this is a useless filter. It's really
 * only here if you have some whacky client that's sending this. It just does an
 * exact match (which is what ActiveDirectory does too). The string syntax for an
 * equality filter is (attr~=value).
 */
export class ApproximateFilter implements Filter {
    name: 'not';
    attribute: string;
    value: string;
    constructor(options: ApproximateFilterOptions);
    toBer(ber: any): any;
    /**
     * The matches() method will return true IFF the passed in object has a key
     * matching attribute and a value exactly matching value.
     */
    matches(value: any): boolean;
}
}
declare module 'ldapjs/lib/filters/approx_filter' {
export * from '~ldapjs/lib/filters/approx_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/equality_filter.d.ts
declare module '~ldapjs/lib/filters/equality_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface EqualityFilterOptions {
    attribute: string;
    value: string;
}

/**
 * The equality filter is used to check exact matching of attribute/value assertions.
 * This object will have an attribute and value property, and the name proerty will
 * be equal. The string syntax for an equality filter is (attr=value). The matches()
 * method will return true IFF the passed in object has a key matching attribute and
 * a value matching value.
 *
 * Equality matching uses "strict" type JavaScript comparison, and by default
 * everything in ldapjs (and LDAP) is a UTF-8 string. If you want comparison of
 * numbers, or something else, you'll need to use a middleware interceptor that
 * transforms values of objects.
 */
export class EqualityFilter implements Filter {
    name: 'equal';
    attribute: string;
    value: string;
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: EqualityFilterOptions);
}
}
declare module 'ldapjs/lib/filters/equality_filter' {
export * from '~ldapjs/lib/filters/equality_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/ext_filter.d.ts
declare module '~ldapjs/lib/filters/ext_filter' {

export interface ExtensibleFilterOptions { }

/**
 * THIS IS A STUB!
 *
 * ldapjs does not support server side extensible matching. This
 * class exists only for the client to send them.
 */
export class ExtensibleFilter {
    constructor(options: ExtensibleFilterOptions);
}
}
declare module 'ldapjs/lib/filters/ext_filter' {
export * from '~ldapjs/lib/filters/ext_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/ge_filter.d.ts
declare module '~ldapjs/lib/filters/ge_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface GreaterThanEqualsFilterOptions {
    attribute: string;
    value: string;
}

/**
 * The ge filter is used to do comparisons and ordering based on the value type. As
 * mentioned elsewhere, by default everything in LDAP and ldapjs is a string, so this
 * filter's matches() would be using lexicographical ordering of strings. If you
 * wanted >= semantics over numeric values, you would need to add some middleware to
 * convert values before comparison (and the value of the filter). Note that the
 * ldapjs schema middleware will do this. The GreaterThanEqualsFilter will have an
 * attribute property, a value property and the name property will be ge.
 */
export class GreaterThanEqualsFilter implements Filter {
    name: 'gt';
    attribute: string;
    value: string;
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: GreaterThanEqualsFilterOptions);
}
}
declare module 'ldapjs/lib/filters/ge_filter' {
export * from '~ldapjs/lib/filters/ge_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/le_filter.d.ts
declare module '~ldapjs/lib/filters/le_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface LessThanEqualsFilterOptions {
    attribute: string;
    value: string;
}

/**
 * The le filter is used to do comparisons and ordering based on the value type. As
 * mentioned elsewhere, by default everything in LDAP and ldapjs is a string, so this
 * filter's matches() would be using lexicographical ordering of strings. If you
 * wanted <= semantics over numeric values, you would need to add some middleware to
 * convert values before comparison (and the value of the filter). Note that the
 * ldapjs schema middleware will do this.
 */
export class LessThanEqualsFilter implements Filter {
    name: 'le';
    attribute: string;
    value: string;
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: LessThanEqualsFilterOptions);
}
}
declare module 'ldapjs/lib/filters/le_filter' {
export * from '~ldapjs/lib/filters/le_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/not_filter.d.ts
declare module '~ldapjs/lib/filters/not_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface NotFilterOptions {
    filters: Filter[];
}

/**
 * The not filter is a complex filter that contains a single "child" filter. The
 * object will have a filter property which is an instance of a Filter object. The
 * name property will be not.
 */
export class NotFilter implements Filter {
    name: 'not';
    filters: Filter[];
    constructor(options: NotFilterOptions);
    toBer(ber: any): any;
    /**
     * The matches() method will return true IFF the passed in object does not match
     * the filter in the filter property.
     */
    matches(value: any): boolean;
}
}
declare module 'ldapjs/lib/filters/not_filter' {
export * from '~ldapjs/lib/filters/not_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/or_filter.d.ts
declare module '~ldapjs/lib/filters/or_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface OrFilterOptions {
    filters: Filter[];
}

/**
 * The or filter is a complex filter that simply contains "child" filters. The object
 * will have a filters property which is an array of Filter objects. The name
 * property will be or.
 */
export class OrFilter implements Filter {
    name: 'or';
    filters: Filter[];
    constructor(options: OrFilterOptions);
    toBer(ber: any): any;
    /**
     * The matches() method will return true IFF the passed in object matches any of
     * the filters in the filters array.
     */
    matches(value: any): boolean;
}
}
declare module 'ldapjs/lib/filters/or_filter' {
export * from '~ldapjs/lib/filters/or_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/presence_filter.d.ts
declare module '~ldapjs/lib/filters/presence_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface PresenceFilterOptions {
    attribute: string;
}

/**
 * The presence filter is used to check if an object has an attribute at all, with
 * any value. This object will have an attribute property, and the name property will
 * be present. The string syntax for a presence filter is (attr=*). The matches()
 * method will return true IFF the passed in object has a key matching attribute.
 */
export class PresenceFilter implements Filter {
    name: 'present';
    attribute: string;
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: PresenceFilterOptions);
}
}
declare module 'ldapjs/lib/filters/presence_filter' {
export * from '~ldapjs/lib/filters/presence_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/substring_filter.d.ts
declare module '~ldapjs/lib/filters/substring_filter' {

import {Filter} from '~ldapjs/lib/filters/filter';

export interface SubstringFilterOptions {
    attribute: string;
    initial?: string;
    any?: string[];
    final?: string;
}

/**
 * The substring filter is used to do wildcard matching of a string value. This
 * object will have an attribute property and then it will have an initial property,
 * which is the prefix match, an any which will be an array of strings that are to be
 * found somewhere in the target string, and a final property, which will be the
 * suffix match of the string. any and final are both optional. The name property
 * will be substring.
 */
export class SubstringFilter implements Filter {
    toBer(ber: any): any;
    matches(value: any): boolean;
    constructor(options: SubstringFilterOptions);
}
}
declare module 'ldapjs/lib/filters/substring_filter' {
export * from '~ldapjs/lib/filters/substring_filter';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/filters/index.d.ts
declare module '~ldapjs/lib/filters/index' {

import { Filter } from '~ldapjs/lib/filters/filter';

/**
 * Parses an RFC2254 filter string into an ldapjs object(s). If the filter is
 * "complex", it will be a "tree" of objects.
 */
export function parseString(str: string): Filter;

export function parse(ber: any): Filter;

export * from '~ldapjs/lib/filters/and_filter';
export * from '~ldapjs/lib/filters/approx_filter';
export * from '~ldapjs/lib/filters/equality_filter';
export * from '~ldapjs/lib/filters/ext_filter';
export * from '~ldapjs/lib/filters/filter';
export * from '~ldapjs/lib/filters/ge_filter';
export * from '~ldapjs/lib/filters/le_filter';
export * from '~ldapjs/lib/filters/not_filter';
export * from '~ldapjs/lib/filters/or_filter';
export * from '~ldapjs/lib/filters/presence_filter';
export * from '~ldapjs/lib/filters/substring_filter';
}
declare module 'ldapjs/lib/filters/index' {
export * from '~ldapjs/lib/filters/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/attribute.d.ts
declare module '~ldapjs/lib/attribute' {

class Attribute {
    constructor(options: Object);
}

export = Attribute;
}
declare module 'ldapjs/lib/attribute' {
import main = require('~ldapjs/lib/attribute');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/change.d.ts
declare module '~ldapjs/lib/change' {

class Change {
    constructor(options: Object);
}

export = Change;
}
declare module 'ldapjs/lib/change' {
import main = require('~ldapjs/lib/change');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/controls/control.d.ts
declare module '~ldapjs/lib/controls/control' {

class Control {
    type: string;
    criticality: boolean;
    value: string;
    constructor(options: any);
}

export = Control;
}
declare module 'ldapjs/lib/controls/control' {
import main = require('~ldapjs/lib/controls/control');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/controls/index.d.ts
declare module '~ldapjs/lib/controls/index' {

import Control = require('~ldapjs/lib/controls/control');
export {Control};

export function getControl(ber: any): Control;

export class EntryChangeNotificationControl extends Control { }
export class PagedResultsControl extends Control { }
export class PersistentSearchControl extends Control { }
export class ServerSideSortingRequestControl extends Control { }
export class ServerSideSortingResponseControl extends Control { }
}
declare module 'ldapjs/lib/controls/index' {
export * from '~ldapjs/lib/controls/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/message.d.ts
declare module '~ldapjs/lib/messages/message' {

import {Socket} from 'net';
import {Control} from '~ldapjs/lib/controls/index';
import {DN} from '~ldapjs/lib/dn';

class LDAPMessage {

    /**
     * All request objects have the dn getter on it, which is "context-sensitive" and
     * returns the point in the tree that the operation wants to operate on. The LDAP
     * protocol itself sadly doesn't define operations this way, and has a unique
     * name for just about every op. So, ldapjs calls it dn. The DN object itself is
     * documented at DN.
     */
    dn: DN;

    /**
     * The most important property to pay attention to is the bindDN property which
     * will be an instance of an ldap.DN object. This is what the client
     * authenticated as on this connection. If the client didn't bind, then a DN
     * object will be there defaulted to cn=anonymous.
     */
    bindDN: DN;

    /**
     * All requests have an optional array of Control objects. Control will have the
     * properties type (string), criticality (boolean), and optionally, a string
     * value.
     */
    controls: Control[];

    /**
     * The most important property to pay attention to is the bindDN property which
     * will be an instance of an ldap.DN object. This is what the client
     * authenticated as on this connection. If the client didn't bind, then a DN
     * object will be there defaulted to cn=anonymous.
     */
    logId: any;

    type: string;

    /**
     * All request objects will have a connection object, which is the net.Socket
     * associated to this request. Off the connection object is an ldap object.
     */
    connection: Socket;

    toString(): string;
    parse(ber: any): boolean;
    toBer(): any;
}

export = LDAPMessage;
}
declare module 'ldapjs/lib/messages/message' {
import main = require('~ldapjs/lib/messages/message');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/result.d.ts
declare module '~ldapjs/lib/messages/result' {

import LDAPMessage = require('~ldapjs/lib/messages/message');

class LDAPResult extends LDAPMessage {
    status: number;
    /**
     * All response objects will have an end method on them. By default, calling
     * res.end() with no arguments will return SUCCESS (0x00) to the client (with the
     * exception of compare which will return COMPARE_TRUE (0x06)). You can pass in a
     * status code to the end() method to return an alternate status code.
     */
    end(): void;
}

export = LDAPResult;
}
declare module 'ldapjs/lib/messages/result' {
import main = require('~ldapjs/lib/messages/result');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/search_request.d.ts
declare module '~ldapjs/lib/messages/search_request' {

import LDAPMessage = require('~ldapjs/lib/messages/message');
import {DN} from '~ldapjs/lib/dn';
import {Filter} from '~ldapjs/lib/filters/index';

class SearchRequest extends LDAPMessage {

    /**
     * The DN the client is attempting to start the search at (equivalent to dn).
     */
    baseObject: DN;

    scope: 'base' | 'one' | 'sub';

    /**
     * An integer (defined in the LDAP protocol). Defaults to '0' (meaning never
     * deref).
     */
    derefAliases: number;

    /**
     * The number of entries to return. Defaults to '0' (unlimited). ldapjs doesn't
     * currently automatically enforce this, but probably will at some point.
     */
    sizeLimit: number;

    /**
     * Maximum amount of time the server should take in sending search entries. Defaults to '0' (unlimited).
     */
    timeLimit: number;

    /**
     * Whether to return only the names of attributes, and not the values. Defaults
     * to 'false'. ldapjs will take care of this for you.
     */
    typesOnly: boolean;

    /**
     * The filter object that the client requested. Notably this has a matches()
     * method on it that you can leverage. For an example of introspecting a filter,
     * take a look at the ldapjs-riak source.
     */
    filter: Filter;

    /**
     * An optional list of attributes to restrict the returned result sets to. ldapjs
     * will automatically handle this for you.
     */
    attributes: string[];
}

export = SearchRequest;
}
declare module 'ldapjs/lib/messages/search_request' {
import main = require('~ldapjs/lib/messages/search_request');
export = main;
}

// Generated not by typings
declare module '~ldapjs/lib/messages/compare_request' {

import LDAPMessage = require('~ldapjs/lib/messages/message');
import {DN} from '~ldapjs/lib/dn';

class CompareRequest extends LDAPMessage {

    /**
     * The DN the client is attempting to compare (this is the same as the dn property).
     */
    entry: DN;

    /**
     * The string name of the attribute to compare values of.
     */
	attribute: string;

	/**
     * The string value of the attribute to compare.
     */
	value: string;
}

export = CompareRequest;
}
declare module 'ldapjs/lib/messages/compare_request' {
import main = require('~ldapjs/lib/messages/compare_request');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/search_entry.d.ts
declare module '~ldapjs/lib/messages/search_entry' {

import LDAPMessage = require('~ldapjs/lib/messages/message');

class SearchEntry extends LDAPMessage {
    type: 'SearchEntry';
    object: { [attribute: string]: any };
    raw: any;
    objectName: string;
    constructor(options: Object);
}

export = SearchEntry;
}
declare module 'ldapjs/lib/messages/search_entry' {
import main = require('~ldapjs/lib/messages/search_entry');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/search_response.d.ts
declare module '~ldapjs/lib/messages/search_response' {

import LDAPResult = require('~ldapjs/lib/messages/result');

class SearchResponse extends LDAPResult {

    /**
     * Allows you to send a SearchEntry object. You do not need to explicitly pass in
     * a SearchEntry object, and can instead just send a plain JavaScript object that
     * matches the format used from AddRequest.toObject().
     */
    send(entry: Object): void;
}

export = SearchResponse;
}
declare module 'ldapjs/lib/messages/search_response' {
import main = require('~ldapjs/lib/messages/search_response');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/messages/index.d.ts
declare module '~ldapjs/lib/messages/index' {

import LDAPMessage = require('~ldapjs/lib/messages/message');
import LDAPResult = require('~ldapjs/lib/messages/result');
// import Parser = require('./parser');
// import AbandonRequest = require('./abandon_request');
// import AbandonResponse = require('./abandon_response');
// import AddRequest = require('./add_request');
// import AddResponse = require('./add_response');
// import BindRequest = require('./bind_request');
// import BindResponse = require('./bind_response');
import CompareRequest = require('~ldapjs/lib/messages/compare_request');
// import CompareResponse = require('./compare_response');
// import DeleteRequest = require('./delete_request');
// import DeleteResponse = require('./delete_response');
// import ExtendedRequest = require('./extended_request');
// import ExtendedResponse = require('./extended_response');
// import ModifyRequest = require('./modify_request');
// import ModifyResponse = require('./modify_response');
// import ModifyDNRequest = require('./modify_dnrequest');
// import ModifyDNResponse = require('./modify_dnresponse');
import SearchRequest = require('~ldapjs/lib/messages/search_request');
import SearchEntry = require('~ldapjs/lib/messages/search_entry');
// import SearchReference = require('./search_reference');
import SearchResponse = require('~ldapjs/lib/messages/search_response');
// import UnbindRequest = require('./unbind_request');
// import UnbindResponse = require('./unbind_response');

export {
    LDAPMessage,
    // UnbindResponse,
    LDAPResult,
    // UnbindRequest,
    // Parser,
    SearchResponse,
    // AbandonRequest,
    // SearchReference,
    // AbandonResponse,
    SearchEntry,
    // AddRequest,
    SearchRequest,
    // AddResponse,
    // ModifyDNResponse,
    // BindRequest,
    // ModifyDNRequest,
    // BindResponse,
    // ModifyResponse,
    CompareRequest,
    // ModifyRequest,
    // CompareResponse,
    // ExtendedResponse,
    // DeleteRequest,
    // ExtendedRequest,
    // DeleteResponse
}
}
declare module 'ldapjs/lib/messages/index' {
export * from '~ldapjs/lib/messages/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/errors/codes.d.ts
declare module '~ldapjs/lib/errors/codes' {

export const LDAP_SUCCESS: number;
export const LDAP_OPERATIONS_ERROR: number;
export const LDAP_PROTOCOL_ERROR: number;
export const LDAP_TIME_LIMIT_EXCEEDED: number;
export const LDAP_SIZE_LIMIT_EXCEEDED: number;
export const LDAP_COMPARE_FALSE: number;
export const LDAP_COMPARE_TRUE: number;
export const LDAP_AUTH_METHOD_NOT_SUPPORTED: number;
export const LDAP_STRONG_AUTH_REQUIRED: number;
export const LDAP_REFERRAL: number;
export const LDAP_ADMIN_LIMIT_EXCEEDED: number;
export const LDAP_UNAVAILABLE_CRITICAL_EXTENSION: number;
export const LDAP_CONFIDENTIALITY_REQUIRED: number;
export const LDAP_SASL_BIND_IN_PROGRESS: number;
export const LDAP_NO_SUCH_ATTRIBUTE: number;
export const LDAP_UNDEFINED_ATTRIBUTE_TYPE: number;
export const LDAP_INAPPROPRIATE_MATCHING: number;
export const LDAP_CONSTRAINT_VIOLATION: number;
export const LDAP_ATTRIBUTE_OR_VALUE_EXISTS: number;
export const LDAP_INVALID_ATTRIBUTE_SYNTAX: number;
export const LDAP_NO_SUCH_OBJECT: number;
export const LDAP_ALIAS_PROBLEM: number;
export const LDAP_INVALID_DN_SYNTAX: number;
export const LDAP_ALIAS_DEREF_PROBLEM: number;
export const LDAP_INAPPROPRIATE_AUTHENTICATION: number;
export const LDAP_INVALID_CREDENTIALS: number;
export const LDAP_INSUFFICIENT_ACCESS_RIGHTS: number;
export const LDAP_BUSY: number;
export const LDAP_UNAVAILABLE: number;
export const LDAP_UNWILLING_TO_PERFORM: number;
export const LDAP_LOOP_DETECT: number;
export const LDAP_NAMING_VIOLATION: number;
export const LDAP_OBJECTCLASS_VIOLATION: number;
export const LDAP_NOT_ALLOWED_ON_NON_LEAF: number;
export const LDAP_NOT_ALLOWED_ON_RDN: number;
export const LDAP_ENTRY_ALREADY_EXISTS: number;
export const LDAP_OBJECTCLASS_MODS_PROHIBITED: number;
export const LDAP_AFFECTS_MULTIPLE_DSAS: number;
export const LDAP_OTHER: number;
export const LDAP_PROXIED_AUTHORIZATION_DENIED: number;
}
declare module 'ldapjs/lib/errors/codes' {
export * from '~ldapjs/lib/errors/codes';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/errors/index.d.ts
declare module '~ldapjs/lib/errors/index' {

import {LDAPResult} from '~ldapjs/lib/messages/index';

export * from '~ldapjs/lib/errors/codes';

export class LDAPError {
    code: number;
    name: string;
    message: string;
    dn: string;
    constructor(message: string, dn?: string, caller?: any);
}

export function getError(res: LDAPResult): LDAPError;

export class OperationsError extends LDAPError { }
export class ProtocolError extends LDAPError { }
export class TimeLimitExceededError extends LDAPError { }
export class SizeLimitExceededError extends LDAPError { }
export class CompareFalseError extends LDAPError { }
export class CompareTrueError extends LDAPError { }
export class AuthMethodNotSupportedError extends LDAPError { }
export class StrongAuthRequiredError extends LDAPError { }
export class ReferralError extends LDAPError { }
export class AdminLimitExceededError extends LDAPError { }
export class UnavailableCriticalExtensionError extends LDAPError { }
export class ConfidentialityRequiredError extends LDAPError { }
export class SaslBindInProgressError extends LDAPError { }
export class NoSuchAttributeError extends LDAPError { }
export class UndefinedAttributeTypeError extends LDAPError { }
export class InappropriateMatchingError extends LDAPError { }
export class ConstraintViolationError extends LDAPError { }
export class AttributeOrValueExistsError extends LDAPError { }
export class InvalidAttriubteSyntaxError extends LDAPError { }
export class NoSuchObjectError extends LDAPError { }
export class AliasProblemError extends LDAPError { }
export class InvalidDnSyntaxError extends LDAPError { }
export class AliasDerefProblemError extends LDAPError { }
export class InappropriateAuthenticationError extends LDAPError { }
export class InvalidCredentialsError extends LDAPError { }
export class InsufficientAccessRightsError extends LDAPError { }
export class BusyError extends LDAPError { }
export class UnavailableError extends LDAPError { }
export class UnwillingToPerformError extends LDAPError { }
export class LoopDetectError extends LDAPError { }
export class NamingViolationError extends LDAPError { }
export class ObjectclassViolationError extends LDAPError { }
export class NotAllowedOnNonLeafError extends LDAPError { }
export class NotAllowedOnRdnError extends LDAPError { }
export class EntryAlreadyExistsError extends LDAPError { }
export class ObjectclassModsProhibitedError extends LDAPError { }
export class AffectsMultipleDsasError extends LDAPError { }
export class OtherError extends LDAPError { }

// Custom application errors
export class ConnectionError extends LDAPError { }
export class AbandonedError extends LDAPError { }
export class TimeoutError extends LDAPError { }
}
declare module 'ldapjs/lib/errors/index' {
export * from '~ldapjs/lib/errors/index';
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-ldapjs/ed398e8dadce2dba719a9bc57e7879de82c17aa9/lib/index.d.ts
declare module '~ldapjs/lib/index' {

// Client
export {Client, createClient} from '~ldapjs/lib/client/index'

// Server
import Server = require('~ldapjs/lib/server');
export {Server};
export function createServer(options: Server.ServerOptions): Server;

// dn
import * as dn from '~ldapjs/lib/dn';
export {dn};
export {DN, RDN, parse as parseDN} from '~ldapjs/lib/dn';

// url
export {parse as parseURL} from '~ldapjs/lib/url';

// Filters
import * as filters from '~ldapjs/lib/filters/index';
export {filters};
export {
    Filter,
    parseString as parseFilter,
    AndFilter,
    ApproximateFilter,
    EqualityFilter,
    ExtensibleFilter,
    GreaterThanEqualsFilter,
    LessThanEqualsFilter,
    NotFilter,
    OrFilter,
    PresenceFilter,
    SubstringFilter
} from '~ldapjs/lib/filters/index'

// persistentSearch
// PersistentSearchCache

// Attribute
import Attribute = require('~ldapjs/lib/attribute');
export {Attribute};

// Change
import Change = require('~ldapjs/lib/change');
export {Change}

// Controls
export * from '~ldapjs/lib/controls/index'

// messages
export * from '~ldapjs/lib/messages/index'

// errors
export * from '~ldapjs/lib/errors/index'

// export * from './Protocol'
}
declare module 'ldapjs/lib/index' {
export * from '~ldapjs/lib/index';
}
declare module 'ldapjs' {
export * from '~ldapjs/lib/index';
}
