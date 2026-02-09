const { calculateFinalAmount } = require("../src/pricing");

test("example: sanity check", () => {
  expect(1 + 1).toBe(2);
});

test("Check for invalid sub total", () => {
  expect(() => calculateFinalAmount(-100, "DISCOUNT")).toThrow(
    "Invalid subtotal",
  );
});

test("no coupon returns rounded subtotal when below discount threshold", () => {

  expect(calculateFinalAmount(123.456)).toBe(123.46);

});

test("no coupon applies 5% discount for subtotal >= 1000", () => {

  expect(calculateFinalAmount(1000)).toBe(950);

});

test("SAVE10 applies 10% discount up to $100 (caps) and is case-insensitive", () => {

  expect(calculateFinalAmount(2000, "save10")).toBe(1800);

  expect(calculateFinalAmount(100, "SAVE10")).toBe(90);

});

test("FLAT50 subtracts $50 but total cannot go below 0", () => {

  expect(calculateFinalAmount(200, "FLAT50")).toBe(150);

  expect(calculateFinalAmount(40, "FLAT50")).toBe(0);

});

test("Invalid coupon throws", () => {
  expect(() => calculateFinalAmount(100, "BOGUS")).toThrow("Invalid Coupon");
});
