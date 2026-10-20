/* هُتاف HUTAF — main.js
   خفيف ومن غير مكتبات: رسم المنيو والمفضلات، السلة، «أنت فين»، وظهور هادي للعناصر. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var M = window.HUTAF_MENU;
  var byId = {};
  M.items.forEach(function (it) { byId[it.id] = it; });

  var fmt = function (n) { return Number.isInteger(n) ? String(n) : n.toFixed(2); };
  var SMALL = ['pudding', 'matcha', 'v60', 'spanish', 'cookies', 'icetea', 'dolce', 'mug', 'daily', 'majlis'];
  var src = function (key, small) { return 'assets/img/' + key + (small && SMALL.indexOf(key) > -1 ? '-sm' : '') + '.webp'; };
  var PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var CUP = '<svg viewBox="0 0 40 48" aria-hidden="true"><use href="assets/brand/sprite.svg#cup"/></svg>';
  var PUD = '<svg viewBox="0 0 55 37" aria-hidden="true"><use href="assets/brand/sprite.svg#pudding"/></svg>';
  var addBtn = function (it) { return '<button class="add js-add" data-id="' + it.id + '" aria-label="أضف ' + it.ar + '">' + PLUS + '</button>'; };
  var priceTag = function (it) { return '<span class="price">' + fmt(it.price) + '<small>ر.س</small></span>'; };
  var thumb = function (it) { return it.img ? '<img src="' + src(it.img, true) + '" alt="" loading="lazy" decoding="async" width="48" height="48">' : (it.cat === 'sweets' ? PUD : CUP); };

  /* ---------- 02 Favorites ---------- */
  var fav = $('.js-fav');
  fav.innerHTML = M.favorites.map(function (f) {
    var it = byId[f.id];
    var foot = it.price != null ? priceTag(it) + addBtn(it) : '<span class="card__ask">' + it.note + '</span>';
    return '<article class="card" role="listitem">' +
      '<div class="card__img"><img src="' + src(it.img, true) + '" srcset="' + src(it.img, true) + ' 480w, ' + src(it.img) + ' 896w" sizes="(min-width: 1000px) 30vw, (min-width: 600px) 42vw, 74vw" alt="' + it.ar + '" loading="lazy" decoding="async" width="480" height="642"></div>' +
      '<div class="card__body"><p class="card__en" lang="en">' + f.en + '</p><h3 class="card__name">' + it.ar + '</h3><p class="card__line">' + f.line + '</p>' +
      '<div class="card__foot">' + foot + '</div></div></article>';
  }).join('');

  /* ---------- 03 Menu ---------- */
  var tabs = $('.js-tabs'), panels = $('.js-panels');
  M.categories.forEach(function (c, i) {
    var t = document.createElement('button');
    t.className = 'tab'; t.id = 'tab-' + c.id; t.setAttribute('role', 'tab');
    t.setAttribute('aria-controls', 'panel-' + c.id); t.setAttribute('aria-selected', i === 0);
    t.innerHTML = '<span lang="en">' + c.en + '</span><small>' + c.ar + '</small>';
    tabs.appendChild(t);

    var p = document.createElement('div');
    p.className = 'panel'; p.id = 'panel-' + c.id; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', t.id);
    if (i) p.hidden = true;
    p.innerHTML = M.items.filter(function (it) { return it.cat === c.id; }).map(function (it) {
      var meta = it.cal != null ? '<span class="cal">' + it.cal + ' سعرة</span>' : (it.note || '');
      var end = it.price != null ? priceTag(it) + addBtn(it) : '<span class="row__dash">—</span><span></span>';
      return '<div class="row"><div class="row__thumb">' + thumb(it) + '</div><div><p class="row__name">' + it.ar + '</p><p class="row__meta">' + meta + '</p></div>' + end + '</div>';
    }).join('');
    panels.appendChild(p);
  });
  tabs.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    $$('.tab', tabs).forEach(function (x) { x.setAttribute('aria-selected', x === t); });
    $$('.panel', panels).forEach(function (p) { p.hidden = p.id !== t.getAttribute('aria-controls'); });
  });

  /* ---------- السلة ---------- */
  var tray = new Map();
  try {
    JSON.parse(localStorage.getItem('hutaf-tray') || '[]').forEach(function (p) {
      if (byId[p[0]] && byId[p[0]].price != null && p[1] > 0) tray.set(p[0], p[1]);
    });
  } catch (e) { /* التخزين مقفول — عادي */ }
  var save = function () { try { localStorage.setItem('hutaf-tray', JSON.stringify(Array.from(tray.entries()))); } catch (e) {} };

  var trayEl = $('.tray'), doneEl = $('.done');
  var render = function () {
    var count = 0, total = 0;
    tray.forEach(function (q, id) { count += q; total += q * byId[id].price; });
    $('.js-tray-count').textContent = count;
    $('.js-tray-total').textContent = total.toFixed(2);
    $('.js-checkout').disabled = !count;
    $('.js-tray-body').innerHTML = count
      ? Array.from(tray.entries()).map(function (e) {
          var it = byId[e[0]];
          return '<div class="titem"><div class="titem__img">' + thumb(it) + '</div><div><p class="titem__name">' + it.ar + '</p><span class="titem__price">' + fmt(it.price) + ' ر.س</span></div>' +
            '<div class="qty"><button data-q="1" data-id="' + it.id + '" aria-label="زوّد">+</button><span>' + e[1] + '</span><button data-q="-1" data-id="' + it.id + '" aria-label="قلّل">−</button></div></div>';
        }).join('')
      : '<p class="tray__empty">طلبك فاضي… ابدأ بقهوة اليوم؟</p>';
  };
  var toastT;
  var toast = function (msg) {
    var t = $('.js-toast');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('is-on'); }, 1800);
  };
  var openLayer = function (el, on) {
    if (on) { el.hidden = false; requestAnimationFrame(function () { el.classList.add('is-open'); }); document.body.style.overflow = 'hidden'; }
    else { el.classList.remove('is-open'); setTimeout(function () { el.hidden = true; }, 300); document.body.style.overflow = ''; }
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.js-add');
    if (a) {
      var id = a.dataset.id;
      tray.set(id, (tray.get(id) || 0) + 1); save(); render();
      a.classList.add('is-added'); setTimeout(function () { a.classList.remove('is-added'); }, 600);
      var b = $('.tray-btn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
      toast('أُضيف ' + byId[id].ar + ' لطلبك');
      return;
    }
    var q = e.target.closest('.qty button');
    if (q) {
      var v = (tray.get(q.dataset.id) || 0) + Number(q.dataset.q);
      if (v > 0) tray.set(q.dataset.id, v); else tray.delete(q.dataset.id);
      save(); render(); return;
    }
    if (e.target.closest('.js-open-tray')) { openLayer(trayEl, true); return; }
    if (e.target.closest('.js-close-tray')) { openLayer(trayEl, false); return; }
    if (e.target.closest('.js-checkout')) {
      openLayer(trayEl, false);
      $('.js-order-num').textContent = '#H-' + (100 + Math.floor(Math.random() * 900));
      tray.clear(); save(); render();
      setTimeout(function () { openLayer(doneEl, true); }, 200);
      return;
    }
    if (e.target.closest('.js-close-done')) openLayer(doneEl, false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!trayEl.hidden) openLayer(trayEl, false);
    if (!doneEl.hidden) openLayer(doneEl, false);
    if (!sheet.hidden) toggleSheet(false);
  });
  render();

  /* ---------- Nav + قايمة الأقسام ---------- */
  var nav = $('#nav'), burger = $('.js-burger'), sheet = $('#sheet');
  var toggleSheet = function (on) {
    burger.setAttribute('aria-expanded', on);
    sheet.hidden = !on;
    nav.classList.toggle('is-solid', on || window.scrollY > 10);
  };
  burger.addEventListener('click', function () { toggleSheet(sheet.hidden); });
  sheet.addEventListener('click', function (e) { if (e.target.closest('a')) toggleSheet(false); });

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { nav.classList.toggle('is-solid', window.scrollY > 10 || !sheet.hidden); ticking = false; });
  }, { passive: true });

  /* ---------- «أنت فين» — القسم الحالي ---------- */
  var where = $('.js-where'), whereNo = $('.js-where-no'), whereName = $('.js-where-name');
  var sections = $$('.sec[data-chapter]');
  if ('IntersectionObserver' in window) {
    var current = null;
    var setCurrent = function (sec) {
      if (sec === current) return;
      current = sec;
      nav.classList.toggle('has-where', !!sec);
      $$('.nav__links a').forEach(function (a) { a.setAttribute('aria-current', !!sec && a.dataset.nav === sec.id); });
      if (sec) { whereNo.textContent = sec.dataset.chapter; whereName.textContent = sec.dataset.name; }
    };
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.set(en.target, en.intersectionRatio); else visible.delete(en.target); });
      // القسم اللي واخد نص الشاشة
      var mid = window.innerHeight * 0.4, pick = null;
      visible.forEach(function (r, s) { var b = s.getBoundingClientRect(); if (b.top <= mid && b.bottom > mid) pick = s; });
      setCurrent(pick);
    }, { threshold: [0, .25, .5, .75, 1] });
    sections.forEach(function (s) { io.observe(s); });
    window.addEventListener('scroll', function () {
      var mid = window.innerHeight * 0.4, pick = null;
      sections.forEach(function (s) { var b = s.getBoundingClientRect(); if (b.top <= mid && b.bottom > mid) pick = s; });
      setCurrent(pick);
    }, { passive: true });

    /* ---------- ظهور هادي ---------- */
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();
