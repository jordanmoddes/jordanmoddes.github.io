// Jmod shared nav interactions: mobile menu + theme toggle (with persistence)
(function(){
  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  menuBtn?.addEventListener('click', () => {
    const open = menu.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close on link click (mobile)
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('show');
    menuBtn?.setAttribute('aria-expanded','false');
  }));

  // Theme toggle (default: keep saved, else dark)
  const KEY = 'jmod-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const saved = localStorage.getItem(KEY);
  const initial = saved || 'dark';
  if (initial === 'light') root.setAttribute('data-theme','light'); else root.removeAttribute('data-theme');
  if (toggle) toggle.checked = (initial !== 'light');

  // Apply on change
  toggle?.addEventListener('change', () => {
    const next = toggle.checked ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme','light'); else root.removeAttribute('data-theme');
    localStorage.setItem(KEY, next);
  });
})();
