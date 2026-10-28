const test = require("node:test");
const assert = require("node:assert/strict");
const { sanitize, calculate, money } = require("../commerce.js");

test("a mixed basket calculates item counts and totals in integer cents", () => {
  assert.deepEqual(calculate({ jasmine: 2, oolong: 1 }), {
    count: 3,
    subtotal: 10200,
    delivery: 0,
    total: 10200,
  });
  assert.equal(money(10200), "S$102.00");
});
test("an empty bag has no delivery charge; delivery switches correctly for a qualifying bag", () => {
  assert.deepEqual(calculate({}), {
    count: 0,
    subtotal: 0,
    delivery: 0,
    total: 0,
  });
  assert.equal(calculate({ oolong: 2 }).total, 8200);
  assert.equal(calculate({ jasmine: 3 }).delivery, 0);
});
test("untrusted stored quantities cannot introduce products, negative totals or unlimited quantities", () => {
  assert.deepEqual(
    sanitize({
      jasmine: -3,
      hibiscus: "2",
      oolong: 2.5,
      rose: 1000000,
      unknown: 1,
    }),
    { rose: 12 },
  );
  assert.deepEqual(
    sanitize(JSON.parse('{"__proto__":{"polluted":true},"jasmine":1}')),
    { jasmine: 1 },
  );
  for (const value of [null, [], "broken", 13, true])
    assert.deepEqual(sanitize(value), {});
  assert.equal(calculate({ jasmine: Infinity, rose: NaN }).total, 0);
});
