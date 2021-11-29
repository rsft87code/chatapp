const express = require("express");
const app = express();
const path = require("path");
require("./db/connect");
const Message = require("./models/messages.js");
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
app.use(express.static(staticpath));

const server = app.listen(port , () => {
    console.log(`server is runing at port no ${port}.`);
});

const io = require("socket.io")(server);
const user = {};


io.on("connection", (socket) =>{
    socket.on("new-user-join", (name) =>{
        user[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("send", (message) =>{
        socket.broadcast.emit("receive", {message: message, name: user[socket.id]});
        const chatMessage = new Message({name: user[socket.id], message:message});
        chatMessage.save();
    });

    socket.on("delete", (message) =>{
        
        Message.deleteOne({message:message});
    })

    socket.on("disconnect", (message) =>{
        socket.broadcast.emit("leave", user[socket.id]);
        delete user[socket.id]; 
    });
});
