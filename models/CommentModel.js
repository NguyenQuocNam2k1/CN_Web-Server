const mongoose = require("mongoose");



const roomSchema = new mongoose.Schema(
    {
        idRoom:{
            type: String,
            required: true
        }
    }
    ,{collection:"room"}
);
exports.roomModel = mongoose.model("room" , roomSchema);


const commentSchema = new mongoose.Schema(
    {
        idUser: {
            type: String,
            required: true,
            ref: "users"
        },
        idRoom: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        cmtResponse:{
            type: Array
        },
        countLike:{
            type: Array,
        },
        username:{
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        }
    },
    {collection:"comment"}
);

exports.commentModel = mongoose.model("comment" , commentSchema);