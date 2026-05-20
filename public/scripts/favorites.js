/* Favorites — localStorage-backed, ES5-safe, no deps.
 * Storage key: cmv_favorites — JSON array of property IDs (slugs).
 * Public API: window.CMV_FAV = { get, has, toggle, count }
 * Event: 'favorites-changed' (dispatched on document)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cmv_favorites';

  var HEART_OUTLINE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var HEART_FILLED = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

  function readList() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      // Keep only strings, dedupe
      var out = [];
      var seen = {};
      for (var i = 0; i < arr.length; i++) {
        var v = arr[i];
        if (typeof v === 'string' && v && !seen[v]) { out.push(v); seen[v] = 1; }
      }
      return out;
    } catch (e) { return []; }
  }

  function writeList(list) {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function has(id) {
    if (!id) return false;
    var list = readList();
    for (var i = 0; i < list.length; i++) if (list[i] === id) return true;
    return false;
  }

  function toggle(id) {
    if (!id) return false;
    var list = readList();
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i] === id) { idx = i; break; }
    if (idx >= 0) list.splice(idx, 1);
    else list.push(id);
    writeList(list);
    notifyChanged();
    return idx < 0;
  }

  function get() { return readList(); }
  function count() { return readList().length; }

  function notifyChanged() {
    try {
      document.dispatchEvent(new CustomEvent('favorites-changed', { detail: { count: count() } }));
    } catch (e) {
      // IE fallback
      var ev = document.createEvent('Event');
      ev.initEvent('favorites-changed', true, true);
      document.dispatchEvent(ev);
    }
    updateNavCount();
  }

  function updateNavCount() {
    var nodes = document.querySelectorAll('.fav-count');
    var n = count();
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = String(n);
  }

  function propIdFromItem(item) {
    if (!item) return '';
    var id = item.getAttribute('data-id');
    if (id) return id;
    var slug = item.getAttribute('data-slug');
    if (slug) return slug;
    // Last resort: derive from the first internal link
    var a = item.querySelector('a[href^="/proprietati/"]');
    if (a) {
      var href = a.getAttribute('href') || '';
      var m = href.match(/\/proprietati\/([^\/\?#]+)/);
      if (m) return m[1];
    }
    return '';
  }

  function buildButton(id) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fav-toggle';
    btn.setAttribute('data-fav-id', id);
    var active = has(id);
    if (active) btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.setAttribute('aria-label', active ? 'Elimină de la favorite' : 'Salvează la favorite');
    btn.setAttribute('title', active ? 'Elimină de la favorite' : 'Salvează la favorite');
    btn.innerHTML = active ? HEART_FILLED : HEART_OUTLINE;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var nowActive = toggle(id);
      btn.classList.toggle('is-active', nowActive);
      btn.setAttribute('aria-pressed', nowActive ? 'true' : 'false');
      btn.setAttribute('aria-label', nowActive ? 'Elimină de la favorite' : 'Salvează la favorite');
      btn.setAttribute('title', nowActive ? 'Elimină de la favorite' : 'Salvează la favorite');
      btn.innerHTML = nowActive ? HEART_FILLED : HEART_OUTLINE;
    });
    return btn;
  }

  function injectHearts(root) {
    var items = (root || document).querySelectorAll('.cs-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.querySelector(':scope > .cs-media > .fav-toggle')) continue;
      var media = item.querySelector('.cs-media');
      if (!media) continue;
      var id = propIdFromItem(item);
      if (!id) continue;
      // Ensure absolute positioning context exists on .cs-media (CSS handles it)
      var btn = buildButton(id);
      media.appendChild(btn);
    }
  }

  // Public API
  window.CMV_FAV = { get: get, has: has, toggle: toggle, count: count, inject: injectHearts };

  function init() {
    injectHearts(document);
    updateNavCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cross-tab sync
  window.addEventListener('storage', function (e) {
    if (e.key !== STORAGE_KEY) return;
    // Re-render existing heart buttons
    var btns = document.querySelectorAll('.fav-toggle[data-fav-id]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var id = b.getAttribute('data-fav-id');
      var active = has(id);
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
      b.innerHTML = active ? HEART_FILLED : HEART_OUTLINE;
    }
    updateNavCount();
  });
})();
