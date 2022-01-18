const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// LocalStrategy passport
passport.use(
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne(
      { $and: [{ userName: username, password }] },
      function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, user);
      }
    );
  })
);

//FacebookStrategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "1109221356496076",
      clientSecret: "07af59b243b6d5ed6a0d767c53de5964",
      callbackURL:
        "https://cn-web.herokuapp.com/api/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("Success");
      console.log(accessToken);
      return cb(null, profile);
    }
  )
);
