/* ============================================================
   APP.JS — Portfolio Romain SCHRIJVERS
   ============================================================
   Snap navigation, nav header (+ hamburger mobile),
   dots, touch swipe, tabs, contenu à propos.
   ============================================================ */

(function () {
  'use strict';

  var sections = document.querySelectorAll('.page-section');
  if (!sections.length) return;

  var SECTION_LABELS = ['Accueil', 'Projets suivis', 'Projets personnels', 'À propos', 'Contact'];

  var currentIndex    = 0;
  var isScrolling     = false;
  var SCROLL_COOLDOWN = 1200;
  var wheelAccumulator = 0;
  var wheelTimer       = null;
  var WHEEL_THRESHOLD  = 50;
  var isMobile         = false;

  function checkMobile() {
    isMobile = window.innerWidth <= 768;
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);


  /* ==================================================================
     SNAP NAVIGATION
     ================================================================== */
  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (index === currentIndex || isScrolling) return;

    isScrolling = true;
    currentIndex = index;
    sections[index].scrollIntoView({ behavior: 'smooth' });

    setTimeout(function () { isScrolling = false; }, SCROLL_COOLDOWN);
  }

  /* Wheel — desktop uniquement */
  document.addEventListener('wheel', function (e) {
    if (isMobile) return;
    e.preventDefault();
    if (isScrolling) return;

    wheelAccumulator += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { wheelAccumulator = 0; }, 200);

    if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
      var dir = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      clearTimeout(wheelTimer);
      goToSection(currentIndex + dir);
    }
  }, { passive: false });

  /* Keyboard */
  document.addEventListener('keydown', function (e) {
    if (isMobile) return;
    var dir = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
    if (e.key === 'ArrowUp'   || e.key === 'PageUp') dir = -1;
    if (!dir) return;
    e.preventDefault();
    goToSection(currentIndex + dir);
  });

  /* Touch swipe — desktop snap mode only */
  var touchStartY = 0;
  document.addEventListener('touchstart', function (e) {
    if (isMobile) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (isMobile) return;
    var diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      goToSection(currentIndex + (diff > 0 ? 1 : -1));
    }
  }, { passive: true });


  /* ==================================================================
     NAVIGATION HEADER
     ================================================================== */
  function injectNav() {
    var nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'Navigation principale');

    /* Hamburger button (mobile) */
    var hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
    nav.appendChild(hamburger);

    /* Links */
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
        nav.classList.remove('nav-open');

        if (isMobile) {
          sections[i].scrollIntoView({ behavior: 'smooth' });
          currentIndex = i;
        } else {
          goToSection(i);
        }
      });
      nav.appendChild(a);
    });

    document.body.prepend(nav);

    requestAnimationFrame(function () {
      nav.classList.add('is-visible');
    });

    return nav;
  }


  /* ==================================================================
     DOTS INDICATOR
     ================================================================== */
  function injectIndicator() {
    var wrap = document.createElement('div');
    wrap.className = 'section-indicator';
    wrap.setAttribute('aria-hidden', 'true');

    sections.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'section-indicator-dot';
      if (i === 0) dot.classList.add('section-indicator-dot--active');
      dot.addEventListener('click', function () { goToSection(i); });
      wrap.appendChild(dot);
    });

    document.body.appendChild(wrap);
    return wrap;
  }


  /* ==================================================================
     DECORATIVE SHAPE — À PROPOS
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
     TITRE « À PROPOS » (injecté)
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
     TABS — À PROPOS
     ================================================================== */
  function initTabs() {
    var tabs   = document.querySelectorAll('.a-propos-tab');
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

        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) {
          panel.classList.add('a-propos-panel--active');
          panel.hidden = false;
        }
      });
    });
  }


  /* ==================================================================
     CONTENU — À PROPOS
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
      'tab-panel-insa':  'assets/images/About_me/insa_about.jpg',
      'tab-panel-etic':  'assets/images/About_me/etic_about.JPG',
      'tab-panel-sport': 'assets/images/About_me/sport_about.JPG'
    };

    Object.keys(content).forEach(function (id) {
      var panel = document.getElementById(id);
      if (!panel) return;

      var textP = panel.querySelector('.a-propos-panel-col--text p');
      if (textP) textP.innerHTML = content[id].text.replace(/\n/g, '<br>');

      var hTitle = panel.querySelector('.a-propos-highlights-title');
      if (hTitle) hTitle.textContent = content[id].highlightsTitle;

      var hList = panel.querySelector('.a-propos-highlights-list');
      if (hList) {
        hList.innerHTML = '';
        content[id].highlights.forEach(function (item) {
          var li = document.createElement('li');
          li.textContent = item;
          hList.appendChild(li);
        });
      }

      var imgEl = panel.querySelector('.a-propos-illustration');
      if (imgEl) imgEl.setAttribute('src', tabImages[id] || '');
    });
  }


  /* ==================================================================
     CAROUSEL — Projets suivis + Projets personnels
     ================================================================== */

  /* Project data is loaded from projects-data.js (shared with projet.html) */

    /* --- Generic carousel factory --- */
  function createCarousel(projects, trackId, dotsId) {
    var track = document.getElementById(trackId);
    var dotsContainer = document.getElementById(dotsId);
    if (!track || !dotsContainer) return;

    var originalCount = projects.length;

    function getCardWidth() {
      var w = window.innerWidth;
      if (w <= 480) return 260;
      if (w <= 768) return 300;
      if (w <= 1024) return 380;
      return 480;
    }

    function getCardGap() { return 32; }

    function createCardHTML(project) {
      var tagsHTML = project.tags.map(function (t) {
        return '<li class="tag">' + t + '</li>';
      }).join('');

      return '<div class="carousel-card" data-project-id="' + project.id + '">' +
        '<div class="carousel-card-border"></div>' +
        '<div class="carousel-card-glow"></div>' +
        '<div class="carousel-card-cta"><span class="carousel-card-cta-text">Voir le projet &rarr;</span></div>' +
        '<div class="carousel-card-visual">' +
          '<img src="' + project.image + '" alt="' + project.title + '" class="carousel-card-hero" loading="lazy">' +
          '<div class="carousel-card-gradient"></div>' +
          '<div class="carousel-card-overlay">' +
            '<p class="carousel-card-mission">' + project.mission + '</p>' +
            '<h3 class="carousel-card-title">' + project.title + '</h3>' +
            '<p class="carousel-card-subtitle">' + project.subtitle + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="carousel-card-details">' +
          '<div class="carousel-card-accent-line"></div>' +
          '<div class="carousel-card-details-header">' +
            '<span class="carousel-card-label">Détails du projet</span>' +
            '<img src="' + project.logo + '" alt="' + project.logoAlt + '" class="carousel-card-logo">' +
          '</div>' +
          '<p class="carousel-card-desc">' + project.description + '</p>' +
          '<ul class="carousel-card-tags">' + tagsHTML + '</ul>' +
        '</div>' +
      '</div>';
    }

    /* Triple cards for infinite scroll */
    var html = '';
    for (var s = 0; s < 3; s++) {
      for (var p = 0; p < originalCount; p++) {
        html += createCardHTML(projects[p]);
      }
    }
    track.innerHTML = html;

    /* Generate dots */
    for (var d = 0; d < originalCount; d++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.dataset.index = d;
      dot.setAttribute('aria-label', 'Projet ' + (d + 1));
      dotsContainer.appendChild(dot);
    }

    /* State */
    var activeIndex = originalCount;
    var trackX = 0;
    var isDragging = false;
    var dragStartX = 0;
    var dragStartY = 0;
    var dragStartTrackX = 0;
    var dragDirection = null;

    var allCards = track.querySelectorAll('.carousel-card');

    function centerOn(index, animate) {
      var cw = getCardWidth();
      var gap = getCardGap();
      var tw = cw + gap;
      var containerWidth = track.parentElement.offsetWidth;
      var offset = containerWidth / 2 - cw / 2 - index * tw;

      if (animate) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      } else {
        track.style.transition = 'none';
      }

      track.style.transform = 'translateX(' + offset + 'px)';
      trackX = offset;
      activeIndex = index;

      updateCardStates();
      updateDots();
    }

    function updateCardStates() {
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].classList.toggle('is-active', i === activeIndex);
      }
    }

    function updateDots() {
      var currentProject = activeIndex % originalCount;
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === currentProject);
      }
    }

    function handleInfiniteReset() {
      if (activeIndex < originalCount) {
        activeIndex += originalCount;
        centerOn(activeIndex, false);
      } else if (activeIndex >= originalCount * 2) {
        activeIndex -= originalCount;
        centerOn(activeIndex, false);
      }
    }

    track.addEventListener('transitionend', function (e) {
      if (e.target === track) handleInfiniteReset();
    });

    function snapToNearest() {
      var cw = getCardWidth();
      var gap = getCardGap();
      var tw = cw + gap;
      var containerWidth = track.parentElement.offsetWidth;
      var centerOffset = containerWidth / 2 - cw / 2;
      var relativeX = trackX - centerOffset;
      var newIndex = Math.round(-relativeX / tw);
      newIndex = Math.max(0, Math.min(newIndex, originalCount * 3 - 1));
      centerOn(newIndex, true);
    }

    /* Mouse drag with velocity-based swipe */
    var dragLastX = 0;
    var dragLastTime = 0;
    var dragVelocity = 0;
    var dragStartTarget = null;

    track.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragStartX = e.clientX;
      dragLastX = e.clientX;
      dragLastTime = Date.now();
      dragVelocity = 0;
      dragStartTrackX = trackX;
      dragStartTarget = e.target;
      track.style.transition = 'none';
      track.classList.add('is-dragging');
      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var now = Date.now();
      var dt = now - dragLastTime;
      if (dt > 0) {
        dragVelocity = (e.clientX - dragLastX) / dt;
      }
      dragLastX = e.clientX;
      dragLastTime = now;
      var dx = e.clientX - dragStartX;
      trackX = dragStartTrackX + dx;
      track.style.transform = 'translateX(' + trackX + 'px)';
      e.preventDefault();
    });

    document.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      var totalDx = e.clientX - dragStartX;

      /* Velocity-based or distance-based snap */
      if (Math.abs(dragVelocity) > 0.3 || Math.abs(totalDx) > 60) {
        var dir = (dragVelocity < 0 || (dragVelocity === 0 && totalDx < 0)) ? 1 : -1;
        centerOn(activeIndex + dir, true);
      } else {
        /* Check if this was a click on an active card */
        var clickedCard = dragStartTarget ? dragStartTarget.closest('.carousel-card.is-active') : null;
        if (clickedCard && Math.abs(totalDx) < 5) {
          var projectId = clickedCard.dataset.projectId;
          if (projectId && typeof openProjectDetail === 'function') {
            openProjectDetail(projectId);
            return;
          }
        }
        snapToNearest();
      }
    });

    /* Touch drag */
    var touchStartTarget = null;

    track.addEventListener('touchstart', function (e) {
      isDragging = true;
      dragDirection = null;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      dragStartTrackX = trackX;
      touchStartTarget = e.target;
      track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var dx = e.touches[0].clientX - dragStartX;
      var dy = e.touches[0].clientY - dragStartY;
      if (!dragDirection) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          dragDirection = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
          if (dragDirection === 'horizontal') track.classList.add('is-dragging');
        }
        return;
      }
      if (dragDirection === 'horizontal') {
        e.preventDefault();
        trackX = dragStartTrackX + dx;
        track.style.transform = 'translateX(' + trackX + 'px)';
      } else {
        isDragging = false;
      }
    }, { passive: false });

    track.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      /* Tap detection: no direction determined = no movement */
      if (!dragDirection && touchStartTarget) {
        var tappedCard = touchStartTarget.closest('.carousel-card.is-active');
        if (tappedCard) {
          var projectId = tappedCard.dataset.projectId;
          if (projectId && typeof openProjectDetail === 'function') {
            openProjectDetail(projectId);
            touchStartTarget = null;
            dragDirection = null;
            return;
          }
        }
      }
      touchStartTarget = null;
      dragDirection = null;
      snapToNearest();
    }, { passive: true });

    /* Dot clicks */
    dotsContainer.addEventListener('click', function (e) {
      var btn = e.target.closest('.carousel-dot');
      if (!btn) return;
      var projIdx = parseInt(btn.dataset.index, 10);
      centerOn(projIdx + originalCount, true);
    });

    /* Keyboard arrows when section is visible */
    document.addEventListener('keydown', function (e) {
      var section = track.closest('.page-section');
      if (!section || !section.classList.contains('is-visible')) return;
      if (e.key === 'ArrowLeft') centerOn(activeIndex - 1, true);
      else if (e.key === 'ArrowRight') centerOn(activeIndex + 1, true);
    });

    /* Horizontal wheel / trackpad swipe on carousel */
    var carouselWheelAcc = 0;
    var carouselWheelTimer = null;
    var CAROUSEL_WHEEL_THRESHOLD = 50;
    var carouselWheelCooldown = false;

    var container = track.parentElement;
    container.addEventListener('wheel', function (e) {
      /* Determine dominant axis */
      var absX = Math.abs(e.deltaX);
      var absY = Math.abs(e.deltaY);

      /* If horizontal scroll is dominant (trackpad swipe) */
      if (absX > absY && absX > 2) {
        e.preventDefault();
        e.stopPropagation();
        if (carouselWheelCooldown) return;

        carouselWheelAcc += e.deltaX;
        clearTimeout(carouselWheelTimer);
        carouselWheelTimer = setTimeout(function () { carouselWheelAcc = 0; }, 200);

        if (Math.abs(carouselWheelAcc) >= CAROUSEL_WHEEL_THRESHOLD) {
          var dir = carouselWheelAcc > 0 ? 1 : -1;
          carouselWheelAcc = 0;
          clearTimeout(carouselWheelTimer);
          carouselWheelCooldown = true;
          centerOn(activeIndex + dir, true);
          setTimeout(function () { carouselWheelCooldown = false; }, 600);
        }
      }
    }, { passive: false });

    /* Init */
    centerOn(activeIndex, false);
    window.addEventListener('resize', function () {
      centerOn(activeIndex, false);
    });
  }

  function initProjectCarousel() {
    createCarousel(PROJECTS_SUIVIS, 'carousel-track-suivis', 'carousel-dots-suivis');
    createCarousel(PROJECTS_PERSO, 'carousel-track-perso', 'carousel-dots-perso');
  }


  /* ==================================================================
     SCROLL OBSERVER
     ================================================================== */
  function initObserver(nav, indicator) {
    var navLinks = nav ? nav.querySelectorAll('.site-nav-link') : [];
    var dots     = indicator ? indicator.querySelectorAll('.section-indicator-dot') : [];
    var lastIdx  = sections.length - 1;

    if (!('IntersectionObserver' in window)) {
      sections.forEach(function (s) { s.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var idx = Array.prototype.indexOf.call(sections, entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentIndex = idx;

          /* Active link */
          navLinks.forEach(function (l, i) {
            l.classList.toggle('is-active', i === idx);
          });

          /* Active dot */
          dots.forEach(function (d, i) {
            d.classList.toggle('section-indicator-dot--active', i === idx);
          });
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(function (s) { observer.observe(s); });
  }


  /* ==================================================================
     PROJECT DETAIL  Navigate to standalone page
     ================================================================== */

  function openProjectDetail(projectId) {
    window.location.href = 'projet.html?id=' + encodeURIComponent(projectId);
  }


  /* ==================================================================
     INIT
     ================================================================== */
  var nav       = injectNav();
  var indicator = injectIndicator();

  injectAboutShape();
  injectAboutTitle();
  initTabs();
  fillAboutContent();
  initProjectCarousel();
  initObserver(nav, indicator);

  /* First section visible immediately */
  sections[0].classList.add('is-visible');

})();
