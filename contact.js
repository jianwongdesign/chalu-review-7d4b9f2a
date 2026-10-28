(() => {
  const launcher = document.querySelector('.whatsapp-float');
  if (!launcher) return;
  const hero = document.querySelector('.cinema-hero');
  if (hero) {
    launcher.classList.add('over-home-hero');
    new IntersectionObserver(entries => {
      launcher.classList.toggle('over-home-hero', entries[0].isIntersecting);
    }, { threshold: 0 }).observe(hero);
  }
  const dialog = document.querySelector('#whatsapp-preview');
  if (!dialog) return;
  launcher.addEventListener('click', () => { document.body.classList.add('dialog-open'); dialog.showModal(); });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.querySelectorAll('button').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();
