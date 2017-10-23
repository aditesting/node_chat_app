const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');


describe("generateMessage", () => {
	it('should generate a new message object', () =>{
		var initialMessage = {
			from: "testFrom",
			msg: "testMessage"
		};

		var outputMsg = generateMessage(initialMessage);
		expect(outputMsg).toInclude(initialMessage);
		expect(outputMsg.createdAt).toBeA("number");
	})
})



describe("generateLocationMessage", () => {
	it('should generate a new location message object', () =>{
		var initialMessage = {
			from: "testLocationFrom",
			lat: 45.6579755,
			long: 25.6011977
		};

		var outputMsg = generateLocationMessage(initialMessage);
		expect(outputMsg.from).toBe(initialMessage.from);
		expect(outputMsg.createdAt).toBeA("number");
		expect(parseFloat(outputMsg.url.split('?')[1].replace("q=","").split(',')[0])).toBe(initialMessage.lat);
		expect(parseFloat(outputMsg.url.split('?')[1].replace("q=","").split(',')[1])).toBe(initialMessage.long);
	})
})