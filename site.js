// A muted, looping hero with explicit pause and a useful still-image fallback.
const video = document.querySelector("#hero-video");
const videoButton = document.querySelector("#video-control");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
let userPaused =
  motionPreference.matches || Boolean(navigator.connection?.saveData);
let heroVisible = true;
let hasFailed = false;
function syncVideoControl() {
  const playing = !video.paused && !video.ended;
  videoButton.setAttribute(
    "aria-label",
    playing ? "Pause background film" : "Play background film",
  );
  videoButton.setAttribute("aria-pressed", String(playing));
  videoButton.querySelector("[data-video-icon]").textContent = playing
    ? "Ⅱ"
    : "▷";
  videoButton.querySelector("[data-video-label]").textContent = playing
    ? "Pause film"
    : "Play film";
}
async function playFilm() {
  if (hasFailed || document.hidden || !heroVisible) return;
  if (!video.getAttribute("src")) video.src = video.dataset.src;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.autoplay = true;
  video.preload = "auto";
  try {
    await video.play();
  } catch {
    syncVideoControl();
  }
}
video.addEventListener("canplay", () => video.classList.add("is-ready"));
video.addEventListener("playing", () => {
  video.classList.add("is-ready");
  syncVideoControl();
});
video.addEventListener("pause", syncVideoControl);
video.addEventListener("error", () => {
  hasFailed = true;
  video.classList.remove("is-ready");
  videoButton.hidden = false;
  videoButton.setAttribute("aria-label", "Retry background film");
  videoButton.querySelector("[data-video-label]").textContent = "Retry film";
});
videoButton.addEventListener("click", () => {
  if (hasFailed) {
    hasFailed = false;
    video.load();
  }
  if (video.paused) {
    userPaused = false;
    playFilm();
  } else {
    userPaused = true;
    video.pause();
  }
});
motionPreference.addEventListener("change", (event) => {
  if (event.matches) {
    userPaused = true;
    video.pause();
  }
});
new IntersectionObserver(
  (entries) => {
    heroVisible = entries[0].isIntersecting;
    if (!heroVisible) video.pause();
    else if (!userPaused) playFilm();
  },
  { threshold: 0.1 },
).observe(document.querySelector(".cinema-hero"));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
  else if (!userPaused) playFilm();
});
// A gesture can recover autoplay restrictions without overriding an explicit pause.
document.addEventListener("pointerup", (event) => {
  if (!event.target.closest("#video-control") && !userPaused && video.paused) playFilm();
});
window.addEventListener("pageshow", () => { if (!userPaused) playFilm(); });
if (!userPaused) playFilm();
const pageParams = new URLSearchParams(location.search);
if (pageParams.get("bag") === "1") {
  window.ChaluShop.openBag();
  pageParams.delete("bag");
  history.replaceState(
    null,
    "",
    location.pathname +
      (pageParams.size ? "?" + pageParams : "") +
      location.hash,
  );
}

const header = document.querySelector(".site-header");
let scrollFrame;
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  scrollFrame = null;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader);
  },
  { passive: true },
);
updateHeader();
