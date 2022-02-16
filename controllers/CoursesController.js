const {
  coursesModel,
  coursesListModel,
  lessonModel,
} = require("../models/CoursesModel");

exports.createCourses = async (req, res) => {
  const newCourses = req.body;
  try {
    coursesModel
      .create(newCourses)
      .then((data) => {
        return res.status(200).json({
          status: "200",
          message: "Create course success",
          data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "500",
          message: "Create course failed",
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Server Error",
    });
  }
};

exports.addCoursesList = async (req, res) => {
  const newCourseList = req.body;
  try {
    coursesListModel
      .create(newCourseList)
      .then((data) => {
        return res.status(200).json({
          status: "200",
          message: "Create course success",
          data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "500",
          message: "Create course failed",
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Server Error",
    });
  }
};

exports.addLesson = async (req, res) => {
  const newLesson = req.body;
  try {
    lessonModel
      .create(newLesson)
      .then((data) => {
        return res.status(200).json({
          status: "200",
          message: "Add new video course success",
          data,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "500",
          message: "Add new video course failed",
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Server Error",
    });
  }
};

exports.getCourses = async (req, res) => {
  const idCourse = req.body._id;
  courseListModel
    .findOne({
      _id: idCourse,
    })
    .then((data) => {
      return res.status(200).json({
        dataCourser: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Can't found courser",
      });
    });
};


exports.getAllCourseList = async (req , res) =>{
  try {
    const dataCourseList = await coursesListModel.find().populate("course").exec();
    res.json({
      dataCourseList
    })
  } catch (error) {
    return res.json({
      status: "500",
      message:"Server Error"
    })
  }
}
