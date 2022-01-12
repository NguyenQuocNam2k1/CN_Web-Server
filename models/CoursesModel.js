import mongoose from "mongoose";

const courseListSchema = new mongoose.Schema(
    {
        idCourse: {
            type: String,
            required: true,
        },
        nameCourse: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        View: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "list-courses" }
)

export const courseListModel = mongoose.model("list-courses" , courseListSchema)




const courseDetailSchema = new mongoose.Schema(
    {
        idCourse: {
            type: String,
            required: true,
        },
        nameCourse: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        View: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, collection: "list-courses-detail" }
)

export const courseListModel = mongoose.model("list-courses" , courseDetailSchema)