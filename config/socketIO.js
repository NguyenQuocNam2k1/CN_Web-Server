const cors = require("cors");
const { commentModel } = require("../models/CommentModel");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
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
    socket.on("send_message", (room, cmt) => {
      const comment = new commentModel(cmt);
      comment.save(function (err, res) {
        // Dòng bên dưới dùng để check nếu như lưu cmt bị failed
        if (err) console.log("SERVER ERROR");
        // Dòng bên dưới dùng để trả về cmt cho room
        socket.in(room).emit("receive_message", res);
      });
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

    socket.on("update_count_like", (room , _id , data) => {
      commentModel.findByIdAndUpdate(
        _id,
        {countLike: data},
        { new: true },
        function (err, res) {
          if (err) console.log(err);
          socket.in(room).emit("receive_count_like_updated", res);
        }
      );
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
};
