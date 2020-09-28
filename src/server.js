const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

let users = [];
let messages = [];
let index = 0;

app.use(express.static(__dirname + "../dist"));

io.on("connection", (socket) => {
  socket.emit("loggedIn", {
    users: users.map((s) => s.username),
    messages: messages,
  });

  socket.on("userOn", (username) => {
    console.log(username, " has arrived to this chat room.");
    socket.username = username;
    users.push(socket);
    io.emit("userJoin", socket.username);
  });

  socket.on("msg", (msg) => {
    let message = {
      index: index,
      username: socket.username,
      msg: msg,
    };
    messages.push(message);
    io.emit("msg", message);
    index++;
  });

  socket.on("disconnect", () => {
    console.log(socket.username, " has left the chat room.");
    io.emit("userLogout", socket.username);
    users.splice(users.indexOf(socket), 1);
  });
});

http.listen(PORT, () => {
  console.log("Listening on port 3000");
});
