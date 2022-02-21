var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());


//FacebookStrategy
passport.use(
    new FacebookStrategy(
      {
        clientID: "1109221356496076",
        clientSecret: "07af59b243b6d5ed6a0d767c53de5964",
        callbackURL:
          "https://44ac-14-231-23-188.ngrok.io/api/user/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
  
  
  
  
  
  // Session passport
  passport.serializeUser(function (user, done) {
    console.log("serializeUseruser", user);
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
};