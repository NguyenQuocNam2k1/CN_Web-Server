const { UserModel } = require("../models/UsersModel.js");
const jwt = require("jsonwebtoken");
var passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

const CLIENT_URL = "http://localhost:3000";

// passport.use(zzz
  // new LocalStrategy(function (username, password, done) {
    // UserModel.findOne({ $and: [{ username, password }] }, function (err, user) {
      // if (err) return done(err);
      // if (!user) return done(null, false);
      // return done(null, user);
    // });
  // })
// );

exports.logIn = async (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return res.status(500).json({
        status: "500",
        message: "Server Error",
      });
    }
    if (!user) {
      return res.status(401).json({
        status: "401",
        message: "Account information does not exist.",
      });
    }
    let token = jwt.sign(user.id, "CN_Web");
    return res.status(200).json({
      status: "200",
      message: "Singin Success",
      token: token,
      data: user,
    });
  })(req, res, next);
};

exports.Register = async (req, res) => {
  const newUser = req.body;
  UserModel.create(newUser)
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Register success.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Register failed.",
      });
    });
};
