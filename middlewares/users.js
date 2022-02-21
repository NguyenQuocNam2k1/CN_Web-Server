const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UsersModel");


// middelware này dùng check xem tài khoản đăng ký đã tồn tại hay chưa
exports.checkRegister = async (req, res, next) => {
  const { email , username  } = req.body;
  UserModel.find({ $and: [{email} , {username}] })
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
      next();
    })
    .catch(err => {
      return res.json({
        status: "401",
        message: "User authenticate"
      })
    })
  } catch (error) {
    return res.json({
      status: "401",
      message: "User authenticate"
    })
  }
}