/* =====================================================================
   script.js — all the behaviour of the main page.
   It reads SITE and D from data.js (which must load first) and then:
     1. builds the cards                  6. colour theme per section, nav highlight, scroll hint
     2. socials / CV / email / copy       7. fade-in on scroll + scroll-progress bar
     3. contact form                      8. expand / close a card (+ corner image, keyboard support)
     4. loading screen (once per visit)   9. star-network background
     5. typing animation                 10. quantum wave-packet in the hero card
   ===================================================================== */

/* ---------- 1. BUILD THE CARDS FROM data.js ---------- */

/* card(o, extra) turns one data object into the HTML for a card.
   o     = one card object from data.js (t, s, p, m, tags, d, href, hl)
   extra = true if the card is beyond SITE.limit (hidden until "Show all")
   Every card gets the exact same structure, so every expanded card looks alike. */
function card(o, extra){
  var ext = /^https?:/.test(o.href||'');                  // external link? open in a new tab. Local pages (./blog/blog1.html) open in the same tab
  var h = '<div class="corner"><a class="lk" href="'+(o.href||'#')+'"'+(ext?' target="_blank" rel="noopener"':'')+'>↗ '+(o.hl||'Link')+'</a><button class="xb" aria-label="close">×</button></div>' // top-right link + close (visible only when expanded)
        + '<div class="s">'+o.s+'</div>'                 // subtitle
        + '<h3>'+o.t+'</h3>'                               // title
        + '<p class="sh">'+o.p+'</p>'                      // short summary
        + (o.tags||[]).map(function(x){return '<span class="chip">'+x+'</span>'}).join('') // tag chips
        + '<div class="more"><p>'+o.m+'</p>'               // long description (hidden until expanded)
        + (o.d||[]).map(function(x){return '<div class="dd"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join(''); // detail rows
  return '<div class="card rv'+(extra?' extra':'')+'" data-x tabindex="0" role="button"'+(o.img?' data-img="'+o.img+'"':'')+'>'+h+'</div></div>'; // data-img = corner picture (optional); 2nd </div> closes ".more"
}

/* For every <div data-fill="NAME"> on the page, fill it with cards from D.NAME */
document.querySelectorAll('[data-fill]').forEach(function(el){
  var arr = D[el.dataset.fill] || [], lim = SITE.limit;
  el.innerHTML = arr.map(function(o,i){ return card(o, i>=lim); }).join('');
  /* More cards than the limit? Add a "Show all" toggle button under the grid */
  if (arr.length > lim){
    var b = document.createElement('button');
    b.className = 'btn o showmore'; b.textContent = 'Show all ('+arr.length+') ↓';
    b.onclick = function(){
      var all = el.classList.toggle('all');               // .all un-hides the extra cards (see style.css)
      b.textContent = all ? 'Show less ↑' : 'Show all ('+arr.length+') ↓';
    };
    el.parentNode.insertBefore(b, el.nextSibling);
  }
});

/* ---------- 2. SOCIAL BUTTONS, CV LINK, EMAIL ---------- */
document.querySelectorAll('.socials').forEach(function(el){          // hero + contact section
  el.innerHTML = SITE.links.map(function(l){ return '<a class="soc" href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+' ↗</a>'; }).join('');
});
document.getElementById('cv').href = SITE.cv;                        // Download CV button
var ml = document.getElementById('mail'); ml.href = 'mailto:'+SITE.email; ml.textContent = SITE.email; // email link

document.getElementById('yr').textContent = new Date().getFullYear();  // footer year updates itself
document.getElementById('copy').onclick = function(){                  // "Copy email" button
  var b = this;
  (navigator.clipboard ? navigator.clipboard.writeText(SITE.email) : Promise.reject())
    .then(function(){ b.textContent = 'Copied'; }, function(){ location.href = 'mailto:'+SITE.email; }); // fall back to opening the mail app
  setTimeout(function(){ b.textContent = 'Copy email'; }, 1800);
};

/* ---------- 3. CONTACT FORM ---------- */
document.getElementById('cf').addEventListener('submit', function(e){
  e.preventDefault();                                                // stop the normal page reload
  var f = e.target, fs = document.getElementById('fs'), d = new FormData(f);
  if (SITE.formspree){
    /* Option A: Formspree is set up -> send the message directly */
    fs.textContent = 'Sending…';
    fetch(SITE.formspree,{method:'POST',body:d,headers:{Accept:'application/json'}})
      .then(function(r){ fs.textContent = r.ok ? 'Sent. Thank you!' : 'Could not send — please email me directly.'; if(r.ok) f.reset(); })
      .catch(function(){ fs.textContent = 'Could not send — please email me directly.'; });
  } else {
    /* Option B (default): open the visitor's mail app with the message pre-filled */
    location.href = 'mailto:'+SITE.email+'?subject='+encodeURIComponent('Portfolio message from '+d.get('name'))
                  + '&body='+encodeURIComponent(d.get('message')+'\n\n— '+d.get('name')+' ('+d.get('email')+')');
    fs.textContent = 'Opening your mail app…';
  }
});

/* ---------- 4. LOADING SCREEN ----------
   Plays once per browser session, so coming back from a blog post does not show it again. */
(function(){
  var Ld = document.getElementById('loader'), seen = false;
  try { seen = sessionStorage.getItem('seen') === '1'; } catch(e){}   // already shown this session?
  if (seen){ Ld.style.display = 'none'; return; }
  try { sessionStorage.setItem('seen', '1'); } catch(e){}
  var p = 0, el = document.getElementById('pct');
  var t = setInterval(function(){
    p += Math.random()*9 + 3;                                        // random steps look more natural
    if (p >= 100){ p = 100; clearInterval(t); setTimeout(function(){ Ld.classList.add('done'); }, 350); } // slide away
    el.textContent = Math.floor(p) + '%';
  }, 90);
})();

/* ---------- 5. TYPING ANIMATION (hero) ---------- */
var W = ['Forecasting cyclones and my end-sem grades','Professional yapper','O(1) coder with O(n!) bugs','Staring at the stars and my compiler errors','Accidentally frying circuits at IIT Bhilai','Surviving engineering on chai and pure bakchodi'], // edit the phrases here
    wi = 0, ci = 0, dl = false, ty = document.getElementById('type'); // wi=phrase index, ci=letters shown, dl=deleting?
(function tk(){
  var w = W[wi];
  ty.textContent = w.slice(0, ci);
  if (!dl && ci == w.length){ dl = true; return setTimeout(tk, 1400); }  // pause when a phrase is complete
  if (dl && ci == 0){ dl = false; wi = (wi+1) % W.length; }              // move to the next phrase
  ci += dl ? -1 : 1;
  setTimeout(tk, dl ? 35 : 80);                                          // deleting is faster than typing
})();

/* ---------- 6. COLOUR THEME PER SECTION, NAV HIGHLIGHT, SCROLL HINT ---------- */
var THEMES = ['black','burg','white','gray'],                            // the repeating colour order (names match style.css)
    secs = [].slice.call(document.querySelectorAll('section')),
    sd = document.getElementById('scrolldown'), sdl = document.getElementById('sdlabel'),
    metaTheme = document.querySelector('meta[name="theme-color"]'),     // colour of the phone's browser bar
    navLinks = [].slice.call(document.querySelectorAll('nav a.l')), cur = 0; // cur = index of the section currently on screen
secs.forEach(function(s,i){ s.dataset.t = THEMES[i % THEMES.length]; }); // section 1 = black, 2 = burgundy, 3 = white, 4 = gray, 5 = black...
/* Watch which section fills more than half the screen, then update everything that depends on it */
var so = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if (e.isIntersecting){
      document.body.dataset.t = e.target.dataset.t;                      // switch the colour theme
      cur = secs.indexOf(e.target);
      var last = cur === secs.length - 1;
      sd.classList.toggle('up', last);                                   // last section: the hint becomes "Back to top"
      sdl.textContent = last ? 'Back to top' : 'Scroll down';
      navLinks.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#'+e.target.id); }); // highlight the matching nav link
      setTimeout(function(){ if (metaTheme) metaTheme.content = getComputedStyle(document.body).getPropertyValue('--bg').trim(); }, 60); // tint the phone browser bar
    }
  });
}, {threshold:.5});
secs.forEach(function(s){ so.observe(s); });
sd.onclick = function(){                                                 // the hint is also a button
  if (cur === secs.length - 1) scrollTo({top:0, behavior:'smooth'});    // on the last section: back to the top
  else secs[cur+1].scrollIntoView({behavior:'smooth'});                  // otherwise: next section
};

/* ---------- 7. FADE-IN ON SCROLL ---------- */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } // reveal once, then stop watching
  });
}, {threshold:.1});
document.querySelectorAll('.rv').forEach(function(e,i){
  e.style.setProperty('--reveal-delay', (i%4)*.1 + 's');                 // small stagger so cards appear one after another
  io.observe(e);
});

/* Thin bar at the very top showing how far down the page you are */
var sp = document.getElementById('sprog');
addEventListener('scroll', function(){
  var h = document.documentElement.scrollHeight - innerHeight;
  sp.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
}, {passive:true});

/* ---------- 8. EXPAND / CLOSE A CARD ---------- */
/* How it works: we clone the clicked card, fix it on top of the page at the same spot and size,
   then animate it to the centre of the screen. Closing plays the same animation backwards. */
function openCard(src){
  var r = src.getBoundingClientRect(),                                   // where the original card is right now
      o = document.createElement('div'); o.className = 'ov';             // dark overlay behind the big card
  var c = src.cloneNode(true); c.classList.add('x','in'); c.removeAttribute('data-x'); // the expanded copy

  /* place(x) sets the clone's position and size from a {left, top, width, height} box */
  function place(x){ c.style.left=x.left+'px'; c.style.top=x.top+'px'; c.style.width=x.width+'px'; c.style.height=x.height+'px'; }

  c.style.cssText = 'transition-delay:0s;overflow:hidden'; place(r);     // start exactly on top of the original
  o.appendChild(c); document.body.appendChild(o);
  src.style.visibility = 'hidden';                                       // hide the original so it doesn't show twice
  document.documentElement.style.overflow = 'hidden';                    // lock page scroll while open

  /* Corner image: only if this card has data-img. It is added only after the file loads, so a missing file leaves nothing at all */
  var pic = null, closed = false;
  if (src.dataset.img){
    var im = new Image(); im.alt = '';
    im.onload = function(){
      if (closed) return;                                                // card already closed while loading
      pic = document.createElement('div'); pic.className = 'pic'; pic.appendChild(im);
      o.insertBefore(pic, c);                                            // behind the card
      pic.offsetHeight;                                                  // force a reflow so the slide-in animation plays
      pic.classList.add('show');
    };
    im.src = src.dataset.img;                                            // if loading fails, onload never fires and nothing is shown
  }
  function close(){
    if (closed) return; closed = true; document.removeEventListener('keydown', kd);
    if (pic) pic.classList.remove('show');                               // slide the corner image back out
    var t = src.getBoundingClientRect();                                 // original card's CURRENT position
    c.style.overflow = 'hidden'; c.classList.add('closing'); o.classList.remove('on'); // details fade, backdrop clears
    setTimeout(function(){ place(t); }, 120);                            // then fold back into the original spot
    setTimeout(function(){ o.remove(); src.style.visibility=''; document.documentElement.style.overflow=''; src.focus({preventScroll:true}); }, 640); // remove the copy, restore the original, give keyboard focus back
  }
  function kd(e){ if (e.key == 'Escape') close(); }                      // Esc closes too
  document.addEventListener('keydown', kd);
  o.onclick = function(e){ if (e.target === o || e.target.classList.contains('xb')) close(); }; // click backdrop or ×

  requestAnimationFrame(function(){
    var w = Math.min(680, innerWidth*.92);                               // final width
    c.style.width = w+'px'; c.style.height = 'auto';                     // measure natural height at that width
    var H = Math.min(c.offsetHeight, innerHeight*.86);
    place(r); c.offsetHeight;                                            // snap back to start (offsetHeight forces the browser to apply it)
    o.classList.add('on');
    place({left:(innerWidth-w)/2, top:Math.max(20,(innerHeight-H)/2), width:w, height:H}); // animate to the centre
    setTimeout(function(){ c.style.overflow = 'auto'; var xb = c.querySelector('.xb'); if (xb) xb.focus({preventScroll:true}); }, 520); // after the animation: allow scrolling inside tall cards, focus the × for keyboard users
  });
}
/* One click listener for the whole page: any click on an expandable card opens it (clicks on links are left alone) */
document.addEventListener('click', function(e){
  var c = e.target.closest('.card[data-x]');
  if (c && !e.target.closest('a')) openCard(c);
});

/* Keyboard: Tab to a card, then Enter or Space opens it */
document.addEventListener('keydown', function(e){
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card[data-x]')){ e.preventDefault(); openCard(e.target); }
});

/* ---------- 9. STAR-NETWORK BACKGROUND ---------- */
var cv = document.getElementById('stars'), cx = cv.getContext('2d'), N = [], mx = -999, my = -999; // N = list of stars, mx/my = mouse
function rs(){ cv.width = innerWidth; cv.height = innerHeight; } rs(); addEventListener('resize', rs); // keep canvas full-screen
for (var i = 0; i < 60; i++) N.push({x:Math.random()*innerWidth, y:Math.random()*innerHeight, vx:Math.random()-.5, vy:Math.random()-.5, tw:Math.random()*6}); // 60 random stars
addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; });
(function f(t){                                                          // runs every frame (t = time in ms)
  cx.clearRect(0, 0, cv.width, cv.height);
  var cs = getComputedStyle(document.body),
      rgb = cs.getPropertyValue('--nn').trim() || '200,30,77',           // star + line colour for the current theme
      acc = cs.getPropertyValue('--acc-rgb').trim() || '211,205,208';    // colour of the cursor lines
  N.forEach(function(a,i){
    a.x += a.vx*.4; a.y += a.vy*.4;                                      // drift slowly
    if (a.x<0 || a.x>cv.width) a.vx *= -1; if (a.y<0 || a.y>cv.height) a.vy *= -1; // bounce off the edges
    var tw = .5 + .5*Math.sin(t/700 + a.tw);                             // twinkle value 0..1
    cx.fillStyle = 'rgba('+rgb+','+(.4+.5*tw)+')'; cx.beginPath(); cx.arc(a.x, a.y, 1.2+tw*1.4, 0, 7); cx.fill(); // draw the star
    for (var j = i+1; j < N.length; j++){                                // join nearby stars with faint lines
      var b = N[j], d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < 140){ cx.strokeStyle = 'rgba('+rgb+','+(1-d/140)*.45+')'; cx.beginPath(); cx.moveTo(a.x,a.y); cx.lineTo(b.x,b.y); cx.stroke(); }
    }
    var dm = Math.hypot(a.x-mx, a.y-my);                                 // stars near the cursor connect to it
    if (dm < 180){ cx.strokeStyle = 'rgba('+acc+','+(1-dm/180)*.8+')'; cx.beginPath(); cx.moveTo(a.x,a.y); cx.lineTo(mx,my); cx.stroke(); }
  });
  requestAnimationFrame(f);
})(0);

/* ---------- 10. QUANTUM WAVE-PACKET (hero card) ---------- */
var wv = document.getElementById('wv'), wc = wv.getContext('2d');
(function w(t){
  var W = wv.width = wv.clientWidth, H = wv.height = 170, mid = H/2,
      cs = getComputedStyle(document.body),
      acc = cs.getPropertyValue('--acc').trim() || '#d3cdd0',            // wave colour follows the theme
      pri = cs.getPropertyValue('--pri').trim() || '#c81e4d';            // probability-density colour
  wc.clearRect(0, 0, W, H);
  wc.lineWidth = 1; wc.strokeStyle = acc; wc.globalAlpha = .2; wc.beginPath(); wc.moveTo(0,mid); wc.lineTo(W,mid); wc.stroke(); wc.globalAlpha = 1; // centre axis
  var c = W/2 + Math.sin(t/1800)*W*.22;                                  // the packet slides left and right
  wc.beginPath();                                                        // the wave: sine × gaussian envelope
  for (var x = 0; x < W; x += 2){ var e = Math.exp(-Math.pow((x-c)/(W*.17), 2)); wc.lineTo(x, mid - e*50*Math.sin(x*.09 - t/200)); }
  wc.strokeStyle = acc; wc.lineWidth = 2; wc.stroke();
  wc.beginPath(); wc.moveTo(0, H-6);                                     // the probability density |ψ|² along the bottom
  for (x = 0; x < W; x += 2){ e = Math.exp(-Math.pow((x-c)/(W*.17), 2)); wc.lineTo(x, H-6 - e*e*60); }
  wc.strokeStyle = pri; wc.lineWidth = 1.5; wc.stroke();
  requestAnimationFrame(w);
})(0);
