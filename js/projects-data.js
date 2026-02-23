/* ============================================================
   PROJECTS-DATA.JS — Shared project data
   ============================================================ */

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
    description: 'Pipeline Python : LinkedIn → Excel/PPT pour livrables clients d\'un cabinet londonien de Talent Research',
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
  }
];

/* Build lookup map */
var ALL_PROJECTS = {};
PROJECTS_PERSO.forEach(function (p) { p._isPerso = true; });
PROJECTS_SUIVIS.concat(PROJECTS_PERSO).forEach(function (p) {
  ALL_PROJECTS[p.id] = p;
});
