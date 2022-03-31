const { commentModel } = require("../models/CommentModel");

module.exports = (server) => {
   const io = require("socket.io")(server, {
      cors: {
         origin: "http://localhost:3000",
         methods: ["GET", "POST"],
      },
   });
   io.on("connection", (socket) => {
      // console.log("New client connected" + socket.id);

      // Thằng này dùng để join vào từng lesson cho user
      socket.on("join_room", (data) => {
         socket.join(data);
         console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      // Thằng này dùng để nhận cmt từ người dùng , lưu comment
      socket.on("send_comment", data => {
         socket.to(data.idRoom).emit("receive_comment", data);
         console.log(`${data.idRoom} co ${data.idUser} gui tin`);
      });

      //Thằng này dùng để lấy tất cả các comment theo khóa học
      socket.on("get_comment", (idRoom) => {
         commentModel.find({ idRoom })
            .then((cmt) => {
               socket.emit("receive_all_comment", cmt);
            })
            .catch((err) => {
               console.log(err);
            });
      });

      // Thằng này dùng để nhận cmt từ người dùng , lưu comment
      socket.on("send_comment", (data) => {
         commentModel.create(data)
            .then(data => {
               socket.emit("receive_comment", data);
               socket.in(data.idRoom).emit("receive_comment", data);
            })
            .catch(err => {
               console.log("ERROR: ", err)
            })
      });

      socket.on('updateLike', (data) => {
         socket.to(data[0].idRoom).emit("receive_count_like_updated", (data));
         console.log('data: ', data);
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

      // Tạo 1 cmt mà cmt này trả lời 1 cmt khác
      socket.on("send_comment_response", (data) => {
         commentModel.findByIdAndUpdate(
            { _id: data._id },
            { $push: { cmtResponse: data.cmtRes } },
            { new: true }
         )
            .then(data => {
               console.log(data);
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

      // update content comment response
      socket.on("update_content_response", (room, _id, idCmtResponse, data) => {
         commentModel.findOne({ _id }, function (err, response) {
            if (err) console.log(err);
            const newCmtResponse = response.cmtResponse;
            newCmtResponse.forEach((comment) => {
               if (comment.id === idCmtResponse) {
                  comment.content = data;
               }
            });
            commentModel.findByIdAndUpdate(
               _id,
               { cmtResponse: newCmtResponse },
               { new: true },
               function (err, res) {
                  if (err) return;

               }
            );
         });

         socket.on("update_count_like_cmt_res", (data) => {
            commentModel.findOne({ _id: data.idCmt }, function (err, response) {
               if (err) console.log(err);
               console.log(response);
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

            socket.on("update_count_like_cmt_res", (room, _id, idCmtResponse, data) => {
               commentModel.findOne({ _id }, function (err, response) {
                  if (err) console.log(err);
                  const newCmtResponse = response.cmtResponse;
                  newCmtResponse.forEach((comment) => {
                     if (comment.id === idCmtResponse) {
                        comment.countLike = data;
                     }
                  });
                  commentModel.findByIdAndUpdate(
                     _id,
                     { cmtResponse: newCmtResponse },
                     { new: true },
                     function (err, res) {
                        if (err) console.log(err);
                        socket.in(room).emit("receive_count_like_cmtResponse_updated", res);
                     }
                  );
               });
            });

            socket.on("disconnect", () => {
               return;
            });
         });
      });
   });
};
