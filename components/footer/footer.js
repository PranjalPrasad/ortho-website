/* ============================================================
   FOOTER JS — components/footer/footer.js
   Injects footer HTML + sets dynamic year
   ============================================================ */
(function () {
  'use strict';

  const FOOTER_PATH = 'components/footer/footer.html';

  function injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    fetch(FOOTER_PATH)
      .then(r => r.text())
      .then(html => {
        placeholder.outerHTML = html;
        initFooter();
      })
      .catch(() => {
        initFooter();
      });
  }

  function initFooter() {
    // Set current year
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
