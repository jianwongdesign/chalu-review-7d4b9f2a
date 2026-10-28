// A visible play action makes autoplay restrictions clear and recoverable.
const video = document.querySelector("#hero-video");
const videoButton = document.querySelector("#video-control");
const heroPlay = document.querySelector("#hero-play");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
let userPaused = motionPreference.matches || Boolean(navigator.connection?.saveData);
let heroVisible = true;
let hasFailed = false;
let loading = false;
let playRequest = 0;
const portraitHero = matchMedia("(max-width: 600px) and (orientation: portrait)");
const activeFilm = () => portraitHero.matches ? video.dataset.mobileSrc : video.dataset.src;
const activePoster = () => portraitHero.matches ? video.dataset.mobilePoster : video.dataset.poster;
video.poster = activePoster();
function syncVideoControl() {
  const playing = !video.paused && !video.ended && video.readyState >= 2;
  const label = hasFailed ? "Retry film" : loading && !playing ? "Loading film…" : playing ? "Pause film" : "Play film";
  videoButton.setAttribute("aria-label", hasFailed ? "Retry background film" : playing ? "Pause background film" : "Play background film");
  videoButton.setAttribute("aria-pressed", String(playing));
  videoButton.querySelector("[data-video-icon]").textContent = playing ? "Ⅱ" : "▷";
  videoButton.querySelector("[data-video-label]").textContent = label;
  heroPlay.hidden = playing;
  heroPlay.querySelector("[data-hero-play-label]").textContent = hasFailed ? "Retry film" : loading ? "Loading film…" : "Play film";
  heroPlay.setAttribute("aria-label", hasFailed ? "Retry background film" : "Play background film");
  video.dataset.playback = hasFailed ? "error" : playing ? "playing" : loading ? "loading" : "paused";
}
async function playFilm() {
  if (hasFailed || document.hidden || !heroVisible) return;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.preload = "auto";
  if (!video.getAttribute("src")) video.src = activeFilm();
  const request = ++playRequest;
  loading = true;
  syncVideoControl();
  try { await video.play(); } catch { /* Autoplay may require the visible play button. */ }
  if (request !== playRequest) return;
  loading = false;
  syncVideoControl();
}
function manualPlay() {
  userPaused = false;
  if (hasFailed) { hasFailed = false; video.load(); }
  playFilm();
}
video.addEventListener("canplay", () => video.classList.add("is-ready"));
video.addEventListener("playing", () => { loading = false; video.classList.add("is-ready"); syncVideoControl(); });
video.addEventListener("pause", () => { loading = false; syncVideoControl(); });
video.addEventListener("error", () => { hasFailed = true; loading = false; video.classList.remove("is-ready"); syncVideoControl(); });
videoButton.addEventListener("click", () => {
  if (video.paused || hasFailed) manualPlay();
  else { userPaused = true; video.pause(); }
});
heroPlay.addEventListener("click", manualPlay);
motionPreference.addEventListener("change", event => { if (event.matches) { userPaused = true; video.pause(); } });
new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  if (!heroVisible) video.pause();
  else if (!userPaused) playFilm();
}, {threshold:.1}).observe(document.querySelector(".cinema-hero"));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
  else if (!userPaused) playFilm();
});
document.addEventListener("pointerup", event => {
  if (!event.target.closest("#video-control, #hero-play") && !userPaused && video.paused) playFilm();
});
window.addEventListener("pageshow", () => { if (!userPaused) playFilm(); });
portraitHero.addEventListener("change", () => {
  ++playRequest;
  video.pause();
  video.classList.remove("is-ready");
  video.removeAttribute("src");
  video.poster = activePoster();
  video.load();
  hasFailed = false;
  loading = false;
  syncVideoControl();
  if (!userPaused) playFilm();
});
syncVideoControl();
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
