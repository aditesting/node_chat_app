require("./../config/config");
const socketio = require("socket.io");
const http = require("http");

const path = require("path");
const express = require("express");

const {generateMessage, generateLocationMessage} = require("./utils/message");

const PUBLIC_PATH = path.join(path.dirname(__dirname), "public")

var app = express();
var server = http.createServer(app);

var io = socketio(server);

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit("newMessage", generateMessage({
		from:"admin",
		msg:"welcome to the chat app"
	}));

	socket.broadcast.emit("newMessage", generateMessage({
		from: "admin",
		msg:"new user joined"
	}));

	socket.on("disconnect", () => {
		console.log("client left")
	})

	socket.on("createMessage", (message, callback) => {

		io.emit("newMessage", generateMessage(message))
		// socket.broadcast.emit("newMessage", message);
		callback();
	})

	socket.on("createLocationMessage", (message, callback) => {
		io.emit('newLocationMessage', generateLocationMessage({from:'Admin', lat:message.lat, long:message.long}))
	})

})



app.use(express.static(PUBLIC_PATH));

server.listen(process.env.PORT, ()=>{
	console.log(`app started on port ${process.env.PORT}`)
})
