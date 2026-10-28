/* Demo catalogue and basket. No payment service or order endpoint is connected. */
(function (root) {
  "use strict";
  const catalogue = Object.freeze({
    jasmine: {
      name: "Snow Jasmine",
      price: 3200,
      note: "Floral · White grape",
      image: "assets/jasmine.webp",
    },
    hibiscus: {
      name: "Hibiscus Noir",
      price: 3600,
      note: "Red berries · Floral",
      image: "assets/hibiscus.webp",
    },
    oolong: {
      name: "Volcano Oolong",
      price: 3800,
      note: "Toasted · Mineral",
      image: "assets/oolong.webp",
    },
    rose: {
      name: "Untamed Rosé",
      price: 3600,
      note: "Wild berries · Citrus",
      image: "assets/rose.webp",
    },
  });
  const storageKey = "chalu-demo-bag-v1";
  const maxQuantity = 12;
  const money = (cents) => `S$${(cents / 100).toFixed(2)}`;
  function sanitize(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.keys(catalogue)
        .filter((key) => Number.isInteger(value[key]) && value[key] > 0)
        .map((key) => [key, Math.min(value[key], maxQuantity)]),
    );
  }
  function calculate(value) {
    const clean = sanitize(value);
    const count = Object.values(clean).reduce(
      (sum, quantity) => sum + quantity,
      0,
    );
    const subtotal = Object.entries(clean).reduce(
      (sum, [key, quantity]) => sum + catalogue[key].price * quantity,
      0,
    );
    const delivery = subtotal > 0 && subtotal < 8000 ? 600 : 0;
    return { count, subtotal, delivery, total: subtotal + delivery };
  }
  if (typeof module !== "undefined" && module.exports)
    module.exports = { sanitize, calculate, catalogue, money };
  if (typeof document === "undefined") return;

  let cart = {};
  try {
    cart = sanitize(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    /* A blocked or stale store starts empty. */
  }
  const bag = document.querySelector("#bag-dialog");
  let statusTimer;
  function announce(message) {
    const status = document.querySelector("#shop-status");
    if (!status) return;
    clearTimeout(statusTimer);
    status.textContent = message;
    status.classList.add("visible");
    statusTimer = setTimeout(() => status.classList.remove("visible"), 4000);
  }
  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      /* Keep the current visit usable. */
    }
    render();
    document.dispatchEvent(new CustomEvent("chalu:cartchange"));
  }
  function add(key) {
    if (!Object.hasOwn(catalogue, key)) return;
    if ((cart[key] || 0) >= maxQuantity) {
      announce("A maximum of 12 bottles per tea is available in this demo.");
      return;
    }
    cart[key] = (cart[key] || 0) + 1;
    save();
    announce(`${catalogue[key].name} added to your bag.`);
  }
  function change(key, delta) {
    if (!Object.hasOwn(catalogue, key) || ![-1, 1].includes(delta)) return;
    const quantity = Math.min(
      maxQuantity,
      Math.max(0, (cart[key] || 0) + delta),
    );
    if (quantity) cart[key] = quantity;
    else delete cart[key];
    save();
  }
  function remove(key) {
    delete cart[key];
    save();
    announce("Tea removed from your bag.");
  }
  function render() {
    const totals = calculate(cart);
    document
      .querySelectorAll("[data-bag-count]")
      .forEach((el) => (el.textContent = totals.count));
    document
      .querySelectorAll("[data-open-bag]")
      .forEach((el) =>
        el.setAttribute(
          "aria-label",
          `Open shopping bag, ${totals.count} ${totals.count === 1 ? "item" : "items"}`,
        ),
      );
    if (!bag) return;
    const items = document.querySelector("#bag-items");
    document.querySelector("#bag-totals").hidden = !totals.count;
    if (!totals.count) {
      items.innerHTML =
        '<div class="bag-empty"><span aria-hidden="true">❧</span><h3>A little room<br>for something lovely.</h3><p>Find your favourite expression of Chalu.</p><button class="button button-dark" data-continue>Explore the collection ↗</button></div>';
    } else {
      items.innerHTML = Object.entries(cart)
        .map(([key, quantity]) => {
          const tea = catalogue[key];
          return `<article class="bag-item"><div class="bag-item-image ${key}"><img src="${tea.image}" alt="${tea.name} bottle" width="65" height="180"></div><div class="bag-item-detail"><h3>${tea.name}</h3><p>750 ml · ${money(tea.price)}</p><div class="bag-item-bottom"><div class="quantity-control" aria-label="Quantity for ${tea.name}"><button data-change="${key}" data-delta="-1" aria-label="Decrease ${tea.name} quantity">−</button><output aria-label="${tea.name} quantity">${quantity}</output><button data-change="${key}" data-delta="1" aria-label="Increase ${tea.name} quantity" ${quantity >= maxQuantity ? "disabled" : ""}>+</button></div><span>${money(tea.price * quantity)}</span></div><button class="remove-item" data-remove="${key}" aria-label="Remove ${tea.name}">Remove</button></div></article>`;
        })
        .join("");
    }
    document.querySelector("#bag-subtotal").textContent = money(
      totals.subtotal,
    );
  }
  function closeBag() {
    if (bag?.open) bag.close();
  }
  function openBag() {
    if (!bag || bag.open) return;
    render();
    bag.showModal();
    document.body.classList.add("bag-open");
  }
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.hasAttribute("data-add")) add(target.dataset.add);
    if (target.hasAttribute("data-open-bag")) openBag();
    if (target.hasAttribute("data-change")) {
      const key = target.dataset.change;
      const delta = target.dataset.delta;
      change(key, Number(delta));
      const next = bag.querySelector(
        `[data-change="${key}"][data-delta="${delta}"]:not(:disabled)`,
      );
      (
        next ||
        bag.querySelector("[data-change]") ||
        bag.querySelector("[data-continue]") ||
        bag.querySelector(".bag-close")
      )?.focus();
    }
    if (target.hasAttribute("data-remove")) {
      remove(target.dataset.remove);
      (
        bag.querySelector("[data-remove]") ||
        bag.querySelector("[data-continue]")
      )?.focus();
    }
    if (target.matches(".bag-close,.continue-shopping,[data-continue]"))
      closeBag();
    if (target.hasAttribute("data-continue")) location.href = "shop.html";
  });
  bag?.addEventListener("close", () =>
    document.body.classList.remove("bag-open"),
  );
  bag?.addEventListener("click", (event) => {
    const box = bag.getBoundingClientRect();
    if (
      event.target === bag &&
      (event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom)
    )
      closeBag();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey) return;
    try {
      cart = sanitize(JSON.parse(event.newValue));
    } catch {
      cart = {};
    }
    render();
    document.dispatchEvent(new CustomEvent("chalu:cartchange"));
  });
  root.ChaluShop = {
    catalogue,
    money,
    add,
    openBag,
    getCart: () => ({ ...cart }),
    totals: () => calculate(cart),
    clear: () => {
      cart = {};
      save();
    },
  };
  render();
})(typeof window === "undefined" ? globalThis : window);
