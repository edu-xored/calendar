import * as express from "express";
import * as ldap from '../ldap/auth';
import {makeResultHandler, makeErrorHandler} from './common';
import {findUserByLogin} from '../database';
import {User} from "../../lib/model";

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

// TODO get secret from config
const secret = 'super secret';

const router = express.Router();

function ldapHandler(req: express.Request, res: express.Response, username: string, password: string) {
  const errorHandler = makeErrorHandler(req, res);
  ldap.login(username, password).then(user => {
    // TODO register user in local db
    sendToken(user, res);
  }, errorHandler);
}

function sendToken(user: User, res: express.Response) {
  const token = jwt.sign({ user: { id: user.id, name: user.name } }, secret);
  res.json(token);
}

router.post('/login', (req, res) => {
  const errorHandler = makeErrorHandler(req, res);
  const username = req.body.username;
  const password = req.body.password;

  // try to find in local database first then in LDAP
  findUserByLogin(username).then(user => {
    if (!user) {
      ldapHandler(req, res, username, password);
      return;
    }

    if (!passwordHash.verify(password, user.pwdhash)) {
      res.sendStatus(403);
      return;
    }

    sendToken(user, res);
  }, errorHandler);
});

router.post('/logout', (req, res) => {
  const resultHandler = makeResultHandler(res);
  const errorHandler = makeErrorHandler(req, res);
  ldap.logout(req).then(resultHandler, errorHandler);
});

const jwtMiddleware = expressJWT({ secret });

export function authMiddleware(req: express.Request, res: express.Response, next: (err?: any) => void) {
  const path = (req.originalUrl || req.url).toLowerCase();
  if (path === '/api/login' || path === '/api/logout') {
    next();
    return;
  }

  // TODO local admin, check that client is from localhost
  const headers = req.headers as any;
  if (headers.authorization === '$local_admin') {
    next();
    return;
  }

  // TODO basic auth

  jwtMiddleware(req, res, next);
}

export default router;
