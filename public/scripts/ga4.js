/* Google Analytics 4 — Casa Mult Visată
 * Loaded ONLY after explicit cookie consent (cmv_consent === 'accepted').
 * No gtag/network request fires before consent → GDPR + ePrivacy (RO 2025) safe.
 * Hooks into the cookie-banner contract: cookie `cmv_consent` + `cmv:consent` event.
 */
(function () {
  var GA_ID = 'G-D1RCYXKEN3';
  var started = false;

  function start() {
    if (started) return;
    started = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function check(v) { if (v === 'accepted') start(); }

  // Already consented on a previous visit?
  try {
    var m = document.cookie.match(/(?:^|;\s*)cmv_consent=([^;]+)/);
    if (m) check(decodeURIComponent(m[1]));
  } catch (e) {}

  // Consent given this visit (banner dispatches this event).
  window.addEventListener('cmv:consent', function (e) {
    check(e && e.detail ? e.detail.value : null);
  });
})();
