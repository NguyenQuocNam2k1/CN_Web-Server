const { commentModel } = require("../models/CommentModel");
const {UserModel} =  require("../models/UsersModel");
module.exports = (server) => {
   const io = require("socket.io")(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST"],
      },
   });
   io.on("connection", (socket) => {
      socket.on("join_room", (data) => {
         socket.join(data);
      });

      socket.on("get_comment", (idRoom) => {
         commentModel.find({ idRoom })
            .then((cmt) => {
               socket.emit("receive_all_comment", cmt);
            })
            .catch((err) => {
               console.log(err);
            });
      });

      socket.on("send_comment", (data) => {
         commentModel.create(data)
            .then(res => {
               commentModel
                  .find({ idRoom: data.idRoom })
                  .then((cmt) => {
                     socket.emit("receive_comment", cmt);
                     socket.to(data.idRoom).emit("receive_comment", cmt);
                  })
                  .catch((err) => {
                     console.log(err);
                     return;
                  });
            })
            .catch(err => {
               console.log("ERROR: ", err)
            })
      });

      socket.on("update_content", data => {
         commentModel.findByIdAndUpdate(
            { _id: data.id },
            { content: data.newCmt },
            { new: true },
         )
            .then(res => {
               commentModel.find({ idRoom: res.idRoom })
                  .then((cmt) => {
                     socket.emit("receive_all_comment", cmt);
                     socket.to(res.idRoom).emit("receive_all_comment", cmt);
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            })
            .catch((err) => {
               console.log(err);
            })
      });

      socket.on("update_count_like", (data) => {
         commentModel
            .findOneAndUpdate(
               { _id: data.idCmt },
               { countLike: data.countLike }
            )
            .then((res) => {
               commentModel
                  .find({ idRoom: data.room })
                  .then((cmt) => {
                     socket.emit("receive_all_comment", cmt);
                     socket.to(data.room).emit("receive_all_comment", cmt);
                  })
                  .catch((err) => {
                     console.log(err);
                     return;
                  });
            })
            .catch((err) => {
               console.log("Error:", err);
            });
      });

      socket.on("send_comment_response", (data) => {
         commentModel.findByIdAndUpdate(
            { _id: data._id },
            { $push: { cmtResponse: data.cmtRes } },
            { new: true }
         )
            .then(data => {
               commentModel.find({ idRoom: data.idRoom })
                  .then((cmt) => {
                     socket.emit("receive_all_comment", cmt);
                     socket.to(data.idRoom).emit("receive_all_comment", cmt);
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            })
            .catch(err => {
               console.log("Error: ", err);
            })
      });

      socket.on("update_content_response", data => {
         commentModel.findOne(
            { _id: data.rootId },
         )
            .then(res => {
               res.cmtResponse.map(element => {
                  if (element._id === data.id) {
                     return element.content = data.newCmt;
                  }
               })
               commentModel.findByIdAndUpdate(
                  { _id: data.rootId },
                  { cmtResponse: res.cmtResponse },
                  function (err, res) {
                     if (err) {
                        return console.log(err);
                     }
                     commentModel.find({ idRoom: data.room })
                        .then((res) => {
                           socket.emit("receive_all_comment", res);
                           socket.to(data.room).emit("receive_all_comment", res);
                        })
                        .catch((err) => {
                           console.log(err);
                        });
                  }
               )

            })
            .catch(err => {
               console.log(err);
            })
      });

      socket.on("update_count_like_cmt_res", (data) => {
         commentModel.findOne({ _id: data.idCmt }, function (err, response) {
            if (err) console.log(err);
            const newCmtResponse = response.cmtResponse;
            newCmtResponse.forEach((item) => {
               if (item._id !== data.idCmtRes) return;
               item.countLike = data.countLike;
            });
            commentModel.findByIdAndUpdate(
               { _id: data.idCmt },
               { cmtResponse: newCmtResponse },
               { new: true },
               function (err, res) {
                  if (err) console.log(err);
                  commentModel.find({ idRoom: data.room })
                     .then((cmt) => {
                        socket.emit("receive_all_comment", cmt);
                        socket.to(data.room).emit("receive_all_comment", cmt);
                     })
                     .catch((err) => {
                        console.log(err);
                        return;
                     });
               }
            );
         });
      });

      socket.on("delete-comment", data => {
         commentModel.deleteOne(
            { _id: data.id }
         )
            .then(res => {
               commentModel.find({ idRoom: data.room })
                  .then((cmt) => {
                     socket.emit("receive_all_comment", cmt);
                     socket.to(data.room).emit("receive_all_comment", cmt);
                  })
                  .catch((err) => {
                     console.log(err);
                     return;
                  });
            })
            .catch((err) => {
               console.log(err);
            })
      })

      socket.on("delete-comment-res", data => {
         commentModel.findOne(
            { _id: data.rootId },
         )
            .then(res => {
               res.cmtResponse.map((element, index) => {
                  if (element._id === data.id) {
                     return res.cmtResponse.splice(index, 1);
                  }
               })
               commentModel.findByIdAndUpdate(
                  { _id: data.rootId },
                  { cmtResponse: res.cmtResponse },
                  function (err, res) {
                     if (err) {
                        return console.log(err);
                     }
                     commentModel.find({ idRoom: data.room })
                        .then((res) => {
                           socket.emit("receive_all_comment", res);
                           socket.to(data.room).emit("receive_all_comment", res);
                        })
                        .catch((err) => {
                           console.log(err);
                        });
                  }
               )

            })
            .catch(err => {
               console.log(err);
            })
      })

      socket.on("update_lesson_course", data =>{
         const {_id, newLessonCourse} = data;
         UserModel.findOneAndUpdate(
            {_id},
            {lesson_course:newLessonCourse},
            {new:true}
         ).then(data =>{
            UserModel.find({_id},function(err , user){
               if(err) return err;
               socket.emit("receive_user", user)
            })
         })
         .catch(err =>{
            console.log("ERROR: ",err);
         })
      })

      socket.on("disconnect", () => {
         return;
      });
   });
};