/* ============================================================
   MAIN JS — assets/js/main.js
   General page interactions: gallery filter, scroll animations
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initGalleryFilter();
    initScrollReveal();
    initSmoothScroll();
  }

  /* ---- Gallery filter ---- */
  function initGalleryFilter() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items   = document.querySelectorAll('.gallery-item');
    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;
        items.forEach(item => {
          if (cat === 'all' || item.dataset.cat === cat) {
            item.style.display = '';
            item.style.opacity = '0';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.3s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  /* ---- Scroll reveal ---- */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.service-tile, .other-service-item, .branch-card, .pillar, .gallery-item'
    );
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s`;
      io.observe(el);
    });

    // inject reveal-in class behavior via a style tag
    const style = document.createElement('style');
    style.textContent = '.reveal-in { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
  }

  /* ---- Smooth scroll for hash links ---- */
  function initSmoothScroll() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }
})();
