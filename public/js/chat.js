var socket = io();

function scrollToBottom(){
	// selectors
	var messages = $("#messages");
	var newMessage = messages.children("li:last-child");

	// heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

socket.on("connect", function() {
    var params = $.deparam(window.location.search);

    socket.emit("join", params, function(err){
    	if(err){
    		alert(err);
    		window.location.href = "/";
    	} else {
    		console.log("all good")
    	}
    });
});

socket.on("disconnect", function() {
    console.log("disconnected from sv");
})

socket.on("newMessage", function(message) {
	// var timestamp = moment(message.createdAt).format('DD-MMM-YY hh:mm:ss');
	// var li = document.createElement('li');
	// $(li).text(`[${timestamp}] ${message.from}: ${message.msg}`);

	// $("#messages").append(li);

	var template = $("#message_template").html();
	var html = Mustache.render(template,{
		timestamp: moment(message.createdAt).format('DD-MMM-YY hh:mm:ss'),
		user: message.from,
		msg: message.msg
	});
	$("#messages").append(html);
	scrollToBottom();

})

socket.on("newLocationMessage", function(message){
	// var li = document.createElement('li');
	// var a = document.createElement('a');

	// var timestamp = moment(message.createdAt).format('DD-MMM-YY hh:mm:ss');

	// a.target = "_blank";
	// a.href = message.url;
	// $(a).text(`[${timestamp}] ${message.from}'s location`);
	// $(li).append(a);

	// $("#messages").append(li);


	var template = $("#location_message_template").html();
	var html = Mustache.render(template,{
		timestamp: moment(message.createdAt).format('DD-MMM-YY hh:mm:ss'),
		user: message.from,
		url: message.url
	});
	$("#messages").append(html);
	scrollToBottom();
})


socket.on("updateUserList", function(users){
	var ol = document.createElement("ol");
	users.forEach(function(user){
		var li = document.createElement("li");
		$(li).text(user);
		$(ol).append(li);
	})
	$("#users").html(ol);
})


$("#send_location").on("click", function(e){
	if(!navigator.geolocation){
		return alert('Geolocation not supported');
	}

	$(e.target).attr("disabled", "disabled").text("Sending location ...");

	navigator.geolocation.getCurrentPosition(function(position){
		$(e.target).removeAttr("disabled").text("Send location");
		socket.emit("createLocationMessage", {
			lat: position.coords.latitude,
			long: position.coords.longitude
		})

	}, function(){
		alert('Failed to fetch location');
		$(e.target).removeAttr("disabled").text("Send location");
	});
})


$("#chatbox").on("submit", function(e){
	e.preventDefault();

	socket.emit("createMessage", {
		from: "user",
		msg: $("[name=msg]").val().trim()
	}, function() {
		$("[name=msg]").val("");
	});


})