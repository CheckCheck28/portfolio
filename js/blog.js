/* =====================================================================
   blog.js — tiny script shared by every blog page.
   1. reading-progress bar        4. read time, share buttons
   2. table of contents + links   5. back-to-top button
   3. code-copy buttons
   ===================================================================== */

/* tint(): colour the phone's browser bar like the page background */
function tint(){ var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); }

/* ---------- 1. READING PROGRESS BAR ---------- */
var pr = document.getElementById('progress');
function progress(){
  var h = document.documentElement.scrollHeight - innerHeight;   // total scrollable distance
  pr.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; // 0 at top, 1 at bottom
}
addEventListener('scroll', progress, {passive:true}); progress();


/* ---------- 2. TABLE OF CONTENTS + HEADING LINKS ----------
   Every <h2> inside the article gets an id and a small "#" link, and a contents list is built from them.
   You never write the list by hand: add or rename an <h2> and it updates itself. */
var art = document.querySelector('article'), heads = [].slice.call(art.querySelectorAll('h2'));
heads.forEach(function(h){
  h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');   // "The core idea" -> "the-core-idea"
  var a = document.createElement('a'); a.className = 'hash'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-label', 'Link to this section');
  h.appendChild(a);
});
if (heads.length > 1){
  var toc = document.createElement('aside'); toc.className = 'toc'; toc.setAttribute('aria-label', 'Table of contents');
  toc.innerHTML = '<b>On this page</b><ol>' + heads.map(function(h){ return '<li><a href="#' + h.id + '">' + h.firstChild.textContent + '</a></li>'; }).join('') + '</ol>';
  art.parentNode.insertBefore(toc, art);
  /* Scroll-spy: highlight the contents link of the heading nearest the top of the screen */
  var links = [].slice.call(toc.querySelectorAll('a'));
  var spy = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting) links.forEach(function(l){ l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id); });
    });
  }, {rootMargin:'-20% 0px -70% 0px'});
  heads.forEach(function(h){ spy.observe(h); });
}

/* ---------- 3. COPY BUTTONS ON CODE BLOCKS ---------- */
[].slice.call(document.querySelectorAll('pre')).forEach(function(pre){
  var b = document.createElement('button'); b.className = 'copy'; b.type = 'button'; b.textContent = 'Copy';
  b.onclick = function(){
    (navigator.clipboard ? navigator.clipboard.writeText((pre.querySelector('code') || pre).innerText.trim()) : Promise.reject())
      .then(function(){ b.textContent = 'Copied'; }, function(){ b.textContent = 'Press Ctrl+C'; });
    setTimeout(function(){ b.textContent = 'Copy'; }, 1600);
  };
  pre.appendChild(b);
});

/* ---------- 4. READ TIME + SHARE BUTTONS ---------- */
var words = art.innerText.trim().split(/\s+/).length;                  // count the words in the article
document.getElementById('rt').textContent = Math.max(1, Math.round(words / 200)) + ' min read'; // ~200 words per minute
var pageUrl = location.href.split('#')[0], pageTitle = document.querySelector('h1').textContent;
document.getElementById('sh-li').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(pageUrl);
document.getElementById('sh-mail').href = 'mailto:?subject=' + encodeURIComponent(pageTitle) + '&body=' + encodeURIComponent(pageUrl);
var cl = document.getElementById('copylink');
cl.onclick = function(){
  (navigator.clipboard ? navigator.clipboard.writeText(pageUrl) : Promise.reject())
    .then(function(){ cl.textContent = 'Copied'; }, function(){ cl.textContent = 'Copy failed'; });
  setTimeout(function(){ cl.textContent = 'Copy link'; }, 1600);
};

/* ---------- 5. BACK-TO-TOP BUTTON ---------- */
var topBtn = document.getElementById('top');
addEventListener('scroll', function(){ topBtn.classList.toggle('show', scrollY > 700); }, {passive:true}); // show after scrolling down
topBtn.onclick = function(){ scrollTo({top:0, behavior:'smooth'}); };
tint();   // set the browser-bar colour once on load
