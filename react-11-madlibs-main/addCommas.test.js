const addCommas = require("./addCommas");

describe("#addCommas", () => {
	test("it is a function", () => {
		expect(typeof addCommas).toBe("function");
	});
});

describe("addCommas function", () => {
	test("Formats numbers correctly", () => {
		expect(addCommas(1234)).toBe("1,234");
		expect(addCommas(1234567)).toBe("1,234,567");
		expect(addCommas(1234567890)).toBe("1,234,567,890");
	});

	test("Handles edge cases", () => {
		expect(addCommas(0)).toBe("0");
		expect(addCommas(-1234)).toBe("-1,234");
		expect(addCommas(1234.5678)).toBe("1,234.568");
	});
});
