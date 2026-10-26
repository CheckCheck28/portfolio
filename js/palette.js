/* =====================================================================
   palette.js — the colour-palette switcher in the bottom-left corner.
   Used by the main page, every blog post and the 404 page.

   What the visitor sees
     - A small round button showing the current palette colour.
     - Hover it and it stretches into a pill that says "Change palette :)".
     - Click it and the list of palettes opens upwards, each with its name, on a translucent frosted layer
       so the page stays faintly visible behind it. The list scrolls (mouse wheel, touch, or the arrows at
       its top and bottom); its scrollbar is hidden on purpose.
     - Pick one: the whole site recolours and the list closes.

   How it works
     1. Picking a palette sets  <html data-p="...">  (the colours live in css/palettes.css)
        and saves the choice in localStorage.
     2. A one-line script in each page's <head> re-applies the saved choice before the page
        paints, so every page opens in the same palette with no flash.
     3. This file also re-checks the saved choice when you return with the Back button and
        when you change it in another tab, so every open page stays in sync.
   ===================================================================== */

/* The palettes, in the order they appear in the list: [id used in css/palettes.css, name shown, swatch colour].
   Six are enough: each is clearly different from the others and stays readable on all four section backgrounds.
   Burgundy is the default (it has no data-p attribute). Mono has no colour accent, only black, white and gray.
   To add a palette: add a line here and a matching block in css/palettes.css. */
var PALS = [
  ['burgundy', 'Burgundy', '#c81e4d'],
  ['blue',     'Blue',     '#4f8cff'],
  ['green',    'Green',    '#2ecc8f'],
  ['violet',   'Violet',   '#a78bfa'],
  ['gold',     'Gold',     '#e7b52c'],
  ['mono',     'Mono',     '#d9d9dc']
];

(function(){
  var root = document.documentElement;

  /* ---------- Styles for the widget (injected here so this file works on its own) ---------- */
  var st = document.createElement('style');
  st.textContent = `
  /* Let page content receive pointer events outside the visible palette controls. */
  .pal{position:fixed;left:22px;bottom:22px;z-index:60;display:flex;flex-direction:column;align-items:flex-start;gap:10px;pointer-events:none}
  @media(max-width:520px){.pal{left:14px;top:calc(72px + env(safe-area-inset-top,0px));bottom:auto;flex-direction:column-reverse}}

  /* The button: a 44px circle that stretches into a pill on hover to reveal its label */
  .pal-btn{box-sizing:border-box;display:flex;align-items:center;gap:10px;height:44px;max-width:44px;padding:0 11px;border-radius:99px;pointer-events:auto;
    border:1px solid var(--line);background:var(--card);backdrop-filter:blur(12px);color:var(--fg);cursor:pointer;overflow:hidden;opacity:.8;
    font:400 12px var(--sans,sans-serif);letter-spacing:.1em;white-space:nowrap;
    transition:max-width .5s cubic-bezier(.2,.8,.2,1),opacity .3s}
  .pal-btn:hover,.pal-btn:focus-visible,.pal.open .pal-btn,.pal.hint .pal-btn{max-width:230px;opacity:1}
  .pal-btn span{opacity:0;transition:opacity .3s .1s}                                    /* the label is hidden until hover */
  .pal-btn:hover span,.pal-btn:focus-visible span,.pal.open .pal-btn span,.pal.hint .pal-btn span{opacity:1}

  /* Colour swatch: a plain circle in the palette's own colour */
  .pal-btn i,.pal-opt i{flex:none;border-radius:50%;background:var(--c,var(--p1));box-shadow:0 0 0 1px rgba(127,127,127,.4)}
  .pal-btn i{width:20px;height:20px}

  /* The list: a translucent, blurred "frosted glass" layer. It is hidden by clipping; opening shrinks the clip
     so it grows upward from the button. The first background is the fallback for browsers without color-mix(). */
  .pal-menu{box-sizing:border-box;display:flex;flex-direction:column;min-width:210px;padding:4px 8px;border-radius:18px;
    border:1px solid var(--line);background:rgba(127,127,127,.22);background:color-mix(in srgb,var(--bg) 52%,transparent);
    backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);
    clip-path:inset(100% 0 0 0 round 18px);opacity:0;pointer-events:none;
    transition:clip-path .55s cubic-bezier(.2,.8,.2,1),opacity .3s}
  .pal.open .pal-menu{clip-path:inset(0 0 0 0 round 18px);opacity:1;pointer-events:auto}
  @media(max-width:520px){.pal-menu{clip-path:inset(0 0 100% 0 round 18px)}.pal.open .pal-menu{clip-path:inset(0 0 0 0 round 18px)}}

  /* The scrolling part: about four and a half rows tall, so the half row hints that there is more.
     Its scrollbar is hidden; the arrows below scroll it instead. */
  .pal-scroll{display:flex;flex-direction:column;gap:2px;max-height:min(176px,36vh);overflow-y:auto;scroll-behavior:smooth;scrollbar-width:none}
  .pal-scroll::-webkit-scrollbar{display:none}

  /* Arrows at the top and bottom of the list (chevrons drawn with borders). They fade when there is nothing more to scroll. */
  .pal-arrow{flex:none;display:grid;place-items:center;height:26px;border:0;background:none;color:var(--fg);cursor:pointer;transition:opacity .3s}
  .pal-arrow::before{content:"";width:8px;height:8px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor}
  .pal-arrow.up::before{transform:translateY(2px) rotate(-135deg)}
  .pal-arrow.down::before{transform:translateY(-2px) rotate(45deg)}
  .pal-arrow.off{opacity:.2;pointer-events:none}

  /* One row per palette: swatch + name. Rows fade in one after another, bottom row first */
  .pal-opt{box-sizing:border-box;display:flex;flex:none;align-items:center;gap:12px;width:100%;padding:9px 12px;border:0;border-radius:12px;background:none;
    color:var(--fg);font:400 13px var(--sans,sans-serif);letter-spacing:.04em;text-align:left;cursor:pointer;
    opacity:0;transform:translateY(10px);transition:background .25s,opacity .35s,transform .45s cubic-bezier(.2,.8,.2,1)}
  .pal-opt i{width:18px;height:18px}
  .pal.open .pal-opt{opacity:1;transform:none;transition-delay:var(--d,0s)}
  .pal-opt:hover,.pal-opt:focus-visible{background:var(--line)}
  .pal-opt.on::after{content:"";margin-left:auto;width:6px;height:6px;border-radius:50%;background:var(--acc,currentColor)}   /* dot marks the active palette */
  `;
  document.head.appendChild(st);

  /* ---------- Build the widget ---------- */
  var w = document.createElement('div'); w.className = 'pal';
  w.innerHTML =
    '<div class="pal-menu" role="menu" aria-label="Colour palettes">' +
      '<button class="pal-arrow up off" type="button" aria-label="Scroll palettes up"></button>' +
      '<div class="pal-scroll">' +
        PALS.map(function(p, i){
          var d = ((PALS.length - 1 - i) * 0.035 + 0.1).toFixed(3);                   // bottom rows appear first
          return '<button class="pal-opt" type="button" role="menuitemradio" data-id="'+p[0]+'" style="--c:'+p[2]+';--d:'+d+'s"><i></i>'+p[1]+'</button>';
        }).join('') +
      '</div>' +
      '<button class="pal-arrow down" type="button" aria-label="Scroll palettes down"></button>' +
    '</div>' +
    '<button class="pal-btn" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Change palette"><i></i><span>Change palette :)</span></button>';
  document.body.appendChild(w);

  var btn = w.querySelector('.pal-btn'), sc = w.querySelector('.pal-scroll'),
      up = w.querySelector('.pal-arrow.up'), down = w.querySelector('.pal-arrow.down'),
      opts = [].slice.call(w.querySelectorAll('.pal-opt'));

  function valid(id){ return PALS.some(function(p){ return p[0] === id; }); }              // is it one of the palettes above?
  function saved(){ try { return localStorage.getItem('palette'); } catch(e){ return null; } }

  /* ---------- One-time palette reminder ---------- */
  var reminderKey = 'palette-reminder-seen', reminderTimer, reminderHandled = false,
      reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;              // don't animate the reminder for motion-sensitive visitors

  function savedReminder(){ try { return localStorage.getItem(reminderKey); } catch(e){ return null; } }
  function markReminderHandled(){
    reminderHandled = true;
    try { localStorage.setItem(reminderKey, '1'); } catch(e){}                          // remember across visits when storage is available
  }
  function cancelReminder(){
    if (reminderHandled) return;
    clearTimeout(reminderTimer);
    w.classList.remove('hint');                                                         // removing the class uses the pill's normal collapse transition
    markReminderHandled();
  }
  function showReminder(){
    if (reminderHandled) return;
    if (document.querySelector('.card.x')) return cancelReminder();                     // avoid competing with an expanded card
    markReminderHandled();
    w.classList.add('hint');
    setTimeout(function(){ w.classList.remove('hint'); }, 4000);                         // collapse with the button's normal transition
  }
  function afterLoader(){
    if (reminderHandled || reminderTimer) return;
    reminderTimer = setTimeout(showReminder, 1500);                                     // let the page settle after the loader exits
  }

  if (!reduceMotion && savedReminder() !== '1'){                                        // only schedule the first-visit reminder
    btn.addEventListener('pointerenter', cancelReminder, {once:true});
    document.addEventListener('pointerdown', cancelReminder, {once:true, capture:true});
    document.addEventListener('keydown', cancelReminder, {once:true, capture:true});
    document.addEventListener('click', cancelReminder, {once:true, capture:true});
    var wheelDelta = 0, wheelAt = 0;
    addEventListener('wheel', function(e){
      var now = Date.now();
      if (now - wheelAt > 200){ wheelDelta = 0; wheelAt = now; }                        // accumulate only a short burst of wheel movement
      wheelDelta += e.deltaY;
      if (Math.abs(wheelDelta) > 18) cancelReminder();                                  // cancel on intentional scrolling
    }, {passive:true});
    var touchY = 0, touchAt = 0;
    addEventListener('touchstart', function(e){
      touchY = e.touches[0].clientY;
      touchAt = Date.now();
    }, {passive:true});
    addEventListener('touchmove', function(e){
      if (Math.abs(e.touches[0].clientY - touchY) > 12 && Date.now() - touchAt < 250) cancelReminder(); // cancel for a quick swipe
    }, {passive:true});

    var loader = document.getElementById('loader'), loaderObserver, loaderWaitFinished = false;
    function loaderGone(){
      if (loaderWaitFinished) return;
      loaderWaitFinished = true;
      if (loaderObserver) loaderObserver.disconnect();
      if (loader) loader.removeEventListener('transitionend', onLoaderTransition);
      afterLoader();
    }
    function onLoaderTransition(e){
      if (e.target === loader && e.propertyName === 'transform') loaderGone();
    }
    if (!loader || getComputedStyle(loader).display === 'none') afterLoader();            // loader already skipped or absent
    else if (loader.classList.contains('done')) setTimeout(loaderGone, 1000);             // allow an in-progress exit animation to finish
    else {
      loader.addEventListener('transitionend', onLoaderTransition);
      loaderObserver = new MutationObserver(function(){
        if (loader.classList.contains('done')) setTimeout(loaderGone, 1000);
      });
      loaderObserver.observe(loader, {attributes:true, attributeFilter:['class']});
    }
  }

  /* ---------- Scroll arrows ---------- */
  function arrows(){                                                                       // grey out an arrow when its end is reached
    up.classList.toggle('off', sc.scrollTop <= 2);
    down.classList.toggle('off', sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2);
  }
  up.onclick   = function(e){ e.stopPropagation(); sc.scrollBy({top: -sc.clientHeight * .7, behavior:'smooth'}); };
  down.onclick = function(e){ e.stopPropagation(); sc.scrollBy({top:  sc.clientHeight * .7, behavior:'smooth'}); };
  sc.addEventListener('scroll', arrows, {passive:true});

  /* ---------- Apply a palette ---------- */
  function apply(id){
    if (id === 'burgundy') delete root.dataset.p; else root.dataset.p = id;                // burgundy = no attribute
    try { localStorage.setItem('palette', id); } catch(e){}                                // remember it (ignored if storage is blocked)
    opts.forEach(function(o){ var on = o.dataset.id === id; o.classList.toggle('on', on); o.setAttribute('aria-checked', on); });
    var cur = PALS.filter(function(p){ return p[0] === id; })[0];
    btn.querySelector('i').style.setProperty('--c', cur[2]);                               // the button shows the active colour
    setTimeout(function(){                                                                 // tint the phone browser bar to match
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.content = getComputedStyle(document.body).getPropertyValue('--bg').trim();
    }, 60);
  }

  /* ---------- Open / close ---------- */
  function toggle(open){
    w.classList.toggle('open', open); btn.setAttribute('aria-expanded', open);
    if (open){                                                                             // scroll the active palette into the middle of the list
      var a = w.querySelector('.pal-opt.on');
      if (a){ sc.style.scrollBehavior = 'auto'; sc.scrollTop = a.offsetTop - (sc.clientHeight - a.offsetHeight) / 2; sc.style.scrollBehavior = ''; }
      arrows();
    }
  }
  btn.onclick = function(e){ e.stopPropagation(); toggle(!w.classList.contains('open')); };
  opts.forEach(function(o){
    o.onclick = function(e){ e.stopPropagation(); apply(o.dataset.id); setTimeout(function(){ toggle(false); }, 280); };   // pick, then close
  });
  document.addEventListener('click', function(){ toggle(false); });                        // click anywhere else to close
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ toggle(false); btn.focus(); } });

  /* ---------- Keep every page in the same palette ---------- */
  function sync(){ var s = saved(); if (s && valid(s) && (root.dataset.p || 'burgundy') !== s) apply(s); }
  addEventListener('pageshow', sync);                                                      // the Back button restored an old copy of the page
  addEventListener('storage', function(e){ if (e.key === 'palette') sync(); });            // changed in another tab

  var start = root.dataset.p || 'burgundy';                                                // already set by the <head> script
  apply(valid(start) ? start : 'burgundy');
})();
