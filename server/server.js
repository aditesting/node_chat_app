require("./../config/config");
const socketio = require("socket.io");
const http = require("http");

const path = require("path");
const express = require("express");

const PUBLIC_PATH = path.join(path.dirname(__dirname), "public")

var app = express();
var server = http.createServer(app);

var io = socketio(server);

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.on("disconnect", () => {
		console.log("client left")
	})

	socket.on("createMessage", (message) => {
		message.createdAt = new Date().toISOString();
		io.emit("newMessage", message)
	})

})



app.use(express.static(PUBLIC_PATH));

server.listen(process.env.PORT, ()=>{
	console.log(`app started on port ${process.env.PORT}`)
})
