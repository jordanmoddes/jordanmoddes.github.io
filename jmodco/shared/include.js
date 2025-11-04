/* -------------------------------------------------
   Jmod Co. Shared Include Loader + Theme Toggle
   ------------------------------------------------- */

// Inject external HTML (nav + hero)
async function inject(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  try{
    const res = await fetch(url + '?v=1', {cache:'no-store'});
    if(res.ok){
      host.innerHTML = await res.text();
      setupActiveLink(host);
      setupNavToggle(host);
      setupThemeToggle(host);
    }else{
      console.error('Include failed:', url, res.status);
    }
  }catch(e){ console.error('Fetch error:', e); }
}

// Highlight the active nav link
function setupActiveLink(host){
  const here = location.pathname.replace(/\/index\.html?$/,'/');
  host.querySelectorAll('a[href]').forEach(a=>{
    try{
      const path = new URL(a.href).pathname.replace(/\/index\.html?$/,'/');
      if(path===here) a.classList.add('is-active');
    }catch{}
  });
}

// Mobile hamburger toggle
function setupNavToggle(host){
  const btn = host.querySelector('[data-nav-toggle]');
  const tray = host.querySelector('[data-nav-tray]');
  if(btn && tray){
    btn.addEventListener('click', ()=> tray.classList.toggle('open'));
  }
}

/* -------------------------
   THEME TOGGLE MANAGEMENT
   ------------------------- */
const THEME_KEY = 'jmod-theme'; // 'dark' | 'light'

function applyTheme(theme){
  const t = (theme==='light' || theme==='dark') ? theme : 'dark';
  document.documentElement.setAttribute('data-theme', t);
}

function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || 'dark'); // default dark
}

function labelToggle(btn){
  const t = document.documentElement.getAttribute('data-theme') || 'dark';
  btn.textContent = t === 'dark' ? 'Dark' : 'Light';
}

function setupThemeToggle(scope=document){
  let btn = scope.querySelector('[data-theme-toggle]');
  if(!btn){
    const links = scope.querySelector('.links') || scope.querySelector('.bar');
    if(links){
      btn = document.createElement('button');
      btn.type='button';
      btn.className='btn ghost theme-toggle';
      btn.setAttribute('data-theme-toggle','');
      links.appendChild(btn);
    }
  }
  if(btn){
    labelToggle(btn);
    btn.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      labelToggle(btn);
    });
  }
}

/* -------------------------
   INITIALIZE ON PAGE LOAD
   ------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();

  // Auto-detect division path (e.g., /jmodco/Insights/)
  const parts = location.pathname.split('/').filter(Boolean);
  const base = parts.includes('jmodco') && parts[1] ? `/jmodco/${parts[1]}` : '';

  // Inject nav + hero for the detected division
  inject('#global-nav',  `${base}/nav.html`);
  inject('#global-hero', `${base}/hero.html`);
});