const { UserModel } = require("../models/UsersModel.js");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');



exports.logIn = async (req, res) => {
  const username = req.body;
  let user = await UserModel.findOne(username);
  if(!user) {
    return res.status(401).json({
      status: "401",
      message: "Thông tin tài khoản không chính xác"
    })
  }
  const rs = await bcrypt.compareSync(req.body.password , user.password_hash);
  if(!rs) {
    return res.status(401).json({
      status: "401",
      message: "Thông tin tài khoản không chính xác"
    })
  }
  const token = `Bear `+ jwt.sign(user.email,'CN_Web');
  return res.status(200).json({
      status: "200",
      message: "Login success",
      token,
      data: user,
  })
};

exports.Register = async (req, res) => {
  var password_hash = bcrypt.hashSync(req.body.password, 8);
  const image = "https://lh3.googleusercontent.com/a-/AOh14GiOr-lNotcC1s8dinThF-qEct8_pmvjtPvo8xXW=s400"
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    role: "0",
    password_hash,
    image
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
        data
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Sever error",
      });
    });
};
