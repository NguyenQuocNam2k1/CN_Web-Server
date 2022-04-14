const { UserModel } = require("../models/UsersModel.js");
const { coursesListModel } = require("../models/CoursesModel.js");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.logIn = async (req, res) => {
  const { email } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(200).json({
      status: "401",
      message: "Thông tin tài khoản không chính xác",
    });
  }
  const rs = await bcrypt.compareSync(req.body.password, user.password_hash);
  if (!rs) {
    return res.status(200).json({
      status: "401",
      message: "Thông tin tài khoản không chính xác",
    });
  }
  const token = `Bear ` + jwt.sign(user.email, "CN_Web");
  return res.status(200).json({
    status: "200",
    message: "Login success",
    token,
    data: user,
  });
};

exports.Register = (req, res) => {
  var password_hash = bcrypt.hashSync(req.body.password, 8);
  const image =
    "https://lh3.googleusercontent.com/a-/AOh14GiOr-lNotcC1s8dinThF-qEct8_pmvjtPvo8xXW=s400";
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    role: "0",
    password_hash,
    image,
    course_studied: [],
    lesson_course: [],
  };
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

exports.RegisterFirebase = (req, res) => {
  var password_hash = bcrypt.hashSync(req.body.uid, 8);
  const newUser = {
    username: req.body.displayName,
    email: req.body.email,
    role: "0",
    password_hash,
    image: req.body.photoURL,
    course_studied: [],
    lesson_course: [],
  };
  UserModel.create(newUser)
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Register success",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Sever error",
      });
    });
};

exports.addNewCourse = (req, res) => {
  const { idCourse, _id, idLesson, countUser } = req.body;
  UserModel.updateOne(
    { _id },
    {
      $push: {
        course_studied: idCourse,
        lesson_course: {
          idCourse,
          idLesson,
        },
      },
    }
  )
    .then((data) => {
      coursesListModel
        .findOneAndUpdate({ idCoursesList: idCourse }, { countUser: countUser })
        .then((data) => {
          UserModel.find({ _id }, function (err, user) {
            if (err)
              return res.status(500).json({
                status: "500",
                message: "Sever error",
              });
            res.status(200).json({
              data: user,
            });
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "500",
            message: "Sever error",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Sever error",
      });
    });
};

exports.updateCourse = (req, res) => {
  const { _id, newLessonCourse } = req.body;
  UserModel.findByIdAndUpdate(
    { _id },
    { lesson_course: newLessonCourse },
    { new: true },
    function (err, data) {
      if (err) return res.status(500).json("SERVER ERROR");
      res.status(200).json({
        statue: 200,
        data,
      });
    }
  );
};
