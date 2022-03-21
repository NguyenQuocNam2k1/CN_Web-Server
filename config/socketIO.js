const cors = require("cors");
const moment = require('moment');
const { commentModel } = require("../models/CommentModel");

module.exports = (server) => {
   const io = require("socket.io")(server, {
      cors: {
         origin: "http://localhost:3000",
         methods: ["GET", "POST"]
      },
   });
   io.on("connection", (socket) => {
      console.log("New client connected" + socket.id);

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

      socket.on("update_content", (room, _id, content) => {
         commentModel.findByIdAndUpdate(
            _id,
            { content: content },
            { new: true },
            function (err, res) {
               if (err) console.log(err);
               socket.in(room).emit("receive_content_updated", res);
            }
         );
      });

      socket.on('updateLike', (data) => {
         socket.to(data[0].idRoom).emit("receive_count_like_updated", (data));
         console.log('data: ', data);
      });


      socket.on("send_comment_response", data => {
         socket.to(data[0].idRoom).emit("receive_comment_response", data);
         console.log('data: ', data);
         // console.log(`${data.idRoom} co ${data.idUser} phan hoi`);
      });


      // Tạo 1 cmt mà cmt này trả lời 1 cmt khác
      socket.on("send_message_response", (room, _id, data) => {
         commentModel.findOne({ _id }, function (error, response) {
            if (error) console.log(error);
            const newCmtResponse = response.cmtResponse;
            newCmtResponse.push(data);
            commentModel.findByIdAndUpdate(
               _id,
               { cmtResponse: newCmtResponse },
               { new: true },
               function (err, res) {
                  if (err) console.log(err);
                  socket.in(room).emit("receive_message_response", res);
               }
            );
         });
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
                  if (err) console.log(err);
                  socket.in(room).emit("receive_message_response_updated", res);
               }
            );
         });
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

   /* io.on('connection', socket => {
     socket.on('chatComment', cmt => {
       const user = {
         id: 1,
         name: 'Bui Thinh',
         room: 'room1'
       };
 
       io.to(user.room).emit('comment', formatMessage(user.name, cmt));
     })
   }) */
};

/* function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
} */
