/* ============================================================
   PROJET-DETAIL.JS — Page projet individuelle
   ============================================================
   Gère : scroll reveal, nav shadow, entrée de page.
   Léger, autonome, pas de dépendance à app.js.
   ============================================================ */

(function () {
  'use strict';

  /* ==================================================================
     1. NAV — Entrance + scroll shadow + title reveal
     ================================================================== */
  var nav = document.querySelector('.projet-nav');

  if (nav) {
    /* Entrance animation */
    requestAnimationFrame(function () {
      nav.classList.add('is-visible');
    });

    /* Shadow on scroll */
    var scrollThreshold = 60;

    function updateNavShadow() {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateNavShadow, { passive: true });
    updateNavShadow();
  }


  /* ==================================================================
     2. SCROLL REVEAL — IntersectionObserver
     ================================================================== */
  var revealElements = document.querySelectorAll('.projet-reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }


  /* ==================================================================
     3. KEYBOARD — Escape to go back
     ================================================================== */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var backLink = document.querySelector('.projet-nav-back');
      if (backLink) {
        window.location.href = backLink.href;
      }
    }
  });

})();
