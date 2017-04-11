const LdapStrategy = require('passport-ldapauth');

export default function ldapAuth(passport, router) {
  // TODO make LDAP config
  var OPTS = {
    server: {
      url: 'ldap://localhost:389',
      bindDn: 'cn=root',
      bindCredentials: 'secret',
      searchBase: 'ou=passport-ldapauth',
      searchFilter: '(uid={{username}})'
    }
  };

  passport.use(new LdapStrategy(OPTS));
}
