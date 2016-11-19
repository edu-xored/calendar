require('isomorphic-fetch');

import {User, Team, Calendar, Event} from '../lib/model';

export function fetchJSON<T>(path: string): Promise<T> {
  return window.fetch(path).then(res => res.json());
}

const BASE = '/api';

function base64(s: string): string {
  return (typeof Buffer !== "undefined") ? new Buffer(s).toString('base64') : btoa(s);
}

function basicAuth(username, password) {
  if (!username || !password) {
    return '';
  }
  const s = `${username}:${password}`;
  return 'Basic ' + base64(s);
}

function toJSON(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`http error: ${res.statusText}`);
}

function makeHeaders() {
  // TODO get token from storage
  return {
    // TODO Authorization: 'Bearer ' + token
  };
}

function makeAPI<T>(api) {
  const collectionPath = `${BASE}/${api.collection}`;
  const resourcePath = id => `${BASE}/${api.resource}/${id}`;
  return {
    create(payload: T): Promise<T> {
      return fetch(collectionPath, {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify(payload),
        headers: makeHeaders(),
      }).then(toJSON);
    },
    getList(): Promise<T[]>  {
      return fetch(collectionPath, {
        credentials: "same-origin",
        headers: makeHeaders(),
      }).then(toJSON);
    },
    get(id: string): Promise<T>  {
      return fetch(resourcePath(id), {
        credentials: "same-origin",
        headers: makeHeaders(),
      }).then(toJSON);
    },
    update(id: string, payload: T): Promise<T>  {
      return fetch(resourcePath(id), {
        credentials: "same-origin",
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: makeHeaders(),
      }).then(toJSON);
    },
    remove(id): Promise<any>  {
      return fetch(resourcePath(id), {
        credentials: "same-origin",
        method: 'DELETE',
        headers: makeHeaders(),
      }).then(toJSON);
    },
  };
}

export default {
  login: function(username, password) {
    return fetch(`${BASE}/login`, {
      credentials: "same-origin",
      method: 'POST',
      headers: {
        Authorization: basicAuth(username, password),
      },
      body: JSON.stringify({username, password}),
    }).then(toJSON);
  },
  // TODO not implemented yet
  me: function() {
    return fetch(`${BASE}/me`, {
      credentials: "same-origin",
      headers: makeHeaders(),
    }).then(toJSON);
  },
  users: makeAPI<User>({
    resource: 'user',
    collection: 'users',
  }),
  teams: makeAPI<Team>({
    resource: 'team',
    collection: 'teams',
  }),
  calendars: makeAPI<Calendar>({
    resource: 'calendar',
    collection: 'calendars',
  }),
  events: makeAPI<Event>({
    resource: 'event',
    collection: 'events',
  }),
};
