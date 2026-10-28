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

test("every dedicated page uses the same product identity and demo price as the bag", () => {
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { catalogue } = require("../commerce.js");
  const products = require("../docs/products.json");
  assert.deepEqual(products.map(p => p.id).sort(), Object.keys(catalogue).sort());
  for (const product of products) {
    assert.equal(product.name, catalogue[product.id].name);
    assert.equal(product.price, catalogue[product.id].price);
    const html = readFileSync(join(__dirname, "..", product.slug + ".html"), "utf8");
    assert.ok(html.includes(`data-add="${product.id}"`));
    assert.ok(html.includes(`data-tea-price>${money(product.price)}`));
    assert.ok(html.includes('href="checkout.html"'));
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'));
  }
});
