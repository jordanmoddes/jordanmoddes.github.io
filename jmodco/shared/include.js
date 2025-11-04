async function inject(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  const res = await fetch(url + '?v=1', {cache:'no-store'});
  if(!res.ok) return console.error('Include failed:', url, res.status);
  host.innerHTML = await res.text();

  // Active link mark
  const here = location.pathname.replace(/\/index\.html?$/,'/');
  host.querySelectorAll('a[href]').forEach(a=>{
    try{
      const path = new URL(a.href).pathname.replace(/\/index\.html?$/,'/');
      if(path===here) a.classList.add('is-active');
    }catch{}
  });

  // Mobile menu toggle (if present)
  const btn = host.querySelector('[data-nav-toggle]');
  const tray = host.querySelector('[data-nav-tray]');
  if(btn && tray){ btn.addEventListener('click', ()=> tray.classList.toggle('open')); }

  // Ensure a theme toggle exists (inject if missing)
  setupThemeToggle(host);
}

/* ---------- THEME ---------- */
const THEME_KEY = 'jmod-theme'; // 'dark' | 'light'
function applyTheme(theme){
  const t = (theme==='light' || theme==='dark') ? theme : 'dark';
  document.documentElement.setAttribute('data-theme', t);
}
function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  // Default = dark unless user has saved a choice
  applyTheme(saved || 'dark');
}
function setupThemeToggle(scope=document){
  // look for an existing toggle first
  let toggle = scope.querySelector('[data-theme-toggle]');
  if(!toggle){
    // try to place it in the nav links if possible
    const links = scope.querySelector('.links') || scope.querySelector('.bar');
    if(links){
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'btn ghost theme-toggle';
      toggle.setAttribute('data-theme-toggle','');
      toggle.textContent = '🌙/☀️';
      links.appendChild(toggle);
    }
  }
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();

  // auto-detect division folder: /jmodco/<Division>/
  const parts = location.pathname.split('/').filter(Boolean);
  const base = parts.includes('jmodco') && parts[1] ? `/jmodco/${parts[1]}` : '';

  inject('#global-nav',  `${base}/nav.html`);
  inject('#global-hero', `${base}/hero.html`);
});