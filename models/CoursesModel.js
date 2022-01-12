const mongoose = require("mongoose");

const Schema  = mongoose.Schema()

const courseListSchema = new mongoose.Schema(
    {
        nameCourse: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        view: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    },
    { timestamps: true, collection: "list-courses" }
)

exports.courseListModel = mongoose.model("list-courses" , courseListSchema)




const courseDetailSchema = new mongoose.Schema(
    {
        nameCourse: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        linkVideo: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "list-courses-detail" }
)

exports.courseListModelDetail = mongoose.model("list-courses-detail" , courseDetailSchema)