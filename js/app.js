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

  /* Project lookup map for detail pages */
  var ALL_PROJECTS = {};

  var PROJECTS_SUIVIS = [
    {
      id: 'cea',
      title: 'Extraction intelligente d\'exigences',
      subtitle: 'Pipeline IA sécurisé',
      mission: 'ACCÉLLÉRER ET FIABILISER LES PROCESSUS',
      description: 'Automatisation de l\'identification d\'exigences dans des cahiers des charges complexes via un pipeline IA sécurisé.',
      image: 'assets/images/projets/cea.jpeg',
      logo: 'assets/images/logos/logo-cea.png',
      logoAlt: 'CEA',
      tags: ['Python', 'LangFlow', 'HolIAGen/Open WebUI'],
      detail: {
        category: 'Projet suivi',
        contexte: 'Ouverture d\'un grand compte stratégique (CEA) autour d\'un besoin d\'automatisation de l\'analyse documentaire. L\'objectif était d\'industrialiser l\'extraction d\'exigences depuis des cahiers des charges volumineux et hétérogènes grâce à une solution IA locale combinant OCR, NLP, et IDP, tout en garantissant la confidentialité des données.\n\n\n',
        methode: 'Prospection et qualification du besoin auprès des équipes métiers, cadrage technique et chiffrage de la solution. Coordination du développement d\'un pipeline IA modulaire : pré-traitement documentaire, extraction sémantique automatisée, scoring de fiabilité et export structuré. Pilotage projet, suivi client et accompagnement jusqu\'à la validation opérationnelle.',
        kpis: [
          { value: '60-70%', label: 'Réduction du temps d\'analyse documentaire' },
          { value: '↓ erreurs', label: 'Scoring automatisé de fiabilité' },
          { value: '100%', label: 'Traitement local & souverain' },
          { value: 'Auto', label: 'Structuration des exigences' }
        ],
        technos: ['OCR', 'NLP', 'LLM', 'HolIAGen/Open WebUI', 'LangFlow']
      }
    },
    {
      id: 'atexo',
      title: 'POC IA – Analyse d\'appels d\'offres',
      subtitle: 'Extraction et classification automatique',
      mission: 'PRÉSÉLECTION DES CANDIDATURES',
      description: 'POC IA pour extraire et structurer automatiquement les informations clés de dossiers de candidature.',
      image: 'assets/images/projets/atexo-projet.jpeg',
      logo: 'assets/images/logos/logo-atexo.png',
      logoAlt: 'ATEXO',
      tags: ['RAG', 'LLM', 'NLP', 'PostgreSQL'],
      detail: {
        category: 'Projet suivi',
        contexte: 'Accompagnement d\'Atexo dans l\'exploration d\'un module IA destiné à automatiser l\'analyse de dossiers d\'appels d\'offres. L\'objectif était de valider la faisabilité technique d\'une solution capable d\'extraire, structurer et comparer automatiquement les informations clés pour fiabiliser et accélérer la prise de décision.\n\n\n',
        methode: 'Qualification du besoin, cadrage technique et chiffrage de l\'étude. Pilotage d\'un prototype IA comparant plusieurs approches (LLM, RAG), puis coordination du développement d\'une API REST industrialisable (FastAPI, orchestration asynchrone, déploiement Docker). Suivi client et structuration des recommandations techniques pour la phase d\'industrialisation.',
        kpis: [
          { value: '80%', label: 'Réduction du temps de pré-analyse' },
          { value: 'Validé', label: 'Faisabilité IA confirmée' },
          { value: 'Scalable', label: 'Architecture prête à l\'intégration' },
          { value: '↑ fiabilité', label: 'Traçabilité des analyses' }
        ],
        technos: ['RabbitMQ', 'Docker', 'Nginx', 'OVH Cloud', 'LLM', 'RAG', 'LangChain', 'FastAPI']
      }
    },
    {
      id: 'provexi',
      title: 'Intelligent Document Processing',
      subtitle: 'Traitement automatique de documents',
      mission: 'DIGITALISER LE DOCUMENT',
      description: 'Solution modulaire de traitement automatique de documents techniques avec OCR et règles d\'extraction adaptables.',
      image: 'assets/images/projets/projet-provexi.png',
      logo: 'assets/images/logos/logo-provexi.png',
      logoAlt: 'PROVEXI',
      tags: ['OCR', 'FastAPI', 'OpenRouter', 'Streamlit'],
      detail: {
        category: 'Projet suivi',
        contexte: 'Provexi, société spécialisée dans la vérification technique et la gestion documentaire industrielle, souhaitait automatiser l\'exploitation de documents variés (rapports de vérification, factures, devis, rapports d\'intervention, etc.). L\'objectif était de créer un outil d\'Intelligent Document Processing capable d\'extraire automatiquement les données métier tout en permettant une adaptation simple à tout type de document.\n\n',
        methode: 'Qualification du besoin, cadrage fonctionnel et pilotage du développement d\'une solution IDP modulaire. Mise en place d\'une pipeline intelligente combinant classification automatique des documents, OCR si nécessaire et extraction configurable en no-code. Les équipes métier peuvent ainsi ajuster elles-mêmes les règles d\'extraction, la classification et les prompts sans intervention technique.',
        kpis: [
          { value: '60%', label: 'Gain sur le traitement documentaire' },
          { value: 'No-code', label: 'Paramétrage autonome des équipes' },
          { value: '↑ fiabilité', label: 'Extraction d\'informations critiques' },
          { value: 'Adaptatif', label: 'Tout type de document' }
        ],
        technos: ['IDP', 'OCR', 'NLP', 'Streamlit', 'JSON/Excel export']
      }
    }
  ];

  var PROJECTS_PERSO = [
    {
      id: 'socotec',
      title: 'Outil de pilotage marché',
      subtitle: 'Visualisation Power BI et API Sitadel',
      mission: 'ANALYSER LE MARCHÉ',
      description: 'Visualisation Power BI des différences marché vs SOCOTEC avec extractions de données web automatique via API publique Sitadel.',
      image: 'assets/images/projets/socotec-projet.jpeg',
      logo: 'assets/images/logos/logos-socotec.png',
      logoAlt: 'SOCOTEC',
      tags: ['Power BI', 'API Sitadel', 'Data modeling', 'ETL'],
      detail: {
        category: 'Mission en cours',
        contexte: 'Mission en cours chez Socotec, acteur majeur du testing, inspection et certification dans les secteurs de la construction, de l\'immobilier et des infrastructures. Projet visant à concevoir un outil d\'analyse de marché permettant de comparer la performance commerciale interne aux dynamiques réelles du secteur. L\'objectif est de croiser les données publiques marché issues de l\'API Sitadel 2 avec les données internes du data lake Socotec.\n\n',
        methode: 'Connexion et extraction des données via l\'API Sitadel 2, récupération des données internes depuis le data lake Socotec, harmonisation et normalisation des bases hétérogènes. Travail approfondi de data modeling (schéma étoile, structuration des dimensions métiers). Développement d\'un dashboard Power BI intégré à l\'environnement de production, permettant une analyse multi-niveaux (département, segment d\'activité, agence).',
        kpis: [
          { value: 'Auto', label: 'Analyses auparavant manuelles' },
          { value: '360°', label: 'Vision marché vs performance interne' },
          { value: '↑ ciblage', label: 'Segments à fort potentiel identifiés' },
          { value: 'Data-driven', label: 'Décisions stratégiques accélérées' }
        ],
        technos: ['API Sitadel 2', 'Power BI', 'Data Lake', 'Data modeling', 'ETL', 'Schéma étoile']
      }
    },
    {
      id: 'pb',
      title: 'Scripts Python',
      subtitle: 'Structuration de données LinkedIn',
      mission: 'AUTOMATISER LA COLLECTE DE DONNÉES',
      description: 'Pipeline Python : LinkedIn → Excel/PPT pour livrables clients d’un cabinet londonien de Talent Research',
      image: 'assets/images/projets/projet-pb.png',
      logo: 'assets/images/logos/logo-pb.jpeg',
      logoAlt: 'Parkhouse Bell',
      tags: ['Pandas', 'python-pptx', 'openpyxl', 'lxml'],
      detail: {
        category: 'Projet personnel',
        contexte: 'Lors d\'un stage chez Parkhouse Bell (cabinet de talent research basé à Londres), la production de livrables clients reposait sur une saisie manuelle fastidieuse des profils LinkedIn vers Excel puis PowerPoint. L\'automatisation semblait initialement impossible en raison des contraintes techniques de la plateforme. L\'objectif a été de rendre ce processus industrialisable tout en respectant strictement le cadre RGPD.',
        methode: 'Après analyse des limitations applicatives, j\'ai identifié une approche ingénieuse exploitant les fonctionnalités accessibles aux utilisateurs standards pour structurer l\'extraction sans enfreindre les règles d\'usage ni le cadre RGPD. Développement d\'un script Python local permettant de transformer ces données en exports Excel consolidés et en présentations PowerPoint automatisées. Projet mené en totale auto-formation, dans un environnement professionnel anglophone (Londres / Manchester).',
        kpis: [
          { value: '~200h', label: 'Économisées par semaine' },
          { value: '↑ innovation', label: 'Processus auparavant impossible' },
          { value: '↓↓', label: 'Tâches manuelles répétitives' },
          { value: '↑ focus', label: 'Analyse qualitative & entretiens' }
        ],
        technos: ['Python', 'python-pptx', 'openpyxl', 'data scraping', 'RGPD']
      }
    },
    {
      id: 'propale-bot',
      title: 'Propale Bot',
      subtitle: 'Automatisation commerciale',
      mission: 'ACCÉLLÉRER ET FIABILISER LES PROCESSUS COMMERCIAUX',
      description: 'App web interne automatisant la génération de propositions commerciales, contrats, mises à jour CRM via IA.',
      image: 'assets/images/projets/propale-bot.png',
      logo: 'assets/images/logos/logo-etic.png',
      logoAlt: 'ETIC INSA Technologies',
      tags: ['Google Apps Script', 'Docker', 'OVH', 'API HubSpot'],
      detail: {
        category: 'Projet personnel',
        contexte: 'En tant que Responsable Commercial au sein d\'ETIC INSA Technologies (Junior-Entreprise de l\'INSA Lyon), j\'ai constaté un temps excessif consacré à la production manuelle de propositions commerciales. Ce temps opérationnel limitait la capacité à challenger techniquement et budgétairement les études, tout en générant des incohérences dans le CRM et la facturation. L\'objectif a été d\'industrialiser et fiabiliser l\'ensemble du cycle avant-vente → contractualisation → CRM.',
        methode: 'Conception d\'un outil interne automatisant la génération complète des propositions commerciales à partir d\'un document de phasage fourni par les intervenants. Intégration de limites contractuelles et développement méthodologique enrichies par l\'historique des meilleures études. Automatisation du passage de la proposition signée au contrat final, puis synchronisation directe avec HubSpot. Architecture API dockerisée, exposée via Nginx et déployée sur OVH, avec intégration de LLM.',
        kpis: [
          { value: '10-30min', label: 'Au lieu de 4 à 6 heures' },
          { value: '↓ délais', label: 'Cycle de vente accéléré' },
          { value: '↑ fiabilité', label: 'Cohérence devis / CRM / facturation' },
          { value: '↑ qualité', label: 'Plus de temps pour le challenge technique' }
        ],
        technos: ['Python', 'API REST', 'HubSpot API', 'LLM', 'Docker', 'Nginx', 'OVH Cloud']
      }
    },
    {
      id: 'capteurs-iot',
      title: 'Système IoT et data visualisation',
      subtitle: 'Détection et prévention des feux de forêt',
      mission: 'PROTÉGER L\'ENVIRONNEMENT',
      description: 'Réseau de capteurs environnementaux avec transmission LoRaWAN optimisée et visualisation temps réel',
      image: 'assets/images/projets/iot.png',
      logo: 'assets/images/logos/logo-insa.png',
      logoAlt: 'INSA Lyon',
      tags: ['IoT', 'LoRaWAN', 'HTML / CSS', 'JavaScript'],
      detail: {
        category: 'Projet académique',
        contexte: 'Projet académique de fin de prépa à l\'INSA Lyon visant la conception d\'un système de prévention et détection des feux de forêt. L\'objectif était de combiner capteurs environnementaux, transmission IoT longue portée et analyse intelligente des données afin d\'anticiper les risques d\'incendie tout en intégrant des enjeux d\'innovation, d\'acceptabilité et d\'impact sociétal.\n\n',
        methode: 'Conception d\'un réseau de capteurs connectés mesurant paramètres climatiques et environnementaux (température, humidité, vent, CO₂, particules). Transmission des données via LoRaWAN vers un système d\'analyse intégrant indicateurs métiers (IFM, seuils dynamiques) et visualisation des alertes. Approche orientée sobriété énergétique, avec modes de transmission adaptatifs selon le niveau de risque.',
        kpis: [
          { value: '↑ réactivité', label: 'Détection des risques d\'incendie' },
          { value: '↓ énergie', label: 'Transmission intelligente' },
          { value: 'Temps réel', label: 'Visualisation centralisée' },
          { value: 'Modulaire', label: 'Adaptable à tout contexte' }
        ],
        technos: ['IoT', 'Capteurs', 'LoRaWAN', 'ESP32', 'Data monitoring']
      }
    },
  ];

  /* Build project lookup map */
  PROJECTS_PERSO.forEach(function (p) { p._isPerso = true; });
  PROJECTS_SUIVIS.concat(PROJECTS_PERSO).forEach(function (p) {
    ALL_PROJECTS[p.id] = p;
  });

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
            openProjectDetail(projectId, clickedCard);
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
            openProjectDetail(projectId, tappedCard);
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
     PROJECT DETAIL OVERLAY — Open / Close / Render
     ================================================================== */

  var detailOverlay = null;
  var detailIsOpen = false;
  var pageWrapper = document.querySelector('.page-wrapper');

  function renderDetailHTML(project) {
    var d = project.detail;

    var kpisHTML = d.kpis.map(function (kpi) {
      return '<div class="detail-kpi">' +
        '<div class="detail-kpi-value">' + kpi.value + '</div>' +
        '<div class="detail-kpi-label">' + kpi.label + '</div>' +
      '</div>';
    }).join('');

    var technosHTML = d.technos.map(function (t) {
      return '<li class="detail-stack-chip">' + t + '</li>';
    }).join('');

    return '<button class="detail-back" aria-label="Retour aux projets">' +
      '<svg viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      'Retour' +
    '</button>' +
    '<div class="detail-content">' +
      '<div class="detail-header">' +
        '<div class="detail-header-left">' +
          '<p class="detail-mission">' + project.mission + '</p>' +
          '<h2 class="detail-title">' + project.title + '</h2>' +
          '<p class="detail-subtitle">' + project.subtitle + '</p>' +
        '</div>' +
        '<div class="detail-header-right">' +
          '<img src="' + project.logo + '" alt="' + project.logoAlt + '" class="detail-logo">' +
          '<span class="detail-category">' + d.category + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<div class="detail-left">' +
          '<div class="detail-image-wrap">' +
            '<div class="detail-image-glow" aria-hidden="true"></div>' +
            '<img src="' + project.image + '" alt="' + project.title + '" class="detail-image" loading="lazy">' +
            '<div class="detail-image-overlay" aria-hidden="true"></div>' +
          '</div>' +
          '<div class="detail-kpis">' + kpisHTML + '</div>' +
        '</div>' +
        '<div class="detail-right">' +
          '<div class="detail-section" data-delay="1">' +
            '<h3 class="detail-section-title">Contexte & objectif</h3>' +
            '<p class="detail-section-text">' + d.contexte + '</p>' +
          '</div>' +
          '<hr class="detail-divider">' +
          '<div class="detail-section" data-delay="2">' +
            '<h3 class="detail-section-title">M\u00e9thode de travail</h3>' +
            (function () {
              var sentences = d.methode.split(/\.\s+|\.$/).filter(function (s) { return s.trim().length > 0; });
              var items = sentences.map(function (s) { return '<li>' + s.trim() + '.</li>'; }).join('');
              return '<ul class="detail-method-list">' + items + '</ul>';
            })() +
          '</div>' +
          '<hr class="detail-divider">' +
          '<div class="detail-stack">' +
            '<h4 class="detail-stack-title">Stack technique</h4>' +
            '<ul class="detail-stack-list">' + technosHTML + '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function openProjectDetail(projectId, cardEl) {
    var project = ALL_PROJECTS[projectId];
    if (!project || detailIsOpen) return;
    detailIsOpen = true;

    /* Calculate reveal origin from clicked card */
    var rect = cardEl.getBoundingClientRect();
    var cx = ((rect.left + rect.width / 2) / window.innerWidth * 100).toFixed(1);
    var cy = ((rect.top + rect.height / 2) / window.innerHeight * 100).toFixed(1);

    /* Create overlay */
    detailOverlay = document.createElement('div');
    detailOverlay.className = 'project-detail-overlay';
    if (!project._isPerso) {
      detailOverlay.classList.add('project-detail-overlay--light');
    }
    detailOverlay.style.setProperty('--reveal-x', cx + '%');
    detailOverlay.style.setProperty('--reveal-y', cy + '%');
    detailOverlay.innerHTML = renderDetailHTML(project);
    document.body.appendChild(detailOverlay);

    /* Prevent background scrolling */
    document.body.style.overflow = 'hidden';
    if (pageWrapper) pageWrapper.classList.add('is-detail-open');

    /* Trigger circular reveal */
    requestAnimationFrame(function () {
      detailOverlay.classList.add('is-entering');
    });

    /* After reveal animation, mark as fully active & stagger-reveal content */
    detailOverlay.addEventListener('animationend', function onRevealEnd(e) {
      if (e.animationName !== 'detailReveal') return;
      detailOverlay.removeEventListener('animationend', onRevealEnd);
      detailOverlay.classList.remove('is-entering');
      detailOverlay.classList.add('is-active');
      revealDetailContent();
    });

    /* Back button */
    var backBtn = detailOverlay.querySelector('.detail-back');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        closeProjectDetail();
      });
    }

    /* Close on Escape */
    document.addEventListener('keydown', handleDetailEscape);
  }

  function revealDetailContent() {
    if (!detailOverlay) return;
    var elements = detailOverlay.querySelectorAll(
      '.detail-header, .detail-image-wrap, .detail-kpis, .detail-section, .detail-stack'
    );
    elements.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  function closeProjectDetail() {
    if (!detailOverlay || !detailIsOpen) return;

    /* Start closing animation */
    detailOverlay.classList.remove('is-active');
    detailOverlay.classList.add('is-closing');

    /* Un-blur main content */
    if (pageWrapper) pageWrapper.classList.remove('is-detail-open');

    detailOverlay.addEventListener('animationend', function onCloseEnd(e) {
      if (e.animationName !== 'detailClose') return;
      detailOverlay.removeEventListener('animationend', onCloseEnd);

      /* Remove overlay from DOM */
      if (detailOverlay && detailOverlay.parentNode) {
        detailOverlay.parentNode.removeChild(detailOverlay);
      }
      detailOverlay = null;
      detailIsOpen = false;
      document.body.style.overflow = '';
    });

    document.removeEventListener('keydown', handleDetailEscape);
  }

  function handleDetailEscape(e) {
    if (e.key === 'Escape') {
      closeProjectDetail();
    }
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
