const { UserModel } = require("../models/UsersModel.js");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');



exports.logIn = async (req, res) => {
  const username = req.body;
  const user = await UserModel.findOne(username);
  if(!user) {
    return res.json({
      status: "401",
      message: "Incorrect account information"
    })
  }
  const rs = await bcrypt.compareSync(req.body.password , user.password_hash);
  if(!rs) {
    return res.json({
      status: "401",
      message: "Incorrect account information"
    })
  }
  const token = jwt.sign(user.email,'CN_Web');
  return res.status(200).json({
      status: "200",
      message: "Login success",
      token,
  })
};

exports.Register = async (req, res) => {
  var password_hash = bcrypt.hashSync(req.body.password, 8);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    role: "0",
    password_hash,
    image: req.body.username
  }
  UserModel.create(newUser)
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Register success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Sever error",
      });
    });
};


exports.RegisterFirebase = async (req, res) => {
  var password_hash = bcrypt.hashSync(req.body.uid, 8);
  const newUser = {
    username: req.body.displayName,
    email: req.body.email,
    role: "0",
    password_hash,
    image: req.body.photoURL,
  }
  UserModel.create(newUser)
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Register success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Sever error",
      });
    });
};
