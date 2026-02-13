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
5. [Modifier le contenu](#modifier-le-contenu)
6. [Modifier les animations](#modifier-les-animations)
7. [Modifier le design system](#modifier-le-design-system)
8. [Pages projet détail](#pages-projet-détail)
9. [Ajouter un nouveau projet](#ajouter-un-nouveau-projet)
10. [Responsive & accessibilité](#responsive--accessibilité)

---

## Architecture du projet

```
📁 site perso v2/
│
├── index.html                 ← Page principale (one-page, 5 sections)
│
├── 📁 projets/                ← Pages détail individuelles par projet
│   ├── atexo.html
│   ├── cea.html
│   ├── linkedin.html
│   ├── propale-bot.html
│   └── provexi.html
│
├── 📁 css/
│   ├── design-system.css      ← Tokens (couleurs, typo, spacing), reset, composants atomiques
│   ├── layout.css             ← Mise en page de chaque section + responsive
│   ├── animations.css         ← Keyframes, scroll reveal, transitions, hover
│   └── projet-detail.css      ← Layout & styles des pages projet individuelles
│
├── 📁 js/
│   ├── app.js                 ← Logique page principale (snap, nav, tabs, contenu À propos)
│   └── projet-detail.js       ← Logique pages projet (scroll reveal, nav shadow, escape)
│
└── 📁 assets/
    └── 📁 images/
        ├── About_me/          ← Photos pour la section À propos (insa_about, etic_about, sport_about)
        ├── logos/             ← Logos clients/partenaires (CEA, ATEXO, PROVEXI, ETIC, INSA, PB)
        ├── portrait/          ← Photo portrait (hero + à propos)
        └── projets/           ← Visuels SVG/images pour les pages détail et cartes projet
```

Le site est **100 % statique** — pas de framework, pas de build, pas de bundler. Il suffit d'ouvrir `index.html` dans un navigateur ou de déployer sur n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel…).

---

## Technologies utilisées

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique, sections, articles, SVG inline |
| **CSS3** | Design system (custom properties), animations keyframes, transitions, grid/flexbox, responsive |
| **JavaScript vanilla** (ES5) | Navigation snap, IntersectionObserver, tabs, injection de contenu dynamique |
| **Google Fonts** | Space Grotesk (headings) + Inter (body) |
| **Git / GitHub** | Versioning + déploiement GitHub Pages |

**Aucune dépendance externe** (pas de npm, pas de bibliothèque JS, pas de framework CSS).

---

## Structure des fichiers

### CSS — Séparation des responsabilités

| Fichier | Rôle |
|---|---|
| `design-system.css` | Tokens de design (couleurs, typo, spacing, radius, shadows), reset CSS, composants atomiques (tags, liens, séparateurs, utilitaires) |
| `layout.css` | Positionnement de chaque section (hero, projets, à propos, contact), snap vertical, grilles de cartes, responsive (breakpoints `768px` et `480px`) |
| `animations.css` | Keyframes (`float-slow`, `orb-drift`), scroll reveal, entrées séquentielles hero, hover cartes/tags, accessibilité `prefers-reduced-motion` |
| `projet-detail.css` | Layout des pages projet individuelles (hero projet, sections, sidebar, cover, nav retour) |

### JS — Séparation des responsabilités

| Fichier | Rôle |
|---|---|
| `app.js` | **Page principale uniquement** : snap scroll (wheel + keyboard + touch), navigation header (+ hamburger mobile), indicateur dots, tabs À propos, injection du contenu À propos, IntersectionObserver pour le reveal et le thème nav dark/light |
| `projet-detail.js` | **Pages projet uniquement** : scroll reveal via IntersectionObserver, shadow de la nav au scroll, raccourci clavier Escape pour retour |

---

## Les 5 sections de la page d'accueil

| # | Section | Classe CSS | Description |
|---|---|---|---|
| 1 | **Accueil (Hero)** | `.page-section--accueil` | Portrait, accroche, badge "Open to Opportunities", CTA contact + LinkedIn, logos INSA/ETIC |
| 2 | **Projets suivis** | `.page-section--projets-suivis` | Chiffres clés animés (barre, blocs, anneau SVG) + 3 cartes projets (CEA, ATEXO, PROVEXI) |
| 3 | **Projets personnels** | `.page-section--projets-personnels` | 3 cartes projets (LinkedIn, Propale Bot, IoT feux de forêt) |
| 4 | **À propos** | `.page-section--a-propos` | Photo + logos flottants, onglets (INSA / ETIC / Sport), contenu injecté par JS |
| 5 | **Contact** | `.page-section--contact` | Orbes décoratives, message, lien mail + LinkedIn |

La navigation entre sections est **snap-scroll** (desktop) ou **scroll libre** (mobile ≤ 768px).

---

## Modifier le contenu

### Changer les textes de la page d'accueil

| Élément | Où modifier |
|---|---|
| Titre hero / accroche | `index.html` → `.accueil-nom` et `.accueil-sous-accroche` (lignes ~49-60) |
| Badge hero | `index.html` → `.hero-badge` (ligne ~48) |
| Boutons CTA | `index.html` → `.hero-cta-row` (lignes ~62-66) |
| Cartes projets suivis | `index.html` → section `.page-section--projets-suivis` → chaque `<article class="projet-card">` |
| Cartes projets persos | `index.html` → section `.page-section--projets-personnels` → chaque `<article class="projet-card">` |
| Contenu À propos (onglets) | `js/app.js` → fonction `fillAboutContent()` — modifier l'objet `content` (textes, highlights) et `tabImages` (chemins images) |
| Texte contact | `index.html` → section `.page-section--contact` |
| Labels de navigation | `js/app.js` → variable `SECTION_LABELS` (ligne ~15) |

### Changer les images

| Image | Emplacement |
|---|---|
| Portrait hero + à propos | `assets/images/portrait/portrait.png` |
| Logos clients (cartes) | `assets/images/logos/logo-*.png` |
| Photos onglets À propos | `assets/images/About_me/` (insa_about.jpg, etic_about.JPG, sport_about.JPG) |
| Visuels projets détail | `assets/images/projets/projet-*.svg` |

### Changer les liens / contacts

- **Email** : rechercher `romain.schrijvers@gmail.com` dans `index.html` (2 occurrences : hero + contact)
- **LinkedIn** : rechercher l'URL LinkedIn dans `index.html` (2 occurrences)

---

## Modifier les animations

Tout est dans `css/animations.css`, organisé en 7 sections :

### 0. Keyframes

| Keyframe | Effet | Utilisé par |
|---|---|---|
| `float-slow` | Flottement vertical lent (haut) | Logos À propos |
| `float-slow-alt` | Flottement vertical lent (bas) | Logo À propos droit |
| `orb-drift-1/2/3` | Dérive + scale des orbes | Orbes hero + contact |
| `scroll-bounce` | Rebond flèche scroll | Indicateur "Scroll" hero |

### 1. Scroll reveal

Les sections apparaissent avec `opacity: 0 → 1` + `translateY(12px → 0)` via la classe `.is-visible` (ajoutée par l'IntersectionObserver dans `app.js`).

### 2. Entrées séquentielles du hero

Les éléments du hero apparaissent en cascade avec des `transition-delay` croissants (100ms → 700ms) :
badge → titre → sous-accroche → CTA → logos proof.

### 3. Flottement logos À propos

Les logos INSA/ETIC flottent en continu avec `float-slow` / `float-slow-alt`.

### 4. Cartes — Hover & staggered reveal

- Les cartes apparaissent en cascade (delay 80ms → 280ms)
- Les tags changent de couleur au hover
- Les cartes ont un effet de shadow au hover (défini dans `layout.css`)

### 5. Onglets À propos

Transition de couleur/border sur les boutons d'onglets.

### 6. Contact — Orbes & entrée

Même pattern séquentiel que le hero (delay 100ms → 550ms).

### 7. Accessibilité — `prefers-reduced-motion`

Si l'utilisateur a activé la réduction de mouvement dans son OS, **toutes les animations et transitions sont désactivées**. Ce bloc doit rester en fin de fichier.

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

## Pages projet détail

Chaque page dans `projets/` suit le même template :

```html
<!DOCTYPE html>
<html lang="fr" class="page-projet">   ← classe sur <html> pour désactiver le snap
<head>
  <!-- design-system.css + layout.css + projet-detail.css -->
</head>
<body>
  <nav class="projet-nav">              ← Barre de nav fixe avec bouton retour
    <a href="../index.html" class="projet-nav-back">Retour au portfolio</a>
    <span class="projet-nav-title">Titre court</span>
  </nav>
  <main>
    <section class="projet-hero projet-reveal">    ← Hero avec badge, titre, description, tags
    <div class="projet-cover projet-reveal">       ← Image de couverture
    <section class="projet-section projet-reveal"> ← Sections de contenu (Contexte, Approche, etc.)
  </main>
  <script src="../js/projet-detail.js"></script>
</body>
</html>
```

La classe `projet-reveal` active le scroll reveal automatiquement via `projet-detail.js`.

---

## Ajouter un nouveau projet

### 1. Créer la carte sur la page d'accueil

Dans `index.html`, ajouter un `<article class="projet-card">` dans la grille souhaitée (projets suivis ou personnels) :

```html
<article class="projet-card">
  <div class="projet-card-visuels">
    <img src="assets/images/logos/logo-monprojet.png" alt="Logo" class="projet-card-image">
  </div>
  <div class="projet-card-body">
    <h3 class="projet-card-titre">Titre du projet</h3>
    <p class="projet-card-description">Description courte.</p>
    <ul class="projet-card-tags">
      <li class="tag">Tech1</li>
      <li class="tag">Tech2</li>
    </ul>
  </div>
</article>
```

### 2. Créer la page détail

1. Dupliquer un fichier existant dans `projets/` (ex: `cea.html`)
2. Modifier le contenu (titre, description, sections)
3. Ajouter l'image de couverture dans `assets/images/projets/`
4. Ajouter le logo dans `assets/images/logos/`
5. Le fichier inclut automatiquement `projet-detail.js` pour les animations

### 3. (Optionnel) Lier la carte à la page détail

Entourer la carte d'un lien ou ajouter un lien dans le body de la carte pointant vers `projets/monprojet.html`.

---

## Responsive & accessibilité

### Breakpoints

| Breakpoint | Comportement |
|---|---|
| **> 768px** (desktop) | Snap scroll vertical, nav horizontale, grilles 3 colonnes |
| **≤ 768px** (mobile) | Scroll libre, hamburger menu, grilles 1 colonne, tailles réduites |
| **≤ 480px** | Ajustements typographiques supplémentaires |

Le responsive est entièrement géré en fin de `layout.css` et `projet-detail.css`.

### Accessibilité

- **`prefers-reduced-motion`** : toutes les animations sont désactivées (bloc en fin de `animations.css`)
- **`aria-label`** sur la nav et les éléments interactifs
- **`aria-hidden="true"`** sur les éléments purement décoratifs (orbes, dots, SVG)
- **`role="tabpanel"`** + **`aria-selected`** + **`aria-controls`** sur les onglets À propos
- **Structure sémantique** : `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`

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
