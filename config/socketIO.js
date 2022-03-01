const cors = require("cors");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

  io.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data).emit("receive_message", data);
    });
  

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
