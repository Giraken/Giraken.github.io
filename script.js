/* Gifari Asmara — small enhancements.
   The page reads fine without this file; everything here is extra. */
(function () {
  'use strict';

  window.giraMotion = true; // tells the safety net in <head> that this file is running
  var root = document.documentElement;
  root.classList.add('js');
  var motion = root.classList.contains('motion');
  var each = function (selector, fn) { Array.prototype.forEach.call(document.querySelectorAll(selector), fn); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  // Other parts of this file can ask to hear when a page switch happens
  var beforeHome = []; // the home page is about to show again: measure what needs measuring
  var afterRoute = []; // a page switch just finished


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
      afterRoute.forEach(function (fn) { fn(id, ''); });
      return;
    }

    var wasOpen = openCase;
    cases.forEach(function (c) { c.classList.remove('is-open'); });
    root.classList.remove('case-open');
    openCase = null;
    document.title = homeTitle;
    beforeHome.forEach(function (fn) { fn(); });
    var anchor = id && document.getElementById(id);
    if (anchor) {
      if (wasOpen) jumpToElement(anchor);
    } else if (wasOpen) {
      jumpTo(homeScroll);
    }
    afterRoute.forEach(function (fn) { fn(id, wasOpen ? wasOpen.id : ''); });
  }
  window.addEventListener('hashchange', route);

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


  /* 5. Project filters. A group (the card grid, "More work") hides when none of its cards match. */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      each('[data-cat]', function (item) {
        var cats = item.getAttribute('data-cat').split(' ');
        item.hidden = !(filter === 'all' || cats.indexOf(filter) > -1);
      });
      each('[data-group]', function (group) {
        group.hidden = !group.querySelector('[data-cat]:not([hidden])');
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
  /* 8. Giant name in the footer: sized to fill the page width */
  var wordmark = document.querySelector('.wordmark');
  function fitWordmark() {
    if (!wordmark || !wordmark.offsetParent) return;
    wordmark.style.fontSize = '100px';
    var range = document.createRange();
    range.selectNodeContents(wordmark);
    var textWidth = range.getBoundingClientRect().width;
    if (textWidth) wordmark.style.fontSize = (100 * wordmark.clientWidth / textWidth * 0.995).toFixed(2) + 'px';
  }
  if (wordmark) {
    fitWordmark();
    window.addEventListener('resize', fitWordmark);
    window.addEventListener('load', fitWordmark);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmark);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', fitWordmark);
    beforeHome.push(fitWordmark);
    afterRoute.push(fitWordmark);
  }


  /* =====================================================================
     MOTION
     Only runs when the <head> script added "motion" to <html>:
     not for visitors who turned on reduced motion.
     ===================================================================== */
  if (motion) (function () {
    var hero = document.querySelector('.hero');
    var vh = window.innerHeight;
    var finePointer = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
    function make(tag, cls) { var el = document.createElement(tag); el.className = cls; return el; }
    function onScroll(fn) {
      var queued = false;
      function run() { queued = false; fn(); }
      window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(run); } }, { passive: true });
      window.addEventListener('resize', function () { vh = window.innerHeight; if (!queued) { queued = true; requestAnimationFrame(run); } });
      fn();
    }


    /* M1. Split text into letters (they rise out of a mask) or words (they light up).
       Screen readers get the original text once; the split copy is hidden from them. */
    function split(el, mode) {
      var full = el.textContent.replace(/\s+/g, ' ').trim();
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n = 0;
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        if (!node.nodeValue.trim()) return;
        var holder = document.createElement('span');
        if (mode !== 'words') holder.setAttribute('aria-hidden', 'true');
        node.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { holder.appendChild(document.createTextNode(' ')); return; }
          if (mode === 'words') {
            var word = make('span', 'qw');
            word.textContent = part;
            holder.appendChild(word);
            return;
          }
          var box = make('span', mode === 'type' ? 'tw' : 'w');
          Array.from(part).forEach(function (letter) {
            var ch = make('span', mode === 'type' ? 'tc' : 'ch');
            ch.style.setProperty('--i', n++);
            ch.textContent = letter;
            box.appendChild(ch);
          });
          holder.appendChild(box);
        });
        node.parentNode.replaceChild(holder, node);
      });
      if (mode !== 'words' && !el.closest('[aria-hidden="true"]')) {
        var sr = make('span', 'sr-only');
        sr.textContent = full;
        el.insertBefore(sr, el.firstChild);
      }
      el.classList.add('is-split');
    }
    each('[data-split]', function (el) { split(el, el.getAttribute('data-split')); });


    /* M2. Reveal on scroll: things fade up, headings rise out of a mask.
       Items that arrive together come in one after another. */
    function mark(selector, type) {
      each(selector, function (el) { if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', type); });
    }
    each('.view-home > section h2, .footer-title, .case-title, .c-h', function (h) {
      var mask = make('span', 'mask'), inner = make('span', 'mask-in');
      while (h.firstChild) inner.appendChild(h.firstChild);
      mask.appendChild(inner);
      h.appendChild(mask);
      h.setAttribute('data-reveal', 'mask');
    });
    mark('.portrait', 'photo');
    mark([
      '.section-lede', '.about-text .prose > p', '.folder', '.certs-note',
      '.vol-org', '.vol-meta', '.vol-desc', '.vol-text > .btn', '.vol-panel',
      '.footer-lede', '.cv-row', '.filters',
      '.case-tags', '.case-lede', '.cursor-tag', '.case-visual', '.case-facts', '.c-sec', '.case-end',
      '.timeline > .job', '.featured', '.project-grid > .project', '.more-title',
      '.skill', '.skill-example', '.flow > li', '.course-grid > .cert', '.links-big > li', '.c-projects > li'
    ].join(', '), 'up');
    mark('.wordmark', 'chars');

    var revealed = function (el) { el.classList.add('is-in'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var arriving = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
        arriving.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
        arriving.forEach(function (el, k) {
          el.style.setProperty('--d', Math.min(k, 6) * 90 + 'ms');
          revealed(el);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
      each('[data-reveal]', function (el) { io.observe(el); });
    } else {
      each('[data-reveal]', revealed);
    }


    /* M3. Hero: the loading screen first (once per visit), then the name rises */
    var stats = Array.prototype.slice.call(document.querySelectorAll('.stats strong'));
    var heroRunning = true; // a count that starts with the hero waits for it to finish
    function countUp() {
      heroRunning = hero && hero.getBoundingClientRect().bottom > 0 && document.querySelector('.stats').getBoundingClientRect().top < window.innerHeight * 0.9 && performance.now() < heroStart + 1500;
      stats.forEach(function (el, k) {
        var m = el.textContent.match(/^(\d+)(.*)$/);
        if (!m) return;
        var target = +m[1], rest = m[2], start = null;
        el.textContent = '0' + rest;
        function step(now) {
          if (start === null) start = now + (heroRunning ? 950 : 150) + k * 120;
          var t = clamp((now - start) / 1300, 0, 1);
          el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target) + rest;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    var heroStart = 0;
    function heroIn() {
      if (!hero || hero.classList.contains('is-in')) return;
      heroStart = performance.now();
      hero.classList.add('is-in');
      var strip = document.querySelector('.stats');
      if (!strip || !('IntersectionObserver' in window)) { countUp(); return; }
      var watch = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        watch.disconnect();
        countUp();
      }, { threshold: 0.5 });
      watch.observe(strip);
    }

    var intro = document.querySelector('.intro');
    if (root.classList.contains('intro-on') && intro && typeof intro.animate === 'function') {
      runIntro();
    } else {
      root.classList.remove('intro-on');
      if (intro) intro.remove();
      requestAnimationFrame(heroIn);
    }

    function runIntro() {
      var word = intro.querySelector('.intro-word');
      var count = intro.querySelector('.intro-count');
      var line = intro.querySelector('.intro-line');
      var inner = intro.querySelector('.intro-inner');
      var cols = Array.prototype.slice.call(intro.querySelectorAll('.intro-cols i'));
      var ease = 'cubic-bezier(.76, 0, .24, 1)';
      var leaving = false, fontsReady = !(document.fonts && document.fonts.ready);
      if (!fontsReady) document.fonts.ready.then(function () { fontsReady = true; });
      setTimeout(function () { fontsReady = true; }, 2500);

      requestAnimationFrame(function () { word.classList.add('is-in'); });
      var start = null;
      function tick(now) {
        if (leaving) return;
        if (start === null) start = now;
        var t = clamp((now - start) / 1150, 0, 1);
        var value = Math.round((1 - Math.pow(1 - t, 3)) * 100);
        if (value === 100 && !fontsReady) value = 99;
        count.textContent = ('00' + value).slice(-3);
        line.style.setProperty('--p', value / 100);
        if (value === 100) { setTimeout(leave, 200); return; }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      // A click or a key skips the wait
      var skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
      function skip() { leave(true); }
      skipEvents.forEach(function (type) { window.addEventListener(type, skip, { passive: true }); });

      function leave(fast) {
        if (leaving) return;
        leaving = true;
        var k = fast ? 0.6 : 1; // a skip plays the wipe faster
        skipEvents.forEach(function (type) { window.removeEventListener(type, skip); });
        try { sessionStorage.setItem('gira-intro', 'seen'); } catch (err) {}
        inner.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-14px)' }],
          { duration: 260 * k, easing: 'ease-in', fill: 'forwards' });
        // Champagne columns rise from the bottom, left first...
        var covering = cols.map(function (col, i) {
          return col.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
            { duration: 460 * k, delay: (140 + i * 45) * k, easing: ease, fill: 'forwards' });
        });
        covering[covering.length - 1].finished.then(function () {
          intro.style.background = 'transparent';
          inner.style.visibility = 'hidden';
          // ...then leave through the top, and the page underneath comes in
          var opening = cols.map(function (col, i) {
            col.style.transformOrigin = '50% 0';
            return col.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }],
              { duration: 560 * k, delay: i * 45 * k, easing: ease, fill: 'forwards' });
          });
          setTimeout(heroIn, 120);
          opening[opening.length - 1].finished.then(function () {
            root.classList.remove('intro-on');
            intro.remove();
          });
        });
      }
    }


    /* M4. Ribbon: keeps sliding, and scrolling pushes it faster (or back) */
    var ribbon = document.querySelector('.ribbon');
    var ribbonTrack = ribbon && ribbon.querySelector('.ribbon-track');
    if (ribbonTrack) {
      ribbonTrack.style.animation = 'none';
      var rx = 0, half = 1, vel = 0, hovering = false, onScreen = true, lastT = null, lastY = window.scrollY, ribbonRaf = 0;
      var measureRibbon = function () { half = ribbonTrack.scrollWidth / 2 || 1; };
      measureRibbon();
      window.addEventListener('resize', measureRibbon);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureRibbon);
      ribbon.addEventListener('pointerenter', function () { hovering = true; });
      ribbon.addEventListener('pointerleave', function () { hovering = false; });
      var ribbonFrame = function (now) {
        ribbonRaf = 0;
        if (!onScreen) return;
        var dt = lastT === null ? 0 : Math.min(0.05, (now - lastT) / 1000);
        lastT = now;
        var y = window.scrollY, scrollSpeed = dt ? (y - lastY) / dt : 0;
        lastY = y;
        var target = (hovering ? 0 : 38) + clamp(scrollSpeed * 0.35, -900, 900);
        vel += (target - vel) * 0.08;
        rx -= vel * dt;
        if (rx <= -half) rx += half;
        if (rx > 0) rx -= half;
        ribbonTrack.style.transform = 'translate3d(' + rx.toFixed(2) + 'px, 0, 0)';
        ribbonRaf = requestAnimationFrame(ribbonFrame);
      };
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          onScreen = entries[0].isIntersecting;
          if (onScreen && !ribbonRaf) { lastT = null; lastY = window.scrollY; ribbonRaf = requestAnimationFrame(ribbonFrame); }
        }).observe(ribbon);
      } else {
        ribbonRaf = requestAnimationFrame(ribbonFrame);
      }
    }


    /* M5. Quote: words light up as the band scrolls past; then the signature types itself */
    var band = document.querySelector('.quote-band');
    if (band) {
      var words = Array.prototype.slice.call(band.querySelectorAll('.qw'));
      var by = band.querySelector('.quote-by');
      onScroll(function () {
        if (!band.offsetParent) return;
        var r = band.getBoundingClientRect();
        var p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height / 2), 0, 1);
        var lit = Math.floor(p * (words.length + 0.999));
        words.forEach(function (w, k) { w.classList.toggle('on', k < lit); });
        band.style.setProperty('--q', p.toFixed(3));
        if (p >= 1 && by) by.classList.add('is-in');
      });
    }


    /* M6. Work experience: the timeline line draws down as you read */
    var jobs = Array.prototype.slice.call(document.querySelectorAll('.job'));
    if (jobs.length) {
      onScroll(function () {
        jobs.forEach(function (job) {
          var r = job.getBoundingClientRect();
          if (!r.height) return;
          var line = job.querySelector('.job-line');
          if (line) line.style.setProperty('--draw', clamp((vh * 0.78 - r.top) / r.height, 0, 1).toFixed(3));
        });
      });
    }


    /* M8. Mouse effects, on computers only: a ring that follows the cursor,
       and preview cards over the work experience roles */
    if (!finePointer) return;

    var dot = make('div', 'cursor-dot'), ring = make('div', 'cursor-ring');
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var mx = -100, my = -100, ringX = -100, ringY = -100, ringRaf = 0;
    var ringFrame = function () {
      ringX += (mx - ringX) * 0.2;
      ringY += (my - ringY) * 0.2;
      ring.style.transform = 'translate3d(' + ringX.toFixed(1) + 'px, ' + ringY.toFixed(1) + 'px, 0)';
      ringRaf = Math.abs(mx - ringX) + Math.abs(my - ringY) > 0.2 ? requestAnimationFrame(ringFrame) : 0;
    };
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      if (!root.classList.contains('cursor-on')) { ringX = mx; ringY = my; root.classList.add('cursor-on'); }
      dot.style.transform = 'translate3d(' + mx + 'px, ' + my + 'px, 0)';
      if (!ringRaf) ringRaf = requestAnimationFrame(ringFrame);
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest ? e.target : e.target.parentElement;
      if (!t) return;
      var card = t.closest('.project');
      var control = t.closest('a, button, [role="tab"], summary, label');
      var openCard = card && !(control && control.closest('.project-actions'));
      ring.classList.toggle('is-open', !!openCard);
      dot.classList.toggle('is-open', !!openCard);
      ring.classList.toggle('is-link', !openCard && !!control);
      ring.textContent = openCard ? 'Open' : '';
    });
    document.documentElement.addEventListener('mouseleave', function () { dot.classList.add('is-away'); ring.classList.add('is-away'); });
    document.documentElement.addEventListener('mouseenter', function () { dot.classList.remove('is-away'); ring.classList.remove('is-away'); });

    // Preview cards
    var preview = make('div', 'preview');
    preview.setAttribute('aria-hidden', 'true');
    document.body.appendChild(preview);
    var px = 0, py = 0, tx = 0, ty = 0, showing = null, previewRaf = 0;
    var previewFrame = function () {
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      var w = preview.offsetWidth, h = preview.offsetHeight;
      var left = clamp(px + 30, 12, window.innerWidth - w - 12);
      var topY = clamp(py - h / 2, 84, window.innerHeight - h - 12);
      var tilt = clamp((tx - px) * 0.12, -7, 7);
      preview.style.transform = 'translate3d(' + left.toFixed(1) + 'px, ' + topY.toFixed(1) + 'px, 0) rotate(' + tilt.toFixed(2) + 'deg)';
      previewRaf = showing || Math.abs(tx - px) + Math.abs(ty - py) > 0.3 ? requestAnimationFrame(previewFrame) : 0;
    };
    var hidePreview = function () { showing = null; preview.classList.remove('is-on'); };
    each('.job[data-preview]', function (job) {
      var template = document.getElementById(job.getAttribute('data-preview'));
      var zone = job.querySelector('.job-when');
      if (!template || !zone || !template.content) return;
      zone.addEventListener('pointerenter', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        if (showing !== template) {
          preview.innerHTML = '';
          preview.appendChild(template.content.cloneNode(true));
        }
        tx = e.clientX; ty = e.clientY;
        if (!preview.classList.contains('is-on')) { px = tx; py = ty; }
        showing = template;
        preview.classList.add('is-on');
        if (!previewRaf) previewRaf = requestAnimationFrame(previewFrame);
      });
      zone.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; });
      zone.addEventListener('pointerleave', hidePreview);
    });
    window.addEventListener('hashchange', hidePreview);
  })();

  route();
})();
