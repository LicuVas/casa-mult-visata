/* Cookie consent banner — Casa Mult Visată
 * GDPR + ePrivacy compliant (Romania 2025+):
 * - No third-party scripts/iframes load before consent
 * - "Accept" and "Refuse" buttons equally visible (ANSPDCP 2025 guideline)
 * - Choice stored 12 months; "reset" button on /cookies page clears it
 */
(function () {
	var COOKIE_NAME = 'cmv_consent';
	var COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 12 months

	function readConsent() {
		try {
			var m = document.cookie.match(/(?:^|;\s*)cmv_consent=([^;]+)/);
			return m ? decodeURIComponent(m[1]) : null;
		} catch (e) { return null; }
	}

	function writeConsent(value) {
		try {
			document.cookie =
				COOKIE_NAME + '=' + encodeURIComponent(value) +
				'; Max-Age=' + COOKIE_MAX_AGE +
				'; Path=/; SameSite=Lax';
		} catch (e) {}
		document.documentElement.setAttribute('data-cmv-consent', value);
		window.dispatchEvent(new CustomEvent('cmv:consent', { detail: { value: value } }));
	}

	function buildBanner() {
		var wrap = document.createElement('div');
		wrap.id = 'cmv-cookie-banner';
		wrap.setAttribute('role', 'dialog');
		wrap.setAttribute('aria-live', 'polite');
		wrap.setAttribute('aria-label', 'Consimțământ cookies');
		wrap.innerHTML =
			'<div class="cmv-cb-inner">' +
				'<div class="cmv-cb-text">' +
					'<strong>Site-ul folosește cookie-uri tehnice esențiale.</strong> ' +
					'Cu acordul tău folosim și cookie-uri pentru statistici anonime de trafic (Google Analytics) și pentru harta Google Maps de pe pagina de contact (Google poate seta cookie-uri). ' +
					'Detalii: <a href="/cookies/">Politica de Cookies</a> · <a href="/confidentialitate/">Confidențialitate</a>.' +
				'</div>' +
				'<div class="cmv-cb-actions">' +
					'<button type="button" class="cmv-cb-btn cmv-cb-btn-refuse" data-action="refuse">Refuz</button>' +
					'<button type="button" class="cmv-cb-btn cmv-cb-btn-accept" data-action="accept">Accept</button>' +
				'</div>' +
			'</div>';
		wrap.addEventListener('click', function (e) {
			var t = e.target;
			if (t && t.dataset && t.dataset.action) {
				writeConsent(t.dataset.action === 'accept' ? 'accepted' : 'refused');
				wrap.remove();
			}
		});
		return wrap;
	}

	function init() {
		var existing = readConsent();
		if (existing) {
			document.documentElement.setAttribute('data-cmv-consent', existing);
			return;
		}
		// Don't show banner on legal pages themselves (avoid double-prompt confusion)
		var p = window.location.pathname;
		if (p === '/confidentialitate/' || p === '/cookies/' || p === '/termeni/') return;
		document.body.appendChild(buildBanner());
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
