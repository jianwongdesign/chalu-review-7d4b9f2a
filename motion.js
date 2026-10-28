/* Progressive motion: native scrolling and disclosures stay usable without JS. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(.22, 1, .36, 1)';
  const disclosures = new Map();
  const reveals = new Map();

  document.querySelectorAll('.serve-list details, .tea-disclosures details').forEach(details => {
    const summary = details.querySelector('summary');
    const content = document.createElement('div');
    content.className = 'disclosure-content';
    [...details.childNodes].filter(node => node !== summary).forEach(node => content.append(node));
    details.append(content);
    const state = { expanded: details.open, height: null, fade: null, finish: null };
    disclosures.set(details, state);
    summary.setAttribute('aria-expanded', String(details.open));

    function settle() {
      state.height?.cancel();
      state.fade?.cancel();
      state.height = state.fade = null;
      details.open = state.expanded;
      details.style.height = '';
      details.classList.remove('is-animating', 'is-closing');
      content.inert = !state.expanded;
      summary.setAttribute('aria-expanded', String(state.expanded));
    }
    state.finish = settle;
    summary.addEventListener('click', event => {
      if (!Element.prototype.animate || preference.matches) return;
      event.preventDefault();
      const from = details.getBoundingClientRect().height;
      const opacity = details.open ? getComputedStyle(content).opacity : '0';
      state.expanded = !state.expanded;
      state.height?.cancel();
      state.fade?.cancel();
      details.style.height = '';
      details.open = state.expanded;
      const to = details.getBoundingClientRect().height;
      // Keep native contents rendered for the closing animation, then close.
      details.open = true;
      content.inert = !state.expanded;
      details.classList.add('is-animating');
      details.classList.toggle('is-closing', !state.expanded);
      summary.setAttribute('aria-expanded', String(state.expanded));
      details.style.height = `${to}px`;
      const duration = Math.min(460, Math.max(260, Math.abs(to - from) * 1.2));
      state.height = details.animate([{height:`${from}px`},{height:`${to}px`}], {duration,easing});
      state.fade = content.animate([{opacity},{opacity:state.expanded?1:0}], {duration:duration*.8,easing});
      const current = state.height;
      current.onfinish = () => { if (state.height === current) settle(); };
    });
    details.addEventListener('toggle', () => {
      if (state.height) return;
      state.expanded = details.open;
      content.inert = !details.open;
      summary.setAttribute('aria-expanded', String(details.open));
    });
  });

  if ('IntersectionObserver' in window && Element.prototype.animate) {
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting);
      entering.forEach((entry, index) => {
        observer.unobserve(entry.target);
        if (preference.matches || entry.target.contains(document.activeElement)) return;
        const animation = entry.target.animate([
          {opacity:0, transform:'translateY(22px)'},
          {opacity:1, transform:'translateY(0)'}
        ], {duration:700, delay:Math.min(index,3)*65, easing, fill:'backwards'});
        reveals.set(entry.target, animation);
        animation.onfinish = () => { reveals.delete(entry.target); animation.cancel(); };
      });
    }, {threshold:0.08, rootMargin:'0px 0px -24px 0px'});
    document.querySelectorAll('.intro > *, .section-heading, #collection-track > .product, .story-photos, .story-copy > *, .craft-grid > *, .ritual-image, .ritual-copy > *, .contact > *, .tea-copy > :not(.tea-disclosures), .tea-moment, .related-heading, .related-teas .product, .checkout-heading, .page-editorial > *, .page-next > *, .news-heading, .news-card, .article-heading, .article-body > section, .page-reading > *, .selection-grid > *, .ritual-pairings > :not(.ritual-pairing-grid), .ritual-pairing-link').forEach(el => observer.observe(el));
    // Keyboard users never have to wait for an entrance to finish.
    document.addEventListener('focusin', event => {
      reveals.forEach((animation, el) => {
        if (el.contains(event.target)) { animation.cancel(); reveals.delete(el); }
      });
    });
  }
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    disclosures.forEach(state => state.finish());
    reveals.forEach(animation => animation.cancel());
    reveals.clear();
  });
  window.addEventListener('resize', () => {
    disclosures.forEach(state => { if (state.height) state.finish(); });
  }, {passive:true});
})();
