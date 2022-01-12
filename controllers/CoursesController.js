const { courseListModel , courseListModelDetail } =  require("../models/CoursesModel");

exports.createCourses = async (req , res ) =>{
    const newCourse = req.body;

    courseListModel.create(newCourse)
    .then((data) => {
        return res.status(200).json({
            status: "200",
            message: "Create course success."
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: "500",
            message: "Create course failed."
        })
    })
}


exports.addCourserDetail = async (req , res) => {
    const newCourserDetail = req.body;
    courseListModelDetail.create(newCourserDetail)
    .then(data => {
        return res.status(200).json({
            status: "200",
            message: "Add new video course success",
            data
        })
    })
    .catch(err => {
        return res.status(500).json({
            status: "500",
            message: "Add new video course failed"
        })
    })
}

exports.getCourses = async (req , res) => {
     const idCourse = req.body._id;
     courseListModel.findOne({
         _id: idCourse
     })
     .then(data => {
         return res.status(200).json({
             status:"200",
             message:"Success",
             dataCourser: data,
         })
     })
     .catch(err => {
         return res.status(500).json({
             status:"500",
             message:"Can't found courser"
         })
     })
}

