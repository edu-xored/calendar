import {User, Team, Calendar, Event} from '../lib/model';

const BASE = '/api';
const TOKEN_KEY = 'access_token';
const CONTENT_JSON = 'application/json';

export function fetchJSON<T>(path: string): Promise<T> {
  return window.fetch(path).then<T>(res => res.json());
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(value: string) {
  localStorage.setItem(TOKEN_KEY, value);
}

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

function toJSON<T>(res): Promise<T> {
  if (res.ok) {
    return res.json() as any;
  }
  throw new Error(`http error: ${res.statusText}`);
}

function makeHeaders() {
  const token = getToken();
  return {
    Authorization: token ? 'Bearer ' + token : undefined,
    'Content-Type': CONTENT_JSON
  };
}

function makeAPI<T, E>(api, ext?: E) {
  const collectionPath = `${BASE}/${api.collection}`;
  const resourcePath = id => `${BASE}/${api.resource}/${id}`;
  return Object.assign({
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
      }).then(res => {
        if (res.status == 200) {
          return true;
        }
        throw new Error(`http error: ${res.statusText}`);
      });
    },
  }, ext);
}

const teamAPI = makeAPI<Team, {}>({
  resource: 'team',
  collection: 'teams',
}, {
  getMembers(teamId: string): Promise<User[]> {
    const url = `${BASE}/teams/${teamId}/members`;
    return fetch(url, {
      credentials: "same-origin",
      headers: makeHeaders(),
    }).then<User[]>(toJSON);
  }
});

export default {
  login: function(username, password): Promise<string> {
    return fetch(`${BASE}/login`, {
      credentials: "same-origin",
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_JSON,
      },
      body: JSON.stringify({username, password}),
    }).then<string>(toJSON)
      .then(token => {
        setToken(token);
        return token;
      });
  },
  me: function(): Promise<User> {
    return fetch(`${BASE}/me`, {
      credentials: "same-origin",
      headers: makeHeaders(),
    }).then(toJSON);
  },
  users: makeAPI<User, {}>({
    resource: 'user',
    collection: 'users',
  }),
  teams: teamAPI,
  calendars: makeAPI<Calendar, {}>({
    resource: 'calendar',
    collection: 'calendars',
  }),
  events: makeAPI<Event, {}>({
    resource: 'event',
    collection: 'events',
  }),
};
