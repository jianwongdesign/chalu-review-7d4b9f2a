// These controls deter casual copying; they are not authentication or DRM.
(() => {
  const expiresAt = Date.parse(document.currentScript.dataset.expires);
  const expiryPage = new URL('preview-expired.html', document.currentScript.src);
  function checkExpiry() {
    if (!Number.isFinite(expiresAt) || Date.now() >= expiresAt) {
      location.replace(expiryPage.href);
      return;
    }
    setTimeout(checkExpiry, Math.min(expiresAt - Date.now(), 60000));
  }
  checkExpiry();
  addEventListener('pageshow', () => {
    if (Date.now() >= expiresAt) location.replace(expiryPage.href);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() >= expiresAt) location.replace(expiryPage.href);
  });
  const editable = target => target instanceof Element && Boolean(target.closest('input, textarea, [contenteditable="true"], [contenteditable=""]'));
  for (const type of ['copy', 'cut', 'contextmenu', 'selectstart']) {
    document.addEventListener(type, event => {
      if (!editable(event.target)) event.preventDefault();
    });
  }
  document.addEventListener('dragstart', event => {
    if (event.target instanceof Element && event.target.closest('img, video')) event.preventDefault();
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && !editable(event.target) && ['a', 'c', 'x', 's', 'u', 'p'].includes(event.key.toLowerCase())) event.preventDefault();
  });
})();
