const expect = require('expect');

const {isRealString} = require("./utils");

describe("isRealString", () => {
	it("should reject non-string values", () => {
		expect(isRealString(123124)).toBe(false);
	})
	it("should reject only spaces", () => {
		expect(isRealString("   " )).toBe(false);
	})
	it("should allow correct strings", () => {
		expect(isRealString("asdasdasd")).toBe(true);
	})
})