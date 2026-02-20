# Portfolio — Romain SCHRIJVERS

Portfolio personnel présentant mon parcours, mes projets et compétences en ingénierie informatique & business.

> **URL du repo** : `git@github.com:romainschrijvers-gif/romain-schrijvers.git`  
> **Branche principale** : `main`  
> **Hébergement** : GitHub Pages

---

## Table des matières

1. [Architecture du projet](#architecture-du-projet)
2. [Technologies utilisées](#technologies-utilisées)
3. [Structure des fichiers](#structure-des-fichiers)
4. [Les 5 sections de la page d'accueil](#les-5-sections-de-la-page-daccueil)
5. [Système de carousel](#système-de-carousel)
6. [Overlay projet détail](#overlay-projet-détail)
7. [Modifier le contenu](#modifier-le-contenu)
8. [Modifier les animations](#modifier-les-animations)
9. [Modifier le design system](#modifier-le-design-system)
10. [Ajouter un nouveau projet](#ajouter-un-nouveau-projet)
11. [Responsive & accessibilité](#responsive--accessibilité)

---

## Architecture du projet

```
📁 site perso v2/
│
├── index.html                 ← Page unique (one-page, 5 sections + overlay détail)
│
├── 📁 css/
│   ├── design-system.css      ← Tokens (couleurs, typo, spacing), reset, composants atomiques
│   ├── layout.css             ← Mise en page de chaque section, carousel, responsive (5 breakpoints)
│   ├── animations.css         ← Keyframes, scroll reveal, transitions, hover, reduced-motion
│   └── projet-detail.css      ← Overlay pleine page avec circular reveal, layout deux colonnes, variante light/dark
│
├── 📁 js/
│   └── app.js                 ← Toute la logique : snap, nav, hamburger, carousel infini, overlay projet, tabs, contenu À propos
│
└── 📁 assets/
    └── 📁 images/
        ├── About_me/          ← Photos onglets À propos (insa_about.jpg, etic_about.JPG, sport_about.JPG)
        ├── logos/             ← Logos clients/partenaires (CEA, ATEXO, PROVEXI, SOCOTEC, ETIC, INSA, PB)
        ├── portrait/          ← Photo portrait (hero + à propos)
        └── projets/           ← Visuels projets (cea.jpeg, atexo-projet.jpeg, socotec-projet.jpeg, projet-pb.png, projet-provexi.png, propale-bot.png, iot.png)
```

Le site est **100 % statique** — pas de framework, pas de build, pas de bundler. Il suffit d'ouvrir `index.html` dans un navigateur ou de déployer sur n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel…).

---

## Technologies utilisées

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique, sections, SVG inline (clip-path hexagonal, étoile, gradients) |
| **CSS3** | Design system (custom properties), animations keyframes, transitions, grid/flexbox, clip-path circular reveal, backdrop-filter, responsive 5 breakpoints |
| **JavaScript vanilla** (ES5) | Snap navigation, carousel infini (drag + touch + velocity), overlay projet avec animation circulaire, IntersectionObserver, tabs, injection dynamique de contenu |
| **Google Fonts** | Space Grotesk (headings) + Inter (body) |
| **Git / GitHub** | Versioning + déploiement GitHub Pages |

**Aucune dépendance externe** (pas de npm, pas de bibliothèque JS, pas de framework CSS).

---

## Structure des fichiers

### CSS — Séparation des responsabilités

| Fichier | Rôle |
|---|---|
| `design-system.css` | Tokens de design (couleurs, typo, spacing, radius, shadows), reset CSS, composants atomiques (tags, liens, séparateurs, chiffres-clés, utilitaires) |
| `layout.css` | Positionnement de chaque section (hero, projets, à propos, contact), snap vertical, carousel infini, nav header + hamburger, dots indicator, responsive (breakpoints `1200px`, `1024px`, `768px`, `480px`, `max-height:700px`) |
| `animations.css` | Keyframes (`float-slow`, `orb-drift`, `scroll-bounce`), scroll reveal, entrées séquentielles hero + contact, hover cartes/tags, carousel reveal, portrait scale, accessibilité `prefers-reduced-motion` |
| `projet-detail.css` | Overlay pleine page : backdrop blur, circular reveal (`clip-path: circle()`), layout deux colonnes (image + KPIs / contenu texte), variante light (projets suivis) et dark (projets persos), staggered content reveal, CTA hover sur cartes actives, responsive overlay |

### JS — Fichier unique `app.js`

Toute la logique est dans un seul fichier `app.js` (IIFE), organisé en sections :

| Section | Rôle |
|---|---|
| **Snap Navigation** | Scroll snap (wheel + keyboard + touch swipe), cooldown, accumulation wheel avec threshold |
| **Navigation Header** | Injection dynamique de la nav, hamburger mobile avec ouverture/fermeture, liens actifs |
| **Dots Indicator** | Indicateur latéral de position (masqué sur mobile) |
| **Decorative Shape** | Hexagone décoratif injecté derrière la photo À propos |
| **Tabs À propos** | Gestion onglets INSA / ETIC / Sport avec `aria-selected` et `aria-controls` |
| **Contenu À propos** | Injection du texte, highlights et images pour chaque onglet |
| **Carousel** | Factory générique pour carousel infini : triplication des cartes, drag (mouse + touch), velocity-based snapping, dots, keyboard arrows, responsive card sizing |
| **Scroll Observer** | IntersectionObserver pour `.is-visible`, mise à jour nav links + dots + currentIndex |
| **Project Detail Overlay** | Ouverture (circular reveal depuis la carte cliquée), rendu HTML du détail (header, image, KPIs, contexte, méthode, stack), fermeture (animation inverse), raccourci Escape |

---

## Les 5 sections de la page d'accueil

| # | Section | Classe CSS | Description |
|---|---|---|---|
| 1 | **Accueil (Hero)** | `.page-section--accueil` | Fond dark, orbes animées, portrait en filigrane, badge "Open to Opportunities", accroche, CTA contact + LinkedIn, logos proof INSA/ETIC, indicateur scroll |
| 2 | **Projets suivis** | `.page-section--projets-suivis` | Fond clair, chiffres-clés animés (barre, blocs empilés, étoile SVG), **carousel infini** avec 3 projets (CEA, ATEXO, PROVEXI), dots de pagination |
| 3 | **Projets personnels** | `.page-section--projets-personnels` | Fond dark, **carousel infini** avec 4 projets (SOCOTEC, Parkhouse Bell, Propale Bot, IoT), dots de pagination |
| 4 | **À propos** | `.page-section--a-propos` | Photo portrait hexagonale + halos décoratifs + hexagone JS, logos flottants, 3 onglets (INSA / ETIC / Sport), contenu + image injectés par JS |
| 5 | **Contact** | `.page-section--contact` | Fond dark, orbes, badge "Parlons-en", message, lien mail + LinkedIn |

La navigation entre sections est **snap-scroll** (desktop) ou **scroll libre** (mobile ≤ 768px).

---

## Système de carousel

Les projets (suivis et personnels) sont affichés dans des **carousels infinis** avec les fonctionnalités suivantes :

### Fonctionnement

- **Infinite scroll** : les cartes sont tripliquées dans le DOM pour permettre un défilement sans fin
- **Drag (souris)** : cliquer-glisser avec détection de vélocité pour le snap
- **Touch (mobile)** : swipe horizontal avec détection de direction (horizontal vs vertical) pour ne pas bloquer le scroll vertical
- **Keyboard** : flèches gauche/droite quand la section est visible
- **Dots** : cliquables pour naviguer directement à un projet
- **Carte active** : la carte centrée est agrandie (`scale(1.05)`), les autres sont réduites et floutées

### Tailles responsive des cartes

| Breakpoint | Largeur carte | Hauteur carte |
|---|---|---|
| > 1024px | 480px | `min(520px, calc(100vh - 320px))` |
| ≤ 1024px | 380px | `min(460px, calc(100vh - 280px))` |
| ≤ 768px | 300px | `min(400px, calc(100vh - 240px))` |
| ≤ 480px | 260px | `min(360px, calc(100vh - 200px))` |

### Structure d'une carte carousel

```
┌──────────────────────────────────┐
│ Visual (image hero + gradient)   │  66% hauteur
│   ├─ Mission (uppercase label)   │
│   ├─ Titre                       │
│   └─ Sous-titre                  │
├──────────────────────────────────┤
│ Details (glass backdrop)         │  33% hauteur
│   ├─ Label + Logo client         │
│   ├─ Description (line-clamp)    │
│   └─ Tags technos                │
└──────────────────────────────────┘
```

Au hover sur la carte active, un overlay **"Voir le projet →"** apparaît ; au clic/tap, l'overlay détail s'ouvre.

---

## Overlay projet détail

Au clic sur une carte active du carousel, un **overlay pleine page** s'ouvre avec une **animation circulaire** (`clip-path: circle()`) partant du centre de la carte cliquée.

### Fonctionnalités

- **Circular reveal** : l'overlay s'étend depuis le point de clic via `clip-path: circle(0% → 150%)`
- **Variante light/dark** : les projets suivis utilisent un fond clair (`.project-detail-overlay--light`), les projets personnels un fond dark
- **Background blur** : le contenu principal est flouté et assombri pendant l'overlay (`.page-wrapper.is-detail-open`)
- **Staggered reveal** : le contenu du détail apparaît progressivement (header → image → KPIs → sections → stack)
- **Fermeture** : bouton "Retour", touche Escape, animation inverse

### Layout du détail

```
┌─ Retour ──────────────────────────────────────┐
│                                                │
│  MISSION · Titre · Sous-titre     Logo · Cat.  │
│  ─────────────────────────────────────────────  │
│                                                │
│  ┌─────────────┐  ┌──────────────────────────┐ │
│  │   Image     │  │  Contexte & objectif     │ │
│  │  (cover)    │  │  ──────────────────────── │ │
│  │             │  │  Méthode de travail       │ │
│  ├─────────────┤  │  (bullet points)          │ │
│  │ KPI │ KPI   │  │  ──────────────────────── │ │
│  │ KPI │ KPI   │  │  Stack technique          │ │
│  └─────────────┘  └──────────────────────────┘ │
└────────────────────────────────────────────────┘
```

Sur mobile (≤ 768px), le layout passe en **une seule colonne** (image → KPIs → texte).

### Données des projets

Les projets sont définis dans `app.js` via deux tableaux : `PROJECTS_SUIVIS` (3 projets) et `PROJECTS_PERSO` (4 projets). Chaque objet contient :

```javascript
{
  id: 'cea',                    // Identifiant unique
  title: '...',                 // Titre carte + détail
  subtitle: '...',              // Sous-titre
  mission: '...',               // Label mission (uppercase)
  description: '...',           // Description courte (carte)
  image: 'assets/images/...',   // Image hero
  logo: 'assets/images/...',    // Logo client
  logoAlt: '...',               // Alt du logo
  tags: ['...'],                // Tags technos (carte)
  detail: {
    category: '...',            // Catégorie (badge)
    contexte: '...',            // Texte contexte
    methode: '...',             // Texte méthode (auto-découpé en bullets)
    kpis: [{ value, label }],   // 4 KPIs
    technos: ['...']            // Stack technique (détail)
  }
}
```

### Liste des projets

**Projets suivis (fond clair)** :
| Projet | Client | Tags principaux |
|---|---|---|
| Extraction intelligente d'exigences | CEA | Python, LangFlow, HolIAGen/Open WebUI |
| POC IA – Analyse d'appels d'offres | ATEXO | RAG, LLM, NLP, PostgreSQL |
| Intelligent Document Processing | PROVEXI | OCR, FastAPI, OpenRouter, Streamlit |

**Projets personnels (fond dark)** :
| Projet | Contexte | Tags principaux |
|---|---|---|
| Outil de pilotage marché | SOCOTEC | Power BI, API Sitadel, Data modeling, ETL |
| Scripts Python (LinkedIn → Excel/PPT) | Parkhouse Bell | Pandas, python-pptx, openpyxl, lxml |
| Propale Bot | ETIC INSA Technologies | Google Apps Script, Docker, OVH, API HubSpot |
| Système IoT et data visualisation | INSA Lyon | IoT, LoRaWAN, HTML/CSS, JavaScript |

---

## Modifier le contenu

### Changer les textes de la page d'accueil

| Élément | Où modifier |
|---|---|
| Titre hero / accroche | `index.html` → `.accueil-nom` et `.accueil-sous-accroche` |
| Badge hero | `index.html` → `.hero-badge` |
| Boutons CTA | `index.html` → `.hero-cta-row` |
| Labels de navigation | `js/app.js` → variable `SECTION_LABELS` |
| Contenu À propos (onglets) | `js/app.js` → fonction `fillAboutContent()` — modifier l'objet `content` (textes, highlights) et `tabImages` (chemins images) |
| Texte contact | `index.html` → section `.page-section--contact` |

### Changer les projets

| Élément | Où modifier |
|---|---|
| Projets suivis (carte + détail) | `js/app.js` → tableau `PROJECTS_SUIVIS` |
| Projets personnels (carte + détail) | `js/app.js` → tableau `PROJECTS_PERSO` |

Chaque projet est un objet JS contenant toutes les infos (titre, description, image, logo, tags, détail KPIs, contexte, méthode, stack). La carte carousel et l'overlay détail sont générés automatiquement depuis ces données.

### Changer les images

| Image | Emplacement |
|---|---|
| Portrait hero + à propos | `assets/images/portrait/portrait.png` |
| Logos clients | `assets/images/logos/logo-*.png` (+ logo-pb.jpeg, logos-socotec.png) |
| Photos onglets À propos | `assets/images/About_me/` (insa_about.jpg, etic_about.JPG, sport_about.JPG) |
| Visuels projets | `assets/images/projets/` (cea.jpeg, atexo-projet.jpeg, socotec-projet.jpeg, projet-pb.png, projet-provexi.png, propale-bot.png, iot.png) |

### Changer les liens / contacts

- **Email** : rechercher `romain.schrijvers@gmail.com` dans `index.html` (2 occurrences : hero + contact)
- **LinkedIn** : rechercher l'URL LinkedIn dans `index.html` (2 occurrences)

---

## Modifier les animations

Tout est dans `css/animations.css`, organisé en 7 sections :

### 0. Keyframes

| Keyframe | Effet | Utilisé par |
|---|---|---|
| `float-slow` | Flottement vertical lent (haut) | Logo À propos gauche |
| `float-slow-alt` | Flottement vertical lent (bas) | Logo À propos droit |
| `orb-drift-1/2/3` | Dérive + scale des orbes | Orbes hero + contact |
| `scroll-bounce` | Rebond flèche scroll | Indicateur "Scroll" hero |

### 1. Scroll reveal

Les sections apparaissent avec `opacity: 0 → 1` + `translateY(12px → 0)` via la classe `.is-visible` (ajoutée par l'IntersectionObserver dans `app.js`).

### 2. Entrées séquentielles du hero

Les éléments du hero apparaissent en cascade avec des `transition-delay` croissants (100ms → 700ms) :
badge → titre → sous-accroche → CTA → logos proof. Portrait en fondu (1200ms). Hint scroll retardé (1000ms).

### 3. Flottement logos À propos

Les logos INSA/ETIC flottent en continu avec `float-slow` / `float-slow-alt`. Portrait avec transition scale (0.97 → 1).

### 4. Carousel — Reveal & hover

- Le carousel container et les dots apparaissent en fondu avec delay
- Les tags changent de couleur au hover (fond accent, texte inverse)
- Les cartes actives ont un glow radial animé

### 5. Onglets À propos

Transition de couleur/border sur les boutons d'onglets.

### 6. Contact — Orbes & entrée

Même pattern séquentiel que le hero (delay 100ms → 550ms).

### 7. Accessibilité — `prefers-reduced-motion`

Si l'utilisateur a activé la réduction de mouvement dans son OS, **toutes les animations et transitions sont désactivées**. Ce bloc couvre le scroll reveal, le hero, le carousel, le portrait, le contact et l'overlay projet. Il doit rester en fin de fichier.

### Modifier une animation

1. **Changer la durée** : modifier la valeur de `animation` (ex: `14s` → `20s` pour ralentir une orbe)
2. **Changer l'amplitude** : modifier les valeurs de `translate` / `scale` dans les `@keyframes`
3. **Changer le délai d'apparition** : modifier les `transition-delay` dans les classes `.is-visible`
4. **Ajouter une animation** : créer un `@keyframes`, l'appliquer via `.page-section.is-visible .ma-classe { animation: ... }`
5. **Désactiver une animation** : supprimer la règle `animation` ou ajouter `animation: none` sur l'élément

---

## Modifier le design system

Tout est centralisé dans `css/design-system.css` via des **CSS custom properties** (`:root`).

### Couleurs

```css
--color-accent-ia:      #1d4ed8;    /* Bleu principal (accent IA) */
--color-accent-biz:     #d97706;    /* Or chaud (accent Business) */
--color-bg-main:        #F9FAFB;    /* Fond global */
--color-text-primary:   #0F172A;    /* Texte principal */
--color-text-secondary: #6B7280;    /* Texte secondaire */
```

### Typographie

```css
--font-heading: 'Space Grotesk', sans-serif;   /* Titres */
--font-body:    'Inter', sans-serif;            /* Corps */
```

Modifier les polices : changer l'import Google Fonts en haut du fichier + les variables `--font-heading` / `--font-body`.

### Espacement

Échelle de spacing de `--space-1` (0.25rem) à `--space-24` (6rem). Utilisée partout dans `layout.css`.

### Radius & Shadows

```css
--radius-sm / --radius-md / --radius-lg / --radius-full
--shadow-sm / --shadow-md
```

---

## Ajouter un nouveau projet

### 1. Ajouter l'objet projet dans `app.js`

Dans le tableau `PROJECTS_SUIVIS` ou `PROJECTS_PERSO`, ajouter un nouvel objet :

```javascript
{
  id: 'mon-projet',
  title: 'Titre du projet',
  subtitle: 'Sous-titre',
  mission: 'MISSION EN MAJUSCULES',
  description: 'Description courte pour la carte carousel.',
  image: 'assets/images/projets/mon-projet.png',
  logo: 'assets/images/logos/logo-monprojet.png',
  logoAlt: 'Nom du client',
  tags: ['Tech1', 'Tech2', 'Tech3'],
  detail: {
    category: 'Projet suivi',       // ou 'Projet personnel', 'Mission en cours', etc.
    contexte: 'Texte du contexte...',
    methode: 'Phrase 1. Phrase 2. Phrase 3.',  // Auto-découpé en bullet points
    kpis: [
      { value: '80%', label: 'Gain de temps' },
      { value: 'Validé', label: 'POC confirmé' },
      { value: '↑', label: 'Performance' },
      { value: 'Auto', label: 'Automatisation' }
    ],
    technos: ['Python', 'Docker', 'API REST']
  }
}
```

### 2. Ajouter les assets

1. Image du projet dans `assets/images/projets/`
2. Logo du client dans `assets/images/logos/`

### 3. C'est tout

La carte carousel et la page détail overlay sont **générées automatiquement** par le JS. Pas besoin de modifier le HTML ni de créer de fichier supplémentaire.

---

## Responsive & accessibilité

### Breakpoints

| Breakpoint | Comportement |
|---|---|
| **> 1200px** (desktop) | Snap scroll vertical, nav horizontale, carousel cartes 480px, overlay deux colonnes |
| **≤ 1200px** (tablette large) | Carousel cartes légèrement réduites, panel image réduit |
| **≤ 1024px** (tablette) | Carousel cartes 380px, nav compacte, panels À propos wrappés, overlay deux colonnes resserrées |
| **≤ 768px** (mobile) | Scroll libre, hamburger menu, carousel cartes 300px, onglets verticaux, overlay une colonne, dots masqués |
| **≤ 480px** (petit mobile) | Carousel cartes 260px, typographie réduite, paddings compacts |
| **`max-height: 700px` + desktop** | Ajustements hauteur pour écrans courts (cartes, panels, paddings) |

Le responsive est géré en fin de `layout.css` (page principale) et de `projet-detail.css` (overlay).

### Accessibilité

- **`prefers-reduced-motion`** : toutes les animations et transitions sont désactivées (blocs en fin de `animations.css` et `projet-detail.css`)
- **`aria-label`** sur la nav principale et le hamburger
- **`aria-hidden="true"`** sur les éléments décoratifs (orbes, dots, grain, SVG clip-path, formes)
- **`role="tabpanel"`** + **`aria-selected`** + **`aria-controls`** sur les onglets À propos
- **`aria-label`** sur chaque dot de carousel
- **Raccourci Escape** pour fermer l'overlay détail
- **Structure sémantique** : `<main>`, `<section>`, `<header>`, `<nav>`, `<button>`
- **Scroll snap respectueux** : désactivé sur mobile pour ne pas bloquer le scroll natif

---

## Développement local

```bash
# Cloner le projet
git clone git@github.com:romainschrijvers-gif/romain-schrijvers.git
cd romain-schrijvers

# Ouvrir dans le navigateur
# Option 1 : ouvrir directement index.html
# Option 2 : utiliser un serveur local (recommandé)
npx serve .
# ou
python -m http.server 8000
```

Aucune étape de build n'est nécessaire — le code est directement interprété par le navigateur.
