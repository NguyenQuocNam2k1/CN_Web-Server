const cors = require("cors");
const { commentModel } = require("../models/CommentModel");
const moment = require('moment');

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (io) => {
    console.log("New client connected" + io.id);

    // Thằng này dùng để join vào từng lesson cho user
    io.on("join_room", (data) => {
      io.join(data);
      console.log(`User with ID: ${io.id} joined room: ${data}`);
    });

    // Thằng này dùng để nhận cmt từ người dùng , lưu comment
    io.on("send_message", (room, cmt) => {
      const comment = new commentModel(cmt);
      comment.save(function (err, res) {
        // Dòng bên dưới dùng để check nếu như lưu cmt bị failed
        if (err) console.log("SERVER ERROR");
        // Dòng bên dưới dùng để trả về cmt cho room
        io.in(room).emit("receive_message", res);
      });
    });

    io.on("update_content", (room, _id, content) => {
      commentModel.findByIdAndUpdate(
        _id,
        { content: content },
        { new: true },
        function (err, res) {
          if (err) console.log(err);
          io.in(room).emit("receive_content_updated", res);
        }
      );
    });

    io.on("update_count_like", (room , _id , data) => {
      commentModel.findByIdAndUpdate(
        _id,
        {countLike: data},
        { new: true },
        function (err, res) {
          if (err) console.log(err);
          io.in(room).emit("receive_count_like_updated", res);
        }
      );
    });

    // Tạo 1 cmt mà cmt này trả lời 1 cmt khác
    io.on("send_message_response", (room, _id, data) => {
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
            io.in(room).emit("receive_message_response", res);
          }
        );
      });
    });

    // update content comment response
    io.on("update_content_response", (room, _id, idCmtResponse, data) => {
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
            io.in(room).emit("receive_message_response_updated", res);
          }
        );
      });
    });

    io.on("update_count_like_cmt_res", (room, _id, idCmtResponse, data) => {
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
            io.in(room).emit("receive_count_like_cmtResponse_updated", res);
          }
        );
      });
    });

  
    io.on("chat_comment", (data) => {
      console.log(data);
      io.to(data).emit("receive_comment", data);
    });
  
    io.on("disconnect", () => {
      return;
    });
  });

  /* io.on('connection', io => {
    io.on('chatComment', cmt => {
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
