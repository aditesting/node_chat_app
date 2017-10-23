var socket = io();

socket.on("connect", function() {
    console.log("connected to sv");
});

socket.on("disconnect", function() {
    console.log("disconnected from sv");
})

socket.on("newMessage", function(message) {
	console.log("message", message)
	var li = document.createElement('li');
	$(li).text(`${message.from}: ${message.msg}`);

	$("#messages").append(li);
})

socket.on("newLocationMessage", function(message){
	var li = document.createElement('li');
	var a = document.createElement('a');

	a.target = "_blank";
	a.href = message.url;
	$(a).text(`${message.from}'s location`);
	$(li).append(a);

	$("#messages").append(li);
})

$("#send_location").on("click", function(e){
	if(!navigator.geolocation){
		return alert('Geolocation not supported');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
		socket.emit("createLocationMessage", {
			lat: position.coords.latitude,
			long: position.coords.longitude
		})

	}, function(){
		alert('Failed to fetch location')
	});

})


$("#chatbox").on("submit", function(e){
	e.preventDefault();

	socket.emit("createMessage", {
		from: "user",
		msg: $("[name=msg]").val().trim()
	}, function() {

	});

	$("[name=msg]").val("");

})