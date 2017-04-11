import * as express from "express";

const passport = require('passport');

const router = express.Router();

// TODO pluggable auth strategies, inject if enabled
require('./ldap')(passport, router);
require('./google')(passport, router);
// TODO custom strategy as fallback

export default router;
