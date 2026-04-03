/* ============================================================
   HEADER JS — components/header/header.js
   Injects header HTML, handles scroll, mobile menu, active links
   ============================================================ */
(function () {
  'use strict';

  const HEADER_PATH = 'components/header/header.html';

  function injectHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    fetch(HEADER_PATH)
      .then(r => r.text())
      .then(html => {
        placeholder.outerHTML = html;
        initHeader();
      })
      .catch(() => {
        // Fallback: header already inline or fetch failed
        initHeader();
      });
  }

  function initHeader() {
    handleScroll();
    handleMobileMenu();
    highlightActiveLink();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* Scroll shadow */
  function handleScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* Mobile hamburger */
  function handleMobileMenu() {
    const hamburger = document.getElementById('navHamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Mobile dropdowns
    document.querySelectorAll('.nav-dropdown .nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const parent = this.closest('.nav-dropdown');
          parent.classList.toggle('open');
        }
      });
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.header-nav')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });

    // Close on nav link click (smooth scroll)
    navLinks.querySelectorAll('a[href*="#"]').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Highlight active nav link based on URL hash / section in view */
  function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href*="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  /* Run */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
