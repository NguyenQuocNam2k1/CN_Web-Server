const cors = require("cors");

module.exports = (server) => {
  const socketIo = require("socket.io")(server, {
    cors: {
      origin: "*"
    }
  });
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

  socketIo.on("connection", (socket) => {
    ///Handle khi có connect từ client tới
    console.log("New client connected" + socket.id);
    console.log(socket);
    let idRoom ;
    let idUser ; 
    socket.on("setIdUser&Room", function (data) {
      console.log(data);
      idUser = data.idUser;
      idRoom = data.idRoom;
    });
    console.log(idUser);
    console.log(idRoom);

    socket.emit("getId", socket.id);
    console.log(socket.id);

    socket.on("sendDataClient", function (data) {
      socketIo.emit("sendDataServer", { data });
    });


    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
