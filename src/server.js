const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("userOn", (username) => {
    console.log(username);
    socket.username = username;
    io.emit("userOn", socket.username);
  });

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
