var passport = require("passport");
var LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UsersModel");


// middelware này dùng check xem tài khoản đăng ký đã tồn tại hay chưa
exports.checkRegister = async (req, res, next) => {
  const { email } = req.body;
  UserModel.find({ $and: [{ email }] })
    .then((data) => {
      if (data.length > 0) {
        return res.status(409).json({
          status: "409",
          message: "Account information already exists.",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      next();
    });
};


// middleware này dùng check xem tài khoản đã đăng nhập hay chưa
exports.checkLogin = async(req , res , next) => {
  try {
    const auth = jwt.verify(req.headers["token"] , "CN_Web");
    UserModel.findOne({auth})
    .then(data => {
      return res.status(200).json({
        status: "200",
        message:"Đã đăng nhập"
      })
    })
    .catch(err => {
      return res.status(401).json({
        status: "401",
        message: "Chưa đăng nhập"
      })
    })
  } catch (error) {
    return res.status(401).json({
      status: "401",
      message: "Chưa đăng nhập"
    })
  }
}