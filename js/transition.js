/* =====================================================================
   transition.js — smooth fade when moving between pages
   (main page <-> blog posts).

   Fade IN  : done purely in CSS (see "PAGE FADE" in css/style.css and css/blog.css).
   Fade OUT : done here. When you click a link to another page of this site,
              the page fades out first (0.35 s) and then the next page loads.

   Left alone on purpose: links to other websites, mail links, links that open
   in a new tab, Ctrl/Cmd-clicks, and #anchor links on the same page.
   Visitors who prefer reduced motion get normal instant navigation.
   ===================================================================== */
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;

  /* Coming back with the browser's Back button can show this page from memory still faded out - undo that */
  addEventListener('pageshow', function(e){ if (e.persisted) root.classList.remove('leaving'); });

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // not a plain click
    if (a.target === '_blank' || a.hasAttribute('download')) return;              // new tab / file download
    if (a.protocol !== location.protocol || a.host !== location.host) return;     // another site, or mailto:
    if (a.pathname === location.pathname && a.search === location.search) return; // same page (#anchors)
    e.preventDefault();
    root.classList.add('leaving');                                                // CSS fades the page out
    setTimeout(function(){ location.href = a.href; }, 350);                       // then go to the next page
  });
})();
