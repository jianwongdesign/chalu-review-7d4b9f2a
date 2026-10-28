/* Keep the visible price tied to the same catalogue used by the bag. */
const productKey = document.body.dataset.tea;
const productTea = window.ChaluShop.catalogue[productKey];
if (productTea) {
  document.querySelector('[data-tea-price]').textContent = window.ChaluShop.money(productTea.price);
}
