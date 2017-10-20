var socket = io();

socket.on("connect", function() {
    console.log("connected to sv");

    socket.emit("createMessage", {
    	from: "adi@adi.com",
    	text: "AAAAAAaaaaaaaaaaAAaaaAaaaaaAAAaaaAaa"
    })
});

socket.on("disconnect", function() {
    console.log("disconnected from sv");
})

socket.on("newMessage", function(message) {
	console.log("message", message)
})