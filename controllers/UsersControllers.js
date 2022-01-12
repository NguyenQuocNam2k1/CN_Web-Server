const { UserModel } = require("../models/UsersModel.js");
const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  UserModel.findOne({ userName: userName, password: password })
    .then((data) => {
      if (data) {
        let token = jwt.sign({ _id: data._id }, "CN_Web");
        return res.status(200).json({
          status: "200",
          message: "Singin Success",
          token: token,
        });
      } else {
        return res.status(500).json({
          status: "500",
          message: "Account information does not exist.",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Account information does not exist.",
      });
    });
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
        status:"500",
        message: "Register failed.",
      });
    });
};
