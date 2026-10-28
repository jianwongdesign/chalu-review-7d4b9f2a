/* Native touch scrolling, perspective portraits, and an optional gentle rotation. */
(() => {
  const track = document.querySelector('#collection-track');
  const cards = [...track.children];
  const controls = document.querySelector('.collection-controls');
  const toggle = controls.querySelector('[data-collection-play]');
  const position = document.querySelector('#collection-position');
  const mobile = matchMedia('(max-width: 760px)');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let auto = !motion.matches;
  let visible = false;
  let index = 0;
  let direction = 1;
  let timer;
  let frame;
  function syncToggle() {
    toggle.textContent = auto ? 'Ⅱ' : '▷';
    toggle.setAttribute('aria-label', auto ? 'Pause collection rotation' : 'Play collection rotation');
    toggle.setAttribute('aria-pressed', String(auto));
  }
  function update() {
    frame = null;
    const bounds = track.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    let closest = Infinity;
    cards.forEach((card, i) => {
      const box = card.getBoundingClientRect();
      const distance = (box.left + box.width / 2 - center) / box.width;
      if (Math.abs(distance) < closest) { closest = Math.abs(distance); index = i; }
      const amount = Math.max(-1, Math.min(1, distance));
      card.style.setProperty('--turn', `${-amount * 13}deg`);
      card.style.setProperty('--lift', `${Math.abs(amount) * 17}px`);
      card.style.setProperty('--scale', String(1 - Math.abs(amount) * .07));
    });
    controls.querySelector('[data-collection-prev]').disabled = index === 0;
    controls.querySelector('[data-collection-next]').disabled = index === cards.length - 1;
    position.value = `${String(index + 1).padStart(2, '0')} / 04`;
  }
  function go(next) {
    const bounded = Math.max(0, Math.min(cards.length - 1, next));
    const bounds = track.getBoundingClientRect();
    const box = cards[bounded].getBoundingClientRect();
    track.scrollTo({left: track.scrollLeft + box.left + box.width/2 - bounds.left - bounds.width/2, behavior: motion.matches ? 'instant' : 'smooth'});
  }
  function schedule() {
    clearTimeout(timer);
    if (!auto || !mobile.matches || !visible || document.hidden) return;
    timer = setTimeout(() => {
      if (index === cards.length - 1) direction = -1;
      if (index === 0) direction = 1;
      go(index + direction);
      schedule();
    }, 4200);
  }
  function pause() { auto = false; syncToggle(); schedule(); }
  controls.querySelector('[data-collection-prev]').addEventListener('click', () => { pause(); go(index - 1); });
  controls.querySelector('[data-collection-next]').addEventListener('click', () => { pause(); go(index + 1); });
  toggle.addEventListener('click', () => { auto = !auto; syncToggle(); schedule(); });
  track.addEventListener('pointerdown', pause, {passive:true});
  track.addEventListener('wheel', pause, {passive:true});
  track.addEventListener('focusin', pause);
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault(); pause(); go(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', () => { if (!frame) frame=requestAnimationFrame(update); }, {passive:true});
  new IntersectionObserver(entries => { visible=entries[0].isIntersecting; schedule(); }, {threshold:.25}).observe(track);
  function resize() { controls.hidden=!mobile.matches; update(); schedule(); }
  mobile.addEventListener('change', resize);
  window.addEventListener('resize', resize, {passive:true});
  motion.addEventListener('change', event => { if(event.matches) pause(); });
  document.addEventListener('visibilitychange', schedule);
  syncToggle(); resize();
})();
