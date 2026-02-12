/* ============================================================
   APP.JS — Portfolio Romain SCHRIJVERS
   ============================================================
   Script principal unifié.
   Gère : snap navigation, nav header, dots, toast,
   formes décoratives, tabs, contenu placeholder.
   ============================================================ */

(function () {
  'use strict';

  var sections = document.querySelectorAll('.page-section');
  if (!sections.length) return;

  var SECTION_LABELS = [
    'Accueil',
    'Projets suivis',
    'Projets personnels',
    'À propos',
    'Contact'
  ];

  var currentIndex = 0;
  var toastTimer = null;
  var isScrolling = false;
  var SCROLL_COOLDOWN = 1200;
  var wheelAccumulator = 0;
  var wheelTimer = null;
  var WHEEL_THRESHOLD = 50;


  /* ==================================================================
     SNAP NAVIGATION — programmatic section jumps
     ================================================================== */

  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (index === currentIndex || isScrolling) return;

    isScrolling = true;
    currentIndex = index;
    sections[index].scrollIntoView({ behavior: 'smooth' });

    setTimeout(function () {
      isScrolling = false;
    }, SCROLL_COOLDOWN);
  }

  /* Wheel — accumulate delta, fire only once per gesture */
  document.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (isScrolling) return;

    wheelAccumulator += e.deltaY;

    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () {
      wheelAccumulator = 0;
    }, 200);

    if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
      var dir = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      clearTimeout(wheelTimer);
      goToSection(currentIndex + dir);
    }
  }, { passive: false });

  /* Keyboard — arrows, page up/down, space */
  document.addEventListener('keydown', function (e) {
    var dir = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
    if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
    if (!dir) return;
    e.preventDefault();
    goToSection(currentIndex + dir);
  });


  /* ==================================================================
     INJECTION — NAVIGATION HEADER
     ================================================================== */
  function injectNav() {
    var nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'Navigation principale');

    SECTION_LABELS.forEach(function (label, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'site-nav-separator';
        sep.setAttribute('aria-hidden', 'true');
        nav.appendChild(sep);
      }

      var a = document.createElement('a');
      a.className = 'site-nav-link';
      if (i === 0) a.classList.add('is-active');
      a.textContent = label;
      a.href = '#';
      a.dataset.index = i;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        goToSection(i);
      });
      nav.appendChild(a);
    });

    document.body.prepend(nav);

    /* Animate nav entrance on page load */
    requestAnimationFrame(function () {
      nav.classList.add('is-visible');
      nav.classList.add('site-nav--dark');
    });

    return nav;
  }


  /* ==================================================================
     INJECTION — INDICATEUR DE SECTION (DOTS)
     ================================================================== */
  function injectIndicator() {
    var wrap = document.createElement('div');
    wrap.className = 'section-indicator';
    wrap.setAttribute('aria-hidden', 'true');

    sections.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'section-indicator-dot';
      if (i === 0) dot.classList.add('section-indicator-dot--active');
      dot.addEventListener('click', function () {
        goToSection(i);
      });
      wrap.appendChild(dot);
    });

    document.body.appendChild(wrap);
    return wrap;
  }


  /* ==================================================================
     INJECTION — TOAST DE SECTION
     ================================================================== */
  function injectToast() {
    var toast = document.createElement('div');
    toast.className = 'section-toast';
    toast.setAttribute('aria-hidden', 'true');
    document.body.appendChild(toast);
    return toast;
  }


  /* ==================================================================
     INJECTION — FORME DÉCORATIVE HERO (désactivée — nouveau hero immersif)
     ================================================================== */
  function injectHeroShape() {
    /* No-op: hero shapes are now in HTML */
  }


  /* ==================================================================
     INJECTION — FORME DÉCORATIVE À PROPOS
     ================================================================== */
  function injectAboutShape() {
    var photoWrap = document.querySelector('.a-propos-photo');
    if (!photoWrap) return;
    photoWrap.style.position = 'relative';

    var shape = document.createElement('div');
    shape.className = 'about-shape';
    shape.setAttribute('aria-hidden', 'true');
    photoWrap.insertBefore(shape, photoWrap.firstChild);
  }


  /* ==================================================================
     INJECTION — TITRE « À PROPOS »
     ================================================================== */
  function injectAboutTitle() {
    var content = document.querySelector('.a-propos-content');
    if (!content) return;
    var title = document.createElement('h2');
    title.className = 'section-title a-propos-title';
    title.textContent = 'À propos';
    content.insertBefore(title, content.firstChild);
  }


  /* ==================================================================
     TAB SWITCHING — À PROPOS
     ================================================================== */
  function initTabs() {
    var tabs = document.querySelectorAll('.a-propos-tab');
    var panels = document.querySelectorAll('.a-propos-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('a-propos-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(function (p) {
          p.classList.remove('a-propos-panel--active');
          p.hidden = true;
        });

        tab.classList.add('a-propos-tab--active');
        tab.setAttribute('aria-selected', 'true');

        var panelId = tab.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add('a-propos-panel--active');
          panel.hidden = false;
        }
      });
    });
  }


  /* ==================================================================
     CONTENU PLACEHOLDER — À PROPOS
     ================================================================== */
  function fillAboutContent() {
    var content = {
      'tab-panel-insa': {
        text: 'Ma formation d\'ingénieur en informatique à l\'INSA Lyon m\'apporte une base technique solide, complétée par une approche systémique des projets numériques et une forte culture ingénieur orientée résolution de problèmes, performance et impact concret.\n\nCette formation me permet d\'allier expertise technique, rigueur d\'ingénieur et compréhension globale des besoins métiers pour concevoir des solutions digitales efficaces et pérennes.',
        highlightsTitle: 'Compétences clés',
        highlights: [
          'Formation d\'ingénieur informatique reconnue, combinant fondamentaux et ingénierie logicielle appliquée',
          'Compétences full-stack : développement web, data, architecture logicielle et systèmes',
          'Approche projet poussée avec projets industriels et méthodes d\'ingénierie collaboratives',
          'Forte culture scientifique (maths, stats, optimisation) au service de solutions robustes',
          'Sensibilisation aux enjeux business, innovation et entrepreneuriat'
        ]
      },
      'tab-panel-etic': {
        text: 'En parallèle de ma formation d\'ingénieur à l\'INSA Lyon, j\'ai développé une solide expérience terrain en tant que responsable commercial au sein de la Junior-Entreprise ETIC INSA Technologies (≈500k€ de CA annuel).\n\nCette expérience complète ma formation technique en m\'apportant une forte compréhension business, me permettant de concevoir des solutions techniques réellement utiles et alignées avec les objectifs métiers.',
        highlightsTitle: 'Faits marquants',
        highlights: [
          'Titre de meilleure Junior-Entreprise ingénieur 2024-2025',
          'Acquisition record : +275 % vs N-1 et +170 % vs N-2',
          'Développement de nouvelles offres IA et RSE',
          '+100k€ de projets signés personnellement en prospection',
          '+10 projets pilotés (digital, stratégie, ingénierie)',
          'Management d\'un pôle d\'environ 40 personnes'
        ]
      },
      'tab-panel-sport': {
        text: 'Mon parcours sportif a occupé une place importante dans mon développement personnel et professionnel. Cursus complet en sport-études football, puis centre de formation du Mans FC pendant plus de deux ans, notamment comme capitaine au niveau national. Poursuite à l\'INSA Lyon en section sportif de haut niveau (SSHN) avec l\'AS Saint-Priest.\n\nArrêt récent de la pratique compétitive afin de me consacrer pleinement à mon développement professionnel en informatique.',
        highlightsTitle: 'Palmarès',
        highlights: [
          'Plus de deux ans en centre de formation au Mans FC, capitaine au niveau national',
          'Quart de finale de Coupe Gambardella avec l\'AS Saint-Priest',
          'Entraînements avec le groupe national de l\'AS Saint-Priest',
          'Champion Coupe de France des Grandes Écoles avec l\'INSA Lyon',
          'Vainqueur Coupe de France des Grandes Écoles Saint-Gobain avec l\'INSA Lyon'
        ]
      }
    };

    var tabImages = {
      'tab-panel-insa': 'assets/images/About_me/insa_about.jpg',
      'tab-panel-etic': 'assets/images/About_me/etic_about.JPG',
      'tab-panel-sport': 'assets/images/About_me/sport_about.JPG'
    };

    Object.keys(content).forEach(function (id) {
      var panel = document.getElementById(id);
      if (!panel) return;

      /* Text column */
      var textP = panel.querySelector('.a-propos-panel-col--text p');
      if (textP) textP.innerHTML = content[id].text.replace(/\n/g, '<br>');

      /* Highlights title */
      var hTitle = panel.querySelector('.a-propos-highlights-title');
      if (hTitle) hTitle.textContent = content[id].highlightsTitle;

      /* Highlights list */
      var hList = panel.querySelector('.a-propos-highlights-list');
      if (hList) {
        hList.innerHTML = '';
        content[id].highlights.forEach(function (item) {
          var li = document.createElement('li');
          li.textContent = item;
          hList.appendChild(li);
        });
      }

      /* Image */
      var imgEl = panel.querySelector('.a-propos-illustration');
      if (imgEl) {
        imgEl.setAttribute('src', tabImages[id] || '');
      }
    });
  }


  /* ==================================================================
     SCROLL OBSERVER — section tracking & animations
     ================================================================== */
  function initObserver(nav, indicator, toast) {
    var navLinks = nav ? nav.querySelectorAll('.site-nav-link') : [];
    var dots = indicator ? indicator.querySelectorAll('.section-indicator-dot') : [];

    if (!('IntersectionObserver' in window)) {
      sections.forEach(function (s) { s.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var idx = Array.prototype.indexOf.call(sections, entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          if (idx !== currentIndex) {
            currentIndex = idx;

            /* Nav — active link */
            navLinks.forEach(function (l, i) {
              l.classList.toggle('is-active', i === idx);
            });

            /* Nav — dark mode on dark-bg sections (hero, projets suivis, projets perso, contact) */
            if (nav) {
              nav.classList.toggle('site-nav--dark', idx === 0 || idx === 2 || idx === sections.length - 1);
            }

            /* Dots — active dot */
            dots.forEach(function (d, i) {
              d.classList.toggle('section-indicator-dot--active', i === idx);
            });

            /* Toast — show section name */
            if (toast) {
              toast.textContent = SECTION_LABELS[idx] || '';
              toast.classList.add('is-active');
              clearTimeout(toastTimer);
              toastTimer = setTimeout(function () {
                toast.classList.remove('is-active');
              }, 1200);
            }
          }
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.35
    });

    sections.forEach(function (s) { observer.observe(s); });
  }


  /* ==================================================================
     INIT
     ================================================================== */
  var nav = injectNav();
  var indicator = injectIndicator();
  var toast = injectToast();

  injectHeroShape();
  injectAboutShape();
  injectAboutTitle();
  initTabs();
  fillAboutContent();

  initObserver(nav, indicator, toast);

  /* First section visible immediately */
  sections[0].classList.add('is-visible');

})();
