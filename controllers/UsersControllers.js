import { UserModel } from "../models/UsersModel.js";
import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName , password);

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

// middelware này dùng check xem tài khoản đăng ký đã tồn tại hay chưa
export const checkRegister = async (req, res, next) => {
  const { userName, password, email } = req.body;
  UserModel.find({ $and: [{ userName, password, email }] })
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

export const Register = async (req, res) => {
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
        message: "Register failed.",
      });
    });
};
