/* هُتاف HUTAF — main.js
   GSAP + ScrollTrigger + Lenis. كل حاجة بتشتغل من غير مكتبات لو الـCDN وقع (من غير أنيميشن). */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var M = window.HUTAF_MENU;
  var byId = {};
  M.items.forEach(function (it) { byId[it.id] = it; });

  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = function () { return window.matchMedia('(min-width: 821px)').matches; };

  var fmt = function (n) { return Number.isInteger(n) ? String(n) : n.toFixed(2); };
  var img = function (key, small) { return 'assets/img/' + key + (small ? '-sm' : '') + '.webp'; };
  var PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var PUDDING = '<svg viewBox="0 0 55 37" aria-hidden="true"><use href="assets/brand/sprite.svg#pudding"/></svg>';
  var SMALL = ['pudding', 'matcha', 'v60', 'spanish', 'cookies', 'icetea', 'dolce', 'mug', 'daily', 'majlis'];
  var CUP = '<svg class="ico-cup" viewBox="0 0 40 48" aria-hidden="true"><use href="assets/brand/sprite.svg#cup"/></svg>';

  /* ============ Render: Signatures ============ */
  var track = $('.js-sig-track');
  if (track) {
    var html = M.signatures.map(function (s, i) {
      var it = byId[s.id];
      var price = it.price != null
        ? '<span class="card__price">' + fmt(it.price) + '<small>ر.س</small></span><button class="add js-add" data-id="' + it.id + '" aria-label="أضف ' + it.ar + '">' + PLUS + '</button>'
        : '<span class="card__ask">' + (it.note || 'اسأل عنه في الشبّاك') + '</span>';
      return '<article class="card">' +
        '<div class="card__img"><img src="' + img(it.img) + '" alt="' + it.ar + '" loading="lazy"></div>' +
        '<span class="card__no">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="card__tag">' + s.tag + '</span>' +
        '<div class="card__body"><h3 class="card__name">' + it.ar + '</h3><p class="card__en" lang="en" dir="ltr">' + it.en + '</p>' +
        '<p class="card__line">' + s.line + '</p><div class="card__foot">' + price + '</div></div>' +
        '</article>';
    }).join('');
    html += '<article class="card card--end"><div><h3>وفيه أكثر… بكثير</h3><p>قهوة اليوم، كركديه، براونيز، شوكلت دبي، كرانشي، ماربل كيك.</p></div><a href="#menu">القائمة كاملة ←</a></article>';
    track.innerHTML = html;
  }

  /* ============ Render: Menu ============ */
  var tabsEl = $('.tabs');
  var panelsEl = $('.js-menu-panels');
  if (tabsEl && panelsEl) {
    M.categories.forEach(function (c, i) {
      var b = document.createElement('button');
      b.className = 'tab'; b.setAttribute('role', 'tab'); b.id = 'tab-' + c.id;
      b.setAttribute('aria-controls', 'panel-' + c.id);
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.innerHTML = c.ar + '<small lang="en">' + c.en + '</small>';
      tabsEl.appendChild(b);

      var p = document.createElement('div');
      p.className = 'panel' + (i === 0 ? ' is-active' : '');
      p.id = 'panel-' + c.id; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', b.id);
      p.innerHTML = M.items.filter(function (it) { return it.cat === c.id; }).map(function (it) {
        var thumb = it.img
          ? '<div class="row__thumb"><img src="' + img(it.img, SMALL.indexOf(it.img) > -1) + '" alt="" loading="lazy"></div>'
          : '<div class="row__thumb row__thumb--empty">' + (it.cat === 'sweets' ? PUDDING : CUP) + '</div>';
        var cal = it.cal != null ? '<span class="row__cal">' + it.cal + ' سعرة</span>' : '';
        var right = it.price != null
          ? '<span class="row__price">' + fmt(it.price) + '<small>ر.س</small></span><button class="add js-add" data-id="' + it.id + '" aria-label="أضف ' + it.ar + '">' + PLUS + '</button>'
          : '<span class="row__price">—</span><span class="row__ask">' + (it.note || 'اسأل في الشبّاك') + '</span>';
        return '<div class="row">' + thumb + '<div><p class="row__name">' + it.ar + '</p><div class="row__meta"><i lang="en" dir="ltr">' + it.en + '</i>' + cal + '</div></div>' + right + '</div>';
      }).join('');
      panelsEl.appendChild(p);
    });

    var ink = $('.js-tabs-ink');
    var moveInk = function () {
      var a = $('.tab[aria-selected="true"]', tabsEl);
      if (!a || !ink) return;
      ink.style.width = a.offsetWidth + 'px';
      ink.style.left = '0px';
      ink.style.transform = 'translateX(' + a.offsetLeft + 'px)';
    };
    tabsEl.addEventListener('click', function (e) {
      var t = e.target.closest('.tab');
      if (!t) return;
      $$('.tab', tabsEl).forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
      $$('.panel', panelsEl).forEach(function (p) { p.classList.toggle('is-active', p.id === t.getAttribute('aria-controls')); });
      moveInk();
      if (hasGSAP && !reduce) {
        gsap.fromTo($$('.panel.is-active .row', panelsEl), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .045, ease: 'expo.out' });
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    window.addEventListener('resize', moveInk);
    document.fonts && document.fonts.ready.then(moveInk);
    moveInk();
  }

  /* ============ Tray (السلة) ============ */
  var tray = new Map();
  try {
    var saved = JSON.parse(localStorage.getItem('hutaf-tray') || '[]');
    saved.forEach(function (p) { if (byId[p[0]] && byId[p[0]].price != null) tray.set(p[0], p[1]); });
  } catch (e) { /* التخزين مقفول — عادي */ }
  var save = function () { try { localStorage.setItem('hutaf-tray', JSON.stringify(Array.from(tray.entries()))); } catch (e) {} };

  var trayEl = $('.tray');
  var renderTray = function () {
    var body = $('.js-tray-body');
    var count = 0, total = 0;
    tray.forEach(function (q, id) { count += q; total += q * byId[id].price; });
    $$('.js-tray-count').forEach(function (el) { el.textContent = count; });
    $('.js-tray-total').textContent = total.toFixed(2);
    $('.js-checkout').disabled = count === 0;
    if (!count) {
      body.innerHTML = '<div class="tray__empty"><svg viewBox="0 0 55 37" aria-hidden="true"><use href="assets/brand/sprite.svg#pudding"/></svg>طلبك فاضي… ابدأ بقهوة اليوم؟</div>';
      return;
    }
    body.innerHTML = Array.from(tray.entries()).map(function (e) {
      var it = byId[e[0]];
      var th = it.img ? '<img src="' + img(it.img, SMALL.indexOf(it.img) > -1) + '" alt="">' : (it.cat === 'sweets' ? PUDDING : CUP);
      return '<div class="titem"><div class="titem__img">' + th + '</div><div><p class="titem__name">' + it.ar + '</p><span class="titem__price">' + fmt(it.price) + ' ر.س</span></div>' +
        '<div class="qty"><button data-q="-1" data-id="' + it.id + '" aria-label="أقل">−</button><span>' + e[1] + '</span><button data-q="1" data-id="' + it.id + '" aria-label="أكثر">+</button></div></div>';
    }).join('');
  };
  var add = function (id, n) {
    var it = byId[id];
    if (!it || it.price == null) return;
    tray.set(id, (tray.get(id) || 0) + (n || 1));
    save(); renderTray();
    var b = $('.tray-btn');
    b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  };
  var toast = function (msg) {
    var t = $('.js-toast');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('is-on'); }, 2200);
  };
  var fly = function (fromEl, id) {
    if (!hasGSAP || reduce || !fromEl) return;
    var it = byId[id];
    var r = fromEl.getBoundingClientRect();
    var to = $('.tray-btn').getBoundingClientRect();
    var f = document.createElement('div');
    f.className = 'fly';
    f.innerHTML = it.img ? '<img src="' + img(it.img, SMALL.indexOf(it.img) > -1) + '" alt="">' : '';
    document.body.appendChild(f);
    gsap.set(f, { left: r.left + r.width / 2 - 32, top: r.top + r.height / 2 - 32, scale: .6, opacity: 0 });
    gsap.timeline({ onComplete: function () { f.remove(); } })
      .to(f, { opacity: 1, scale: 1, duration: .25, ease: 'back.out(2)' })
      .to(f, { left: to.left + to.width / 2 - 32, duration: .8, ease: 'power2.inOut' }, '>-0.05')
      .to(f, { top: to.top + to.height / 2 - 32, duration: .8, ease: 'back.in(1.4)' }, '<')
      .to(f, { scale: .2, opacity: 0, duration: .25 }, '>-0.2');
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.js-add');
    if (a) {
      add(a.dataset.id);
      fly(a, a.dataset.id);
      toast('أُضيف ' + byId[a.dataset.id].ar + ' لطلبك');
      return;
    }
    var q = e.target.closest('.qty button');
    if (q) {
      var id = q.dataset.id, v = (tray.get(id) || 0) + Number(q.dataset.q);
      if (v <= 0) tray.delete(id); else tray.set(id, v);
      save(); renderTray();
      return;
    }
    if (e.target.closest('.js-open-tray')) { openTray(true); return; }
    if (e.target.closest('.js-close-tray')) { openTray(false); return; }
    if (e.target.closest('.js-checkout')) {
      openTray(false);
      $('.js-order-num').textContent = '#H-' + String(Math.floor(100 + Math.random() * 900));
      var d = $('.done'); d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
      tray.clear(); save(); renderTray();
      return;
    }
    if (e.target.closest('.js-close-done')) { var dd = $('.done'); dd.classList.remove('is-open'); dd.setAttribute('aria-hidden', 'true'); }
  });
  var openTray = function (on) {
    trayEl.classList.toggle('is-open', on);
    trayEl.setAttribute('aria-hidden', on ? 'false' : 'true');
    if (window.__lenis) on ? window.__lenis.stop() : window.__lenis.start();
  };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { openTray(false); $('.done').classList.remove('is-open'); } });
  renderTray();

  /* ============ Combo builder ============ */
  var cD = $('.js-combo-drinks'), cS = $('.js-combo-sweets');
  if (cD && cS) {
    var pick = { d: 'daily-l', s: 'pudding' };
    var chip = function (id, group) {
      var it = byId[id];
      return '<button class="chip" role="radio" data-g="' + group + '" data-id="' + id + '" aria-checked="' + (pick[group] === id) + '"><span>' + it.ar.replace(' — ', ' ') + '</span><small>' + fmt(it.price) + ' ر.س</small></button>';
    };
    cD.innerHTML = M.comboDrinks.map(function (id) { return chip(id, 'd'); }).join('');
    cS.innerHTML = M.comboSweets.map(function (id) { return chip(id, 's'); }).join('');
    var lastTotal = 0;
    var thumbFor = function (id) {
      var it = byId[id];
      if (it.img && it.img !== 'hero' && it.img !== 'majlis') return img(it.img, true);
      if (it.cat === 'drinks' || it.cat === 'coffee') return id.indexOf('daily') === 0 ? 'assets/img/spanish-sm.webp' : 'assets/img/matcha-sm.webp';
      return 'assets/img/cookies-sm.webp';
    };
    var updateCombo = function () {
      var d = byId[pick.d], s = byId[pick.s];
      $('.js-combo-drink').textContent = d.ar; $('.js-combo-drink-p').textContent = fmt(d.price) + ' ر.س';
      $('.js-combo-sweet').textContent = s.ar; $('.js-combo-sweet-p').textContent = fmt(s.price) + ' ر.س';
      $('.js-combo-name').textContent = M.comboNames[pick.d + '+' + pick.s] || 'ثنائي على ذوقك';
      var ia = $('.js-combo-img-a'), ib = $('.js-combo-img-b');
      var srcA = thumbFor(pick.d);
      if (ia.getAttribute('src') !== srcA) ia.src = srcA;
      var srcB = thumbFor(pick.s);
      if (ib.getAttribute('src') !== srcB) ib.src = srcB;
      var total = d.price + s.price;
      var out = $('.js-combo-total');
      if (hasGSAP && !reduce) {
        var o = { v: lastTotal };
        gsap.to(o, { v: total, duration: .7, ease: 'power3.out', onUpdate: function () { out.textContent = o.v.toFixed(2); } });
        gsap.fromTo([ia, ib], { y: 16, opacity: .2 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: 'expo.out', clearProps: 'opacity' });
      } else out.textContent = total.toFixed(2);
      lastTotal = total;
    };
    document.addEventListener('click', function (e) {
      var c = e.target.closest('.chip');
      if (!c) return;
      pick[c.dataset.g] = c.dataset.id;
      $$('.chip[data-g="' + c.dataset.g + '"]').forEach(function (x) { x.setAttribute('aria-checked', x === c ? 'true' : 'false'); });
      updateCombo();
    });
    $('.js-combo-add').addEventListener('click', function (e) {
      add(pick.d); add(pick.s);
      fly(e.currentTarget, pick.s);
      toast('أُضيف الثنائي لطلبك');
    });
    updateCombo();
  }

  /* ============ Nav ============ */
  var nav = $('#nav');
  var burger = $('.js-burger');
  var drawer = $('.drawer-nav');
  burger.addEventListener('click', function () {
    var on = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', on);
    drawer.classList.toggle('is-open', on);
    drawer.setAttribute('aria-hidden', !on);
  });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { burger.click(); }); });

  var lastY = 0;
  var onScrollNav = function (y) {
    nav.classList.toggle('is-solid', y > 40);
    var hide = y > window.innerHeight * 1.2 && y > lastY && !drawer.classList.contains('is-open');
    nav.classList.toggle('is-hidden', hide);
    lastY = y;
  };

  /* ============ Hero video (desktop / mobile source) ============ */
  var video = $('.js-hero-video');
  if (video) {
    var mob = !isDesktop();
    video.poster = mob ? video.dataset.posterMobile : video.poster;
    video.src = mob ? video.dataset.srcMobile : video.dataset.srcDesktop;
    video.load();
    // iOS: لازم play/pause مرة عشان الـseek يشتغل
    var unlock = function () { var p = video.play(); if (p && p.then) p.then(function () { video.pause(); }).catch(function () {}); window.removeEventListener('touchstart', unlock); };
    window.addEventListener('touchstart', unlock, { passive: true });
  }
  var vTarget = 0, vRaf = 0;
  var seek = function (p) {
    if (!video || !video.duration) return;
    vTarget = Math.max(0, Math.min(video.duration - 0.05, p * video.duration));
    if (!vRaf) vRaf = requestAnimationFrame(function step() {
      vRaf = 0;
      if (Math.abs(video.currentTime - vTarget) > 0.01) video.currentTime = vTarget;
    });
  };

  /* ============ No GSAP fallback ============ */
  if (!hasGSAP) {
    document.body.classList.remove('is-loading');
    var l = $('.loader'); if (l) l.remove();
    $$('.js-chip').forEach(function (c) { c.style.opacity = 1; });
    window.addEventListener('scroll', function () { onScrollNav(window.scrollY); }, { passive: true });
    if (video) video.addEventListener('loadeddata', function () { video.loop = true; video.play().catch(function () {}); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ============ Lenis smooth scroll ============ */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', function (e) { ScrollTrigger.update(); onScrollNav(e.scroll); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  } else {
    window.addEventListener('scroll', function () { onScrollNav(window.scrollY); }, { passive: true });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2 || a.hasAttribute('data-demo-dead')) return;
      var t = $(id);
      if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: id === '#top' ? 0 : -70, duration: 1.4 });
      else t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ============ Split helpers ============ */
  var splitWords = function (el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var m = document.createElement('span'); m.className = 'wm';
            var i = document.createElement('span'); i.className = 'wi'; i.textContent = p;
            m.appendChild(i); frag.appendChild(m);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.tagName !== 'svg') walk(n);
      });
    };
    walk(el);
    return $$('.wi', el);
  };

  /* ============ Intro (loader → hero) ============ */
  var intro = function () {
    var heroIn = $$('.js-hero-in');
    gsap.set(heroIn, { yPercent: 110, opacity: 0 });
    var count = { v: 0 };
    var tl = gsap.timeline({
      onComplete: function () {
        document.body.classList.remove('is-loading');
        $('.loader').remove();
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
      }
    });
    tl.to(count, { v: 100, duration: reduce ? .1 : 1.5, ease: 'power2.inOut', onUpdate: function () { $('.js-count').textContent = Math.round(count.v); } })
      .to('.loader__fill', { y: 0, duration: reduce ? .1 : 1.5, ease: 'power2.inOut' }, 0)
      .to('.loader__logo', { opacity: 1, duration: .5 }, '-=.6')
      .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: reduce ? .1 : 1.1, ease: 'expo.inOut' }, '+=.15')
      .fromTo('.hero__media', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, '-=.75')
      .to(heroIn, { yPercent: 0, opacity: 1, duration: 1.2, stagger: .08, ease: 'expo.out' }, '-=1.45');
    gsap.set('.loader', { clipPath: 'inset(0 0 0% 0)' });
  };
  var started = false;
  var go = function () { if (started) return; started = true; intro(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(go, 150); });
  setTimeout(go, 1800);

  /* ============ Scroll scenes ============ */
  var mm = gsap.matchMedia();

  // --- Hero: الفيديو بيمشي مع السكرول ---
  mm.add('(min-width: 821px)', function () {
    var tl = gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=140%', pin: true, scrub: true, onUpdate: function (self) { seek(self.progress); } }
    });
    tl.to('.hero__copy', { yPercent: -14, opacity: 0, ease: 'power1.in', duration: .24 }, .4)
      .to('.hero__scroll', { opacity: 0, duration: .1 }, 0)
      .fromTo('.hero__chip--a', { opacity: 0, y: 30, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .14 }, .16)
      .fromTo('.hero__chip--b', { opacity: 0, y: 30, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .14 }, .3)
      .to('.hero__chip', { opacity: 0, y: -20, duration: .12 }, .62)
      .fromTo('.hero__end', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .2, ease: 'power2.out' }, .68)
      .to({}, { duration: .12 });   // نفَس صغير في الآخر قبل ما الهيرو يفك
  });
  mm.add('(max-width: 820px)', function () {
    gsap.to('.js-chip', { opacity: 1, y: 0, duration: .8, stagger: .15, delay: 2.4, ease: 'expo.out' });
    ScrollTrigger.create({ trigger: '.hero__media', start: 'top 62%', end: 'bottom 15%', scrub: true, onUpdate: function (s) { seek(s.progress); } });
  });

  // --- Split headings ---
  $$('[data-split]').forEach(function (h) {
    var words = splitWords(h);
    gsap.from(words, { yPercent: 115, duration: 1.15, stagger: .06, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 86%' } });
  });

  // --- Simple reveals ---
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: function (els) { gsap.fromTo(els, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .08, ease: 'expo.out', overwrite: true }); }
  });
  gsap.set('[data-reveal]', { opacity: 0 });

  // --- Clip reveals (الصور بتطلع من تحت لفوق) ---
  $$('[data-clip]').forEach(function (f) {
    var im = $('img', f);
    gsap.fromTo(f, { clipPath: 'inset(100% 0% 0% 0% round 34px)' }, { clipPath: 'inset(0% 0% 0% 0% round 34px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: f, start: 'top 85%' } });
    if (im && !im.hasAttribute('data-parallax')) gsap.from(im, { scale: 1.25, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 85%' } });
  });

  // --- Parallax ---
  $$('[data-parallax]').forEach(function (im) {
    var amt = parseFloat(im.getAttribute('data-parallax')) || -8;
    gsap.fromTo(im, { yPercent: 0 }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // --- Story: الكلام بيتنوّر كلمة كلمة ---
  var storyText = $('.js-words');
  if (storyText) {
    var parts = storyText.textContent.trim().split(/\s+/);
    storyText.innerHTML = parts.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    gsap.to($$('.w', storyText), { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: storyText, start: 'top 78%', end: 'bottom 45%', scrub: true } });
  }

  // --- Counters ---
  $$('.js-counter').forEach(function (c) {
    var to = parseFloat(c.dataset.to), dec = parseInt(c.dataset.dec || '0', 10), pre = c.dataset.prefix || '';
    var o = { v: 0 };
    ScrollTrigger.create({ trigger: c, start: 'top 90%', once: true, onEnter: function () {
      gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: function () { c.textContent = pre + o.v.toFixed(dec); } });
    } });
  });

  // --- Signatures: سكرول أفقي (ديسكتوب) ---
  mm.add('(min-width: 821px)', function () {
    var t = $('.js-sig-track');
    var dist = function () { return Math.max(0, t.scrollWidth - window.innerWidth); };
    var tw = gsap.to(t, {
      x: function () { return dist(); },   // RTL: المحتوى بيتزق يمين عشان يبان اللي على الشمال
      ease: 'none',
      scrollTrigger: {
        trigger: '.sig', start: 'top top', end: function () { return '+=' + dist(); },
        pin: '.sig__pin', scrub: 1, invalidateOnRefresh: true,
        onUpdate: function (s) { gsap.set('.js-sig-bar', { scaleX: s.progress }); }
      }
    });
    $$('.card', t).forEach(function (card) {
      gsap.fromTo(card, { rotate: -3, y: 40 }, {
        rotate: 0, y: 0, ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: tw, start: 'right left', end: 'center center', scrub: true }   // RTL: الكارت بيدخل من الشمال
      });
    });
  });

  // --- Feature stamp & cards on mobile ---
  mm.add('(max-width: 820px)', function () {
    gsap.from('.card', { y: 50, opacity: 0, duration: 1, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: '.sig__track', start: 'top 85%' } });
  });

  // --- Coffee box card ---
  gsap.fromTo('.box__media img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.box', start: 'top bottom', end: 'center center', scrub: true } });

  // --- Footer mark: HUTAF بيطلع حرف حرف ---
  gsap.from('.foot__mark svg', { yPercent: 60, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.foot', start: 'top 85%' } });

  /* ============ Live wave (Visit) ============ */
  var wave = $('.js-wave-a');
  if (wave && !reduce) {
    var ph = 0, on = false;
    ScrollTrigger.create({ trigger: '.visit', start: 'top bottom', end: 'bottom top', onToggle: function (s) { on = s.isActive; } });
    gsap.ticker.add(function () {
      if (!on) return;
      ph += 0.018;
      var d = 'M0 120 L0 ' + (60 + Math.sin(ph) * 14).toFixed(1);
      for (var x = 0; x <= 1440; x += 60) {
        var y = 60 + Math.sin(ph + x / 190) * 18 + Math.sin(ph * 1.7 + x / 90) * 6;
        d += ' L' + x + ' ' + y.toFixed(1);
      }
      wave.setAttribute('d', d + ' L1440 120 Z');
    });
  }

  /* ============ Magnetic buttons ============ */
  if (window.matchMedia('(hover: hover)').matches && !reduce) {
    $$('.js-magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .32, duration: .5, ease: 'power3.out' });
      });
      b.addEventListener('pointerleave', function () { gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1, .4)' }); });
    });
  }

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
