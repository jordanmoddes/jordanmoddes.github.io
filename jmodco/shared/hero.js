// Animate packets along SVG paths
(function(){
  function moveAlong(path, dot){
    const len = path.getTotalLength();
    let t = Math.random() * len;
    (function step(){
      t = (t + 1.2) % len;
      const pt = path.getPointAtLength(t);
      dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
      requestAnimationFrame(step);
    })();
  }

  document.querySelectorAll('.hero').forEach(hero=>{
    const p1 = hero.querySelector('#pipe1'), p2 = hero.querySelector('#pipe2'), p3 = hero.querySelector('#pipe3');
    const d1 = hero.querySelector('#pkt1'),  d2 = hero.querySelector('#pkt2'),  d3 = hero.querySelector('#pkt3');
    if(p1&&d1) moveAlong(p1,d1);
    if(p2&&d2) moveAlong(p2,d2);
    if(p3&&d3) moveAlong(p3,d3);
  });
})();
