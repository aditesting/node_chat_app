require("./../config/config");
const socketio = require("socket.io");
const http = require("http");

const path = require("path");
const express = require("express");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/utils");
const {Users} = require("./utils/users");

const PUBLIC_PATH = path.join(path.dirname(__dirname), "public")

var app = express();
var server = http.createServer(app);

var io = socketio(server);

var users = new Users();

io.on('connection', (socket) => {
	console.log('new user connected');



	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id);
		if (user){
			io.to(user.room).emit("newMessage", generateMessage({
					from:"Admin",
					msg:`${user.name} has left the room`
				}));
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
		}
	})

	socket.on("join", (params, callback) =>{
		if (!isRealString(params.user) || !isRealString(params.room)){
			callback("Invalid name or room name")
		}

		socket.emit("newMessage", generateMessage({
			from:"admin",
			msg:"welcome to the chat app"
		}));

		socket.join(params.room);

		users.removeUser(socket.id);
		users.addUser(socket.id, params.user, params.room);

		io.to(params.room).emit("updateUserList", users.getUserList(params.room));

		socket.broadcast.to(params.room).emit("newMessage", generateMessage({
			from: "Admin",
			msg: `${params.user} joined the room`
		}));


		callback();
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
