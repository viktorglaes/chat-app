const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let position = {
  x: 200,
  y: 200,
};

io.on("connection", (socket) => {
  socket.emit("position", position);
  socket.on("move", (data) => {
    switch (data) {
      case "left":
        position.x -= 5;
        io.emit("position", position);
        break;
      case "right":
        position.x += 5;
        io.emit("position", position);
        break;
      case "up":
        position.y -= 5;
        io.emit("position", position);
        break;
      case "down":
        position.y += 5;
        io.emit("position", position);
        break;
    }
  });
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
