const moment = require("moment");

var generateMessage = (message) => {
	return {
		from: message.from,
		msg: message.msg,
		createdAt: moment().valueOf()
	}
}

var generateLocationMessage = (message) => {
	return {
		from: message.from,
		url: `https://www.google.com/maps?q=${message.lat},${message.long}`,
		createdAt: moment().valueOf()
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
}