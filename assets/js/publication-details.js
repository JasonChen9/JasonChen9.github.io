// Keep native details as the no-JavaScript fallback; place the enhanced control
// beside the source and citation links without moving the abstract itself.
document.querySelectorAll('[data-publication-toggle]').forEach((button) => {
  const details = document.getElementById(button.dataset.publicationToggle);
  const summary = details?.querySelector('summary');
  if (!details || !summary) return;

  let pinned = false;
  let closeTimer = null;
  const canHover = (event) => event.pointerType !== 'touch'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cancelClose = () => { clearTimeout(closeTimer); closeTimer = null; };
  const sync = () => {
    button.setAttribute('aria-expanded', String(details.open));
    button.querySelector('.publication-toggle-icon').textContent = details.open ? '−' : '+';
  };
  const setOpen = (open) => { cancelClose(); details.open = open; sync(); };
  const scheduleClose = () => {
    cancelClose();
    closeTimer = setTimeout(() => {
      if (!pinned && !button.matches(':hover') && !details.matches(':hover')
        && !details.contains(document.activeElement)) setOpen(false);
    }, 150);
  };
  [button, details].forEach((target) => {
    target.addEventListener('pointerenter', (event) => { if (canHover(event)) setOpen(true); });
    target.addEventListener('pointerleave', (event) => { if (canHover(event)) scheduleClose(); });
    target.addEventListener('focusout', scheduleClose);
    target.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !details.open) return;
      event.preventDefault();
      pinned = false;
      if (details.contains(document.activeElement)) button.focus();
      setOpen(false);
    });
  });
  details.addEventListener('focusin', () => setOpen(true));
  // Clicking a hover preview pins it open; clicking again closes it.
  // Touchscreens and keyboard activation use this same explicit toggle.
  button.addEventListener('click', () => { pinned = !pinned; setOpen(pinned); });
  details.addEventListener('toggle', sync);
  // Keep the attribute name visible to production CSS extraction.
  details.setAttribute('data-enhanced', 'true');
  summary.hidden = true;
  button.hidden = false;
  sync();
});
