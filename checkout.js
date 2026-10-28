"use strict";
const shop = window.ChaluShop;
const content = document.querySelector("#checkout-content");
const empty = document.querySelector("#checkout-empty");
const form = document.querySelector("#checkout-form");
let completed = false;
function renderCheckout() {
  if (completed) return;
  const cart = shop.getCart();
  const totals = shop.totals();
  content.hidden = totals.count === 0;
  form.querySelector("[type=submit]").disabled = totals.count === 0;
  empty.hidden = totals.count !== 0;
  document.querySelector("#checkout-items").innerHTML = Object.entries(cart)
    .map(([key, quantity]) => {
      const tea = shop.catalogue[key];
      return `<div class="summary-item"><div class="summary-image"><img src="${tea.image}" alt="${tea.name} bottle" width="50" height="145"><span>${quantity}</span></div><div><h3>${tea.name}</h3><p>750 ml · ${quantity} ${quantity === 1 ? "bottle" : "bottles"}</p></div><strong>${shop.money(tea.price * quantity)}</strong></div>`;
    })
    .join("");
  document.querySelector("#checkout-subtotal").textContent = shop.money(
    totals.subtotal,
  );
  document.querySelector("#checkout-delivery").textContent = totals.delivery
    ? shop.money(totals.delivery)
    : "Complimentary";
  document.querySelector("#delivery-price").textContent = totals.delivery
    ? shop.money(totals.delivery)
    : "Complimentary";
  document.querySelector("#checkout-total").textContent = shop.money(
    totals.total,
  );
}
document.addEventListener("chalu:cartchange", renderCheckout);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (completed || !shop.totals().count || !form.reportValidity()) return;
  completed = true;
  const totals = shop.totals();
  document.querySelector("#confirmation-items").innerHTML =
    document.querySelector("#checkout-items").innerHTML;
  document.querySelector("#confirmation-total").textContent = shop.money(
    totals.total,
  );
  document.querySelector("#demo-reference").textContent =
    `DEMO-${Date.now().toString(36).toUpperCase()}`;
  content.hidden = true;
  document.querySelector(".checkout-heading").hidden = true;
  const confirmation = document.querySelector("#order-confirmation");
  confirmation.hidden = false;
  // Only product IDs and quantities were stored. Contact fields stay in the page.
  shop.clear();
  form.reset();
  confirmation.focus();
  confirmation.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "start",
  });
});
renderCheckout();
