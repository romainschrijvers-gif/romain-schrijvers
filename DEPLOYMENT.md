# Déploiement — Guide Git & GitHub Pages

Guide pour mettre à jour le code du portfolio et redéployer sur GitHub Pages.

---

## Prérequis

- **Git** installé ([git-scm.com](https://git-scm.com/))
- Accès SSH au repo : `git@github.com:romainschrijvers-gif/romain-schrijvers.git`
- GitHub Pages activé sur la branche `main` (Settings → Pages → Source : `main` / `/ (root)`)

---

## Workflow de mise à jour rapide

```bash
# 1. Se placer dans le dossier du projet
cd "chemin/vers/site perso v2"

# 2. Vérifier les fichiers modifiés
git status

# 3. Ajouter les modifications
git add .

# 4. Créer un commit avec un message descriptif
git commit -m "description des changements"

# 5. Pousser sur GitHub (déclenche automatiquement le redéploiement)
git push origin main
```

Le site est automatiquement mis à jour sur GitHub Pages quelques secondes après le push.

---

## Commandes Git détaillées

### Voir l'état actuel

```bash
# Fichiers modifiés / ajoutés / supprimés
git status

# Voir le détail des modifications
git diff

# Voir le détail d'un fichier spécifique
git diff index.html
```

### Ajouter des fichiers

```bash
# Ajouter tous les fichiers modifiés
git add .

# Ajouter un fichier spécifique
git add index.html

# Ajouter un dossier spécifique
git add assets/images/projets/

# Ajouter plusieurs fichiers
git add index.html css/layout.css js/app.js
```

### Créer un commit

```bash
# Commit simple
git commit -m "Ajout du projet XYZ"

# Commit avec description détaillée
git commit -m "Ajout du projet XYZ" -m "Nouvelle carte dans projets persos + page détail"
```

### Pousser les modifications

```bash
# Push standard
git push origin main

# Si le push est rejeté (modifications distantes)
git pull origin main
# Résoudre les éventuels conflits, puis :
git push origin main
```

### Annuler des modifications

```bash
# Annuler les modifications d'un fichier (avant git add)
git checkout -- index.html

# Retirer un fichier du staging (après git add, avant commit)
git reset HEAD index.html

# Annuler le dernier commit (garder les modifications dans le dossier)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les modifications) ⚠️ IRRÉVERSIBLE
git reset --hard HEAD~1
```

---

## Scénarios courants

### Modifier du texte sur le site

```bash
# 1. Modifier le fichier (ex: index.html, js/app.js)
# 2. Déployer
git add .
git commit -m "Mise à jour du texte hero"
git push origin main
```

### Ajouter un nouveau projet

```bash
# 1. Ajouter la carte dans index.html
# 2. Créer projets/nouveau-projet.html
# 3. Ajouter les images dans assets/images/
# 4. Déployer
git add .
git commit -m "Ajout projet Nouveau Projet"
git push origin main
```

### Modifier le style / les animations

```bash
# 1. Modifier le fichier CSS concerné
# 2. Déployer
git add css/animations.css
git commit -m "Ralentissement animation orbes hero"
git push origin main
```

### Ajouter / remplacer une image

```bash
# 1. Placer la nouvelle image dans le bon dossier assets/images/
# 2. (Si remplacement) garder le même nom de fichier — rien d'autre à changer
# 3. (Si nouvelle image) mettre à jour le src dans le HTML
# 4. Déployer
git add .
git commit -m "Mise à jour photo portrait"
git push origin main
```

---

## Vérifier le déploiement

1. Après `git push`, aller sur **GitHub → repo → onglet Actions**
2. Vérifier que le workflow "pages build and deployment" est vert ✓
3. Le site est accessible à l'URL configurée dans **Settings → Pages**
4. Compter environ **30 secondes à 2 minutes** pour la propagation

### URL du site

L'URL est visible dans **Settings → Pages** du repo GitHub, typiquement :
```
https://romainschrijvers-gif.github.io/romain-schrijvers/
```

---

## Résolution de problèmes

### Le push est refusé

```
! [rejected]        main -> main (fetch first)
```

**Solution** :
```bash
git pull origin main
# Résoudre les conflits éventuels dans les fichiers
git add .
git commit -m "Merge"
git push origin main
```

### Les changements ne s'affichent pas

1. **Vider le cache navigateur** : `Ctrl + Shift + R` (ou `Cmd + Shift + R` sur Mac)
2. **Vérifier sur GitHub** que le commit est bien arrivé (onglet Code)
3. **Vérifier l'onglet Actions** que le build Pages est terminé
4. Attendre 1-2 minutes — GitHub Pages met parfois du temps à propager

### Conflit de merge

```bash
# 1. Ouvrir les fichiers en conflit (marqués <<<<<<< / ======= / >>>>>>>)
# 2. Choisir la version à garder, supprimer les marqueurs
# 3. Sauvegarder
git add .
git commit -m "Résolution conflit"
git push origin main
```

### Revenir à une version précédente

```bash
# Voir l'historique des commits
git log --oneline

# Revenir à un commit spécifique (garder l'historique)
git revert <hash-du-commit>
git push origin main

# Revenir à un commit spécifique (écraser l'historique) ⚠️
git reset --hard <hash-du-commit>
git push origin main --force
```

---

## Bonnes pratiques

| Pratique | Pourquoi |
|---|---|
| **Commiter souvent** avec des messages clairs | Facilite le debug et le rollback |
| **Tester localement** avant de push | Ouvrir `index.html` dans le navigateur |
| **Un commit = un changement logique** | Ex: "Ajout projet X" ≠ "Correction typo + ajout projet + changement couleur" |
| **Ne jamais `--force` push** sauf urgence | Risque de perdre du travail |
| **Garder les images optimisées** | Compresser les PNG/JPG avant de les ajouter (tinypng.com) |

---

## Aide-mémoire express

```bash
# Déployer en 3 commandes :
git add .
git commit -m "mon message"
git push origin main
```
