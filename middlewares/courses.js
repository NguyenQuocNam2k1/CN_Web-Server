const {
  coursesModel,
  coursesListModel,
  lessonModel,
} = require("../models/CoursesModel.js");

// middleware này dùng check xem khóa học đã tồn tại hay chưa
exports.checkCourse = async (req, res, next) => {
  const { idCourses } = req.body;
  try {
    coursesModel.findOne({idCourses})
      .then((data) => {
        if (data) {
          return res.status(409).json({
            status: "409",
            message: "Course information already exists.",
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next();
      });
  } catch (error) {
    return next();
  }
};



exports.checkCourseList = async (req, res, next) => {
  const { idCoursesList } = req.body;
  try {
    coursesListModel.findOne({idCoursesList})
      .then((data) => {
        if (data) {
          return res.status(409).json({
            status: "409",
            message: "Course information already exists.",
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next();
      });
  } catch (error) {
    return next();
  }
};




exports.checkLesson = async (req, res, next) => {
  const { name } = req.body;
  try {
    lessonModel.findOne({name})
      .then((data) => {
        if (data) {
          return res.status(409).json({
            status: "409",
            message: "Video information already exists.",
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next();
      });
  } catch (error) {
    return next();
  }
};
