import * as _ from 'lodash';
import * as express from "express";
import * as ldap from '../ldap/auth';
import {makeResultHandler, makeErrorHandler} from './common';

const router = express.Router();

router.post('/login', (req, res) => {
  const resultHandler = makeResultHandler(res);
  const errorHandler = makeErrorHandler(req, res);
  ldap.login(req.body.login, req.body.pwd).then(resultHandler, errorHandler);
});

router.post('/logout', (req, res) => {
  const resultHandler = makeResultHandler(res);
  const errorHandler = makeErrorHandler(req, res);
  ldap.logout(req).then(resultHandler, errorHandler);
});

export default router;
