const cors = require("cors");
const moment = require('moment');

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

  socketIo.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("chat_comment", (data) => {
      console.log(data);
      socket.to(data).emit("receive_comment", data);
    });
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
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
