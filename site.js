const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  mobileMenu.hidden = expanded;
  menuButton.setAttribute("aria-expanded", String(!expanded));
});
mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const teas = {
  jasmine: {
    name: "Snow Jasmine",
    eyebrow: "01 / The bright one",
    description:
      "Jasmine tea from the Yuanjiang Valley. A light, golden expression with a gently floral finish.",
    notes: "White grape, delicate flowers, soft acidity.",
  },
  hibiscus: {
    name: "Hibiscus Noir",
    eyebrow: "02 / The cuvée blend",
    description:
      "Hibiscus, wild camellia, and berries come together in a deep ruby pour. Naturally caffeine-free.",
    notes: "Red berries, floral perfume, firm tannins.",
  },
  oolong: {
    name: "Volcano Oolong",
    eyebrow: "03 / The flagship",
    description:
      "Oolong from the volcanic slopes of Tengchong, with a dry profile and a warm, toasted character.",
    notes: "Toasted nuts, mineral depth, refined acidity.",
  },
  rose: {
    name: "Untamed Rosé",
    eyebrow: "04 / The wild one",
    description:
      "White Pu’er meets rose, berries, citrus, and Yunnan black pepper in a lively, dry expression.",
    notes: "Wild berries, citrus peel, a peppery finish.",
  },
};
const dialog = document.querySelector("#product-dialog");
document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.product;
    const tea = teas[key];
    document.querySelector("#dialog-title").textContent = tea.name;
    document.querySelector("#dialog-eyebrow").textContent = tea.eyebrow;
    document.querySelector("#dialog-description").textContent = tea.description;
    document.querySelector("#dialog-notes").textContent = tea.notes;
    const image = document.querySelector("#dialog-bottle");
    image.src = `assets/${key}.webp`;
    image.alt = `${tea.name} sparkling tea bottle`;
    dialog.dataset.tea = key;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);
document
  .querySelector("#dialog-contact")
  .addEventListener("click", () => dialog.close());
