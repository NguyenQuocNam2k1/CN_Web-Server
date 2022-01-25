const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { UserModel } = require("../models/UsersModel");




//LocalStrategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    UserModel.findOne({ $and: [{ username }, { password }] }, function (err, user) {
      console.log(user);
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  })
)



//FacebookStrategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "1109221356496076",
      clientSecret: "07af59b243b6d5ed6a0d767c53de5964",
      callbackURL:
        // "api/user/auth/facebook/callback",
        "https://5c86-117-7-155-144.ngrok.io/api/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    function (accessToken, refreshToken, profile, cb) {
      const username = profile._json.name;
      const password = profile._json.id;
      const image = profile._json.picture.data.url;
      UserModel.findOne(
        { username },
        { password },
        { image },
        function (err, user) {
          if (err) {
            return cb(err);
          }
          if (!user) {
            user = new UserModel({
              username,
              password,
              image,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return cb(err, profile);
            });
          } else {
            return cb(err, profile);
          }
        }
      );
    }
  )
);
module.exports = function (passport) {
};

// Session passport
passport.serializeUser(function (user, done) {
  console.log("Success");
  // console.log(req._passport.session.user);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("deserializeUser");
  console.log(user);
  done(null, user);
});
