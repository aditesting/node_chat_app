var generateMessage = (message) => {
	return {
		from: message.from,
		msg: message.msg,
		createdAt: new Date().getTime()
	}
}

var generateLocationMessage = (message) => {
	return {
		from: message.from,
		url: `https://www.google.com/maps?q=${message.lat},${message.long}`,
		createdAt: new Date().getTime()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}