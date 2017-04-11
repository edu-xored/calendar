const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

export default function googleAuth(passport, router) {
  // TODO get from config
  const GOOGLE_CONSUMER_KEY = '';
  const GOOGLE_CONSUMER_SECRET = '';

  // Use the GoogleStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and Google profile), and
  //   invoke a callback with a user object.
  passport.use(new GoogleStrategy({
      consumerKey: GOOGLE_CONSUMER_KEY,
      consumerSecret: GOOGLE_CONSUMER_SECRET,
      // TODO get hostname from env
      callbackURL: "http://www.example.com/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {
      // FIXME find or create user
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  ));

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  router.get('/auth/google',
    passport.authenticate('google', {
      scope: 'https://www.google.com/m8/feeds'
    })
  );

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/');
    }
  );
}
