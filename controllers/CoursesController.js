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
        data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "500",
        message: "Can't found courser",
      });
    });
};


// Get DB Course
exports.getAllCourseList = async (req , res) =>{
  try {
    const dataCourseList = await coursesListModel.find().populate("course").exec();
    res.json({
      status: "200",
      data: dataCourseList
    })
  } catch (error) {
    return res.json({
      status: "500",
      message:"Server Error"
    })
  }
}

exports.getAllLesson = async (req , res) => {
  try {
    const dataLessons = await lessonModel.find().populate('listCourse').exec();
    res.json({
      status: "200",
      data: dataLessons
    })
  } catch (error) {
    return res.json({
      status: "500",
      message:"Server Error"
    })
  }
}

exports.getLessonByCourse = async (req , res) => {
  const {listCourse} = req.body;
  try {
    const data = await lessonModel.find({listCourse});
    res.json({
      status: "200",
      data
    })
  } catch (error) {
    return res.json({
      status: "500",
      message:"Server Error"
    })
  }
}

exports.getCoursesByRouter = async (req , res) => {
  const {typeCourse} = req.body;
  if(!typeCourse){
    return res.json({
      status: "500",
      message:"Not found typeCourse"
    })
  }
  try {
    const data = await coursesListModel.find({typeCourse});
    res.json({
      status: "200",
      typeCourse,
      data,
    })
  } catch (error) {
    return res.json({
      status: "500",
      message:"Server Error"
    })
  }
}


// update DB
exports.countUserView = async (req , res) => {
  const idCourseList = req.body.id;
  const dbUpdate = {countUser : req.body.countUser};
  try {
    const coutUser = await coursesListModel.findByIdAndUpdate(idCourseList , dbUpdate ,{new: true});
    res.json({
      status: "200",
      message: "Success",
      data:coutUser
    })
  } catch (error) {
    return res.json({
      status:"500",
      message: "Server Error"
    })
  }
}

