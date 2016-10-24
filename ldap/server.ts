import * as ldap from 'ldapjs';

let SUFFIX: string = 'o=eduxored';
let db = {
  'cn=root, o=eduxored': {
    id: 'root_id',
    name: 'root_n',
    login: 'root',
    pwdhash: 'secret',
    role: 'root_r',
    position: 'root_pos',
    place: 'root_p',
  },
  'cn=nonroot, o=eduxored': {
    id: 'nonroot_id',
    name: 'nonroot_n',
    login: 'nonroot',
    pwdhash: 'nonroot_h',
    role: 'nonroot_r',
    position: 'nonroot_pos',
    place: 'nonroot_p',
  },
};
let server: ldap.Server = ldap.createServer(undefined);

function authorize(req: any, res: any, next: ldap.Server.NextFunction) {
  /* Any user may search after bind, only root has full power */
  let isSearch: boolean = (req instanceof ldap.SearchRequest);
  let isCompare: boolean = (req instanceof ldap.CompareRequest);
  if (!req.connection.ldap.bindDN.equals('cn=root') && !isSearch && !isCompare)
      return next(new ldap.InsufficientAccessRightsError('Insufficient access rights'));

  return next();
}

server.bind('cn=root', (req: any, res: any, next: ldap.Server.NextFunction) => {
  if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret') {
      return next(new ldap.InvalidCredentialsError('Invalid credentials'));
  }

  res.end();
  return next();
});

server.add(SUFFIX, [authorize], (req: any, res: any, next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (db[dn])
    return next(new ldap.EntryAlreadyExistsError(dn));

  db[dn] = req.toObject().attributes;
  res.end();
  return next();
});

server.bind(SUFFIX, (req: any, res: any, next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  if (!db[dn].userpassword)
    return next(new ldap.NoSuchAttributeError('userPassword'));

  if (db[dn].userpassword.indexOf(req.credentials) === -1)
    return next(new ldap.InvalidCredentialsError('Invalid credentials'));

  res.end();
  return next();
});

server.compare(SUFFIX, [authorize], (req: any, res: any, next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  if (!db[dn][req.attribute])
    return next(new ldap.NoSuchAttributeError(req.attribute));

  let matches: boolean = false;
  let vals = db[dn][req.attribute];
  if (vals === req.value) {
      matches = true;
  };

  res.end(matches);
  return next();
});

server.del(SUFFIX, [authorize], (req: any, res: any, next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  delete db[dn];

  res.end();
  return next();
});

server.modify(SUFFIX, [authorize], (req: any, res: any, next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (!req.changes.length)
    return next(new ldap.ProtocolError('changes required'));
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  let entry = db[dn];

  for (let i = 0; i < req.changes.length; i++) {
    let mod = req.changes[i].modification;
    switch (req.changes[i].operation) {
    case 'replace':
      if (!entry[mod.type])
        return next(new ldap.NoSuchAttributeError(mod.type));

      if (!mod.vals || !mod.vals.length) {
        delete entry[mod.type];
      } else {
        entry[mod.type] = mod.vals;
      }

      break;

    case 'add':
      if (!entry[mod.type]) {
        entry[mod.type] = mod.vals;
      } else {
        mod.vals.forEach((v) => {
          if (entry[mod.type].indexOf(v) === -1)
            entry[mod.type].push(v);
        });
      }

      break;

    case 'delete':
      if (!entry[mod.type])
        return next(new ldap.NoSuchAttributeError(mod.type));

      delete entry[mod.type];

      break;
    }
  }
  res.end();
  return next();
});

server.search(SUFFIX, [authorize], (req: ldap.SearchRequest,
                                    res: ldap.SearchResponse,
                                    next: ldap.Server.NextFunction) => {
  let dn: string = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  let scopeCheck: (k: any) => any;

  switch (req.scope) {
  case 'base':
    if (req.filter.matches(db[dn])) {
      res.send({
        dn: dn,
        attributes: db[dn]
      });
    } else {
      return next(new ldap.InappropriateMatchingError('Inappropriate match of attr'));
    }

    res.end();
    return next();

  case 'one':
    scopeCheck = (k) => {
      if (req.dn.equals(k))
        return true;

      let parent = ldap.parseDN(k).parent();
      return (parent ? parent.equals(req.dn) : false);
    };
    break;

  case 'sub':
    scopeCheck = (k) => {
      return (req.dn.equals(k) || req.dn.parentOf(k));
    };

    break;
  }

  Object.keys(db).forEach((key) => {
    if (!scopeCheck(key)) {
      return next(new ldap.InappropriateMatchingError('Inappropriate match of scope'));
    }
    if (req.filter.matches(db[key])) {
      res.send({
        dn: key,
        attributes: db[key]
      });
    } else {
      return next(new ldap.InappropriateMatchingError('Inappropriate match of attribute(s)'));
    }
  });

  res.end();
  return next();
});



///--- Fire it up

server.listen(1389, () => {
  console.log('LDAP server up at: %s', server.url);
});