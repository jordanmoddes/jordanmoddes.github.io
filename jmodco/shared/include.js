// Simple same-origin includes for shared nav + hero
async function inject(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  const res = await fetch(url + '?v=1', {cache:'no-store'});
  if(!res.ok) return console.error('Include failed:', url, res.status);
  host.innerHTML = await res.text();

  // mark active nav link
  const here = location.pathname.replace(/\/index\.html?$/,'/');
  host.querySelectorAll('a[href]').forEach(a=>{
    try{
      const path = new URL(a.href).pathname.replace(/\/index\.html?$/,'/');
      if(path===here) a.classList.add('is-active');
    }catch{}
  });

  // mobile menu toggle (if present)
  const btn = host.querySelector('[data-nav-toggle]');
  const tray = host.querySelector('[data-nav-tray]');
  if(btn && tray){
    btn.addEventListener('click', ()=> tray.classList.toggle('open'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  inject('#global-nav',  '/jmodco/shared/nav.html');   // Insights nav
  inject('#global-hero', '/jmodco/shared/hero.html');  // Systems hero
});
