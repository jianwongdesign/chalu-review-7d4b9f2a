// Quiet autoplay with responsive media and a poster when playback is unavailable.
const video = document.querySelector("#hero-video");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const playbackAllowed = () => !motionPreference.matches && !navigator.connection?.saveData;
let heroVisible = true;
let hasFailed = false;
let loading = false;
let playRequest = 0;
const portraitHero = matchMedia("(max-width: 600px) and (orientation: portrait)");
const activeFilm = () => portraitHero.matches ? video.dataset.mobileSrc : video.dataset.src;
const activePoster = () => portraitHero.matches ? video.dataset.mobilePoster : video.dataset.poster;
video.poster = activePoster();
function syncPlayback() {
  const playing = !video.paused && !video.ended && video.readyState >= 2;
  video.dataset.playback = hasFailed ? "error" : playing ? "playing" : loading ? "loading" : "paused";
}
async function playFilm() {
  if (!playbackAllowed() || hasFailed || document.hidden || !heroVisible) return;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.preload = "auto";
  if (!video.getAttribute("src")) video.src = activeFilm();
  const request = ++playRequest;
  loading = true;
  syncPlayback();
  try { await video.play(); } catch { /* Keep the poster; retry after a normal visitor gesture. */ }
  if (request !== playRequest) return;
  loading = false;
  syncPlayback();
}
video.addEventListener("playing", () => { loading = false; video.classList.add("is-ready"); syncPlayback(); });
video.addEventListener("pause", () => { loading = false; syncPlayback(); });
video.addEventListener("error", () => { hasFailed = true; loading = false; video.classList.remove("is-ready"); syncPlayback(); });
motionPreference.addEventListener("change", () => {
  if (!playbackAllowed()) { ++playRequest; video.pause(); video.classList.remove("is-ready"); }
  else playFilm();
});
new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  if (!heroVisible) video.pause();
  else playFilm();
}, {threshold:.1}).observe(document.querySelector(".cinema-hero"));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
  else playFilm();
});
function recoverAutoplay() { if (video.paused) playFilm(); }
document.addEventListener("pointerup", recoverAutoplay);
document.addEventListener("keydown", recoverAutoplay);
window.addEventListener("pageshow", playFilm);
portraitHero.addEventListener("change", () => {
  ++playRequest;
  video.pause();
  video.classList.remove("is-ready");
  video.removeAttribute("src");
  video.poster = activePoster();
  video.load();
  hasFailed = false;
  loading = false;
  syncPlayback();
  playFilm();
});
syncPlayback();
playFilm();
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
