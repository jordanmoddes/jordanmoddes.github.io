// Animate the three packets along the pipes on every .hero on the page
(function(){
  function moveAlong(path, dot){
    if(!path || !dot) return;
    const len = path.getTotalLength();
    let t = Math.random() * len;
    (function step(){
      t = (t + 1.2) % len;
      const pt = path.getPointAtLength(t);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
      requestAnimationFrame(step);
    })();
  }

  document.querySelectorAll('.hero').forEach(hero=>{
    const p1 = hero.querySelector('#pipe1');
    const p2 = hero.querySelector('#pipe2');
    const p3 = hero.querySelector('#pipe3');
    const d1 = hero.querySelector('#pkt1');
    const d2 = hero.querySelector('#pkt2');
    const d3 = hero.querySelector('#pkt3');
    moveAlong(p1,d1);
    moveAlong(p2,d2);
    moveAlong(p3,d3);
  });
})();
