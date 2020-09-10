const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
  socket.on("user", (username) => {
    console.log(user);
    socket.username = username;
    io.emit("userConnect", socket.username);
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
