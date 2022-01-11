import { UserModel } from "../models/UsersModel.js";
import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  UserModel.findOne({ userName: userName, password: password })
    .then((data) => {
      if (data) {
        let token = jwt.sign({ _id: data._id }, "CN_Web");
        return res.status(200).json({
          message: "Success",
          token: token,
        });
      } else {
        return res.status(500).json("Can not find you accout!");
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const Register = async (req, res) => {
  const newUser = req.body;
  UserModel.create(newUser)
    .then((data) => {
      return res.status(200).json("Register success!");
    })
    .catch((err) => {
      return res.status(500).json({ Error: err });
    });
};
