/* Gifari Asmara — small enhancements.
   The page reads fine without this file; everything here is extra. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var each = function (selector, fn) { Array.prototype.forEach.call(document.querySelectorAll(selector), fn); };


  /* 1. Case study pages
     The address decides what shows: index.html#habit-tracker opens that case study,
     anything else (#about, #projects, nothing) shows the home page. */
  var cases = Array.prototype.slice.call(document.querySelectorAll('.case[id]'));
  var homeTitle = document.title;
  var openCase = null;
  var homeScroll = 0;

  // Switching pages should jump, not glide, even though in-page links scroll smoothly
  function jumpTo(y) {
    try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); }
    catch (err) { window.scrollTo(0, y); }
  }
  function jumpToElement(el) {
    try { el.scrollIntoView({ behavior: 'instant', block: 'start' }); }
    catch (err) { el.scrollIntoView(); }
  }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function route() {
    var id = decodeURIComponent(location.hash.slice(1));
    var target = null;
    cases.forEach(function (c) { if (c.id === id) target = c; });

    if (target) {
      if (!openCase) homeScroll = window.scrollY;
      cases.forEach(function (c) { c.classList.toggle('is-open', c === target); });
      root.classList.add('case-open');
      openCase = target;
      var heading = target.querySelector('.case-title');
      document.title = (heading ? heading.textContent : 'Case study') + ' | Gifari Asmara';
      jumpTo(0);
      if (heading) heading.focus({ preventScroll: true });
      return;
    }

    var wasOpen = openCase;
    cases.forEach(function (c) { c.classList.remove('is-open'); });
    root.classList.remove('case-open');
    openCase = null;
    document.title = homeTitle;
    var anchor = id && document.getElementById(id);
    if (anchor) {
      if (wasOpen) jumpToElement(anchor);
    } else if (wasOpen) {
      jumpTo(homeScroll);
    }
  }
  window.addEventListener('hashchange', route);
  route();

  // "Back to top" inside a case study stays on that case study
  each('.to-top', function (link) {
    link.addEventListener('click', function (e) {
      if (!openCase) return;
      e.preventDefault();
      window.scrollTo(0, 0);
      var heading = openCase.querySelector('.case-title');
      if (heading) heading.focus({ preventScroll: true });
    });
  });


  /* 2. Photo: if photo.jpg is missing, remove the <img> so the initials show */
  each('img[data-photo]', function (img) {
    var drop = function () { img.remove(); };
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener('error', drop);
  });


  /* 3. Highlight the section you are reading in the top bar */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.navlinks a'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.hash.slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = linkFor[entry.target.id];
        if (link) link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    each('.view-home > section[id], footer[id]', function (section) { spy.observe(section); });
  }


  /* 4. Folder tabs in About */
  each('[data-tabs]', function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); });
    function select(index, moveFocus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (moveFocus) tabs[index].focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i); });
      tab.addEventListener('keydown', function (e) {
        var last = tabs.length - 1;
        var next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select(next, true);
      });
    });
    select(0);
  });


  /* 5. Project filters */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      each('[data-cat]', function (item) {
        var cats = item.getAttribute('data-cat').split(' ');
        item.hidden = !(filter === 'all' || cats.indexOf(filter) > -1);
      });
      each('.mini-grid', function (grid) {
        grid.hidden = !grid.querySelector('[data-cat]:not([hidden])');
      });
    });
  });


  /* 6. Copy email (some browsers block the clipboard; then the address is selected instead) */
  each('[data-copy]', function (button) {
    var label = button.textContent;
    function say(text) {
      button.textContent = text;
      setTimeout(function () { button.textContent = label; }, 2200);
    }
    function selectAddress() {
      var address = button.parentElement.querySelector('.lb-url');
      if (!address || !window.getSelection) return;
      var range = document.createRange();
      range.selectNodeContents(address);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      var fallback = function () { selectAddress(); say('Address selected'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { say('Copied'); }, fallback);
      } else {
        fallback();
      }
    });
  });


  /* 7. CV button: if cv.pdf isn't uploaded yet, show a short note instead of a broken page */
  var toast = document.querySelector('.toast');
  var toastTimer;
  function showToast(html) {
    if (!toast) return;
    toast.innerHTML = html;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 7000);
  }
  if (toast) toast.addEventListener('click', function (e) { if (e.target === toast) toast.hidden = true; });

  var cvLinks = Array.prototype.slice.call(document.querySelectorAll('[data-cv]'));
  var cvHref = cvLinks.length ? cvLinks[0].getAttribute('href') : '';
  var cvIsLocalFile = cvHref && !/^[a-z][a-z0-9+.-]*:/i.test(cvHref);
  if (cvIsLocalFile && /^https?:$/.test(location.protocol) && window.fetch) {
    var cvMissing = function () {
      cvLinks.forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('My CV file isn’t on this page yet. You’ll find my full experience on <a href="https://www.linkedin.com/in/gifari-asmara/">LinkedIn</a>.');
        });
      });
    };
    fetch(cvHref, { method: 'HEAD' }).then(function (response) {
      var type = response.headers.get('content-type') || '';
      if (!response.ok || type.indexOf('pdf') === -1) cvMissing();
    }, cvMissing);
  }
})();
