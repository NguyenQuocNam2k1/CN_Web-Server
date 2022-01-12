const { courseListModel } =  require("../models/CoursesModel");

exports.createCourses = async (req , res ) =>{
    const {idCourse , nameCourse , description , view} = req.body;
    console.log("idCourses: " , idCourse);
    console.log("nameCourse: " , nameCourse);
    console.log("description: " , description);
    console.log("view: " , view);
}