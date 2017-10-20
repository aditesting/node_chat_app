var socket = io();

socket.on("connect", function() {
    console.log("connected to sv");
});

socket.on("disconnect", function() {
    console.log("disconnected from sv");
})

socket.on("newMessage", function(message) {
	console.log("message", message)
})