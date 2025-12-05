# Decathlon - Santé Posturale

![Decathlon Logo](https://img.shields.io/badge/Decathlon-Digital-0082c3?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)

## 🌐 Application en Ligne

**Accédez à l'application déployée :** [https://decathlon-ten.vercel.app/](https://decathlon-ten.vercel.app/)

## 📖 Description

Application web dédiée à la santé posturale et au bien-être physique, développée dans le cadre de la **Nuit de l'Info**. L'application propose un parcours personnalisé d'exercices et de conseils pour améliorer votre posture et votre condition physique.

### Fonctionnalités Principales

- 🎯 **Questionnaire personnalisé** : Profil sportif adapté à vos besoins
- 💪 **Catalogue d'exercices** : 15 exercices détaillés avec instructions visuelles
- 🖼️ **Guide visuel** : Illustrations pour une meilleure compréhension des postures
- 🛍️ **Recommandations produits** : 20 produits Decathlon adaptés
- 🌓 **Mode sombre/clair** : Interface adaptable selon vos préférences
- 📱 **Design responsive** : Optimisé pour tous les appareils

## 🚀 Installation et Lancement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/Eladele/decathlon
cd decathlon

# Installer les dépendances
npm install
```

### Lancement en mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Prévisualisation du build

```bash
npm run preview
```

## 🛠️ Stack Technique

### Frontend
- **React 19.2.0** : Framework UI moderne avec le nouveau compilateur React
- **TypeScript 5.9.3** : Typage statique pour un code plus robuste
- **Vite 7.2.4** : Build tool ultra-rapide avec HMR
- **React Router Dom 7.10.1** : Navigation entre les pages
- **Axios 1.13.2** : Gestion des requêtes HTTP

### Styling
- **CSS Variables** : Thème customisable avec mode sombre/clair
- **CSS Modules** : Isolation des styles par composant
- **Responsive Design** : Mobile-first approach
- **Glassmorphism** : Effets visuels modernes

### Outils de Développement
- **ESLint** : Linting du code
- **TypeScript ESLint** : Règles spécifiques TypeScript
- **SWC** : Compilation ultra-rapide via @vitejs/plugin-react-swc

## 📁 Structure du Projet

```
decathlon/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── Header/
│   │   ├── ExerciseList/
│   │   ├── VisualGuide/
│   │   └── ...
│   ├── pages/           # Pages de l'application
│   │   └── Home/
│   ├── context/         # Context API (Theme, User)
│   ├── data/            # Données JSON
│   │   ├── exercises.json
│   │   ├── products.json
│   │   └── questions.json
│   ├── services/        # Services API
│   ├── types/           # Types TypeScript
│   ├── utils/           # Utilitaires
│   └── assets/          # Images et ressources
├── public/              # Fichiers statiques
└── dist/                # Build de production
```

## 💡 Choix Techniques et Implémentation

### Architecture

**Component-Based Architecture** : Utilisation de composants React modulaires et réutilisables pour faciliter la maintenance et l'évolutivité.

**Context API** : Gestion de l'état global avec deux contextes principaux :
- `ThemeContext` : Gestion du thème (clair/sombre) avec persistance localStorage
- `UserContext` : Gestion du profil utilisateur et des réponses au questionnaire

**Type Safety** : TypeScript utilisé de manière stricte pour éviter les erreurs à l'exécution et améliorer l'expérience développeur.

### Design System

**CSS Variables** : Système de design tokens pour une cohérence visuelle et un changement de thème fluide.

**Responsive Design** : Approche mobile-first avec breakpoints pour tablettes et desktop.

**Accessibilité** : 
- Utilisation de balises sémantiques HTML5
- Attributs ARIA pour les composants interactifs
- Contraste de couleurs conforme aux normes WCAG

### Performance

**Optimisations** :
- Lazy loading des images avec `loading="lazy"`
- Code splitting avec React Router
- Build optimisé avec Vite (minification, tree-shaking)
- Images externes depuis Unsplash pour réduire la taille du bundle

**Images en ligne** : Utilisation d'Unsplash pour des visuels de qualité professionnelle sans alourdir le repository.

### Thème Dynamique

Implémentation d'un système de thème complet :
- Basculement instantané entre mode clair et sombre
- Persistance du choix via localStorage
- Transitions CSS fluides
- Adaptation automatique de tous les composants

## 🎨 Design et UX

### Principes de Design

- **Minimalisme** : Interface épurée centrée sur le contenu
- **Hiérarchie visuelle** : Guidage intuitif de l'utilisateur
- **Micro-animations** : Feedback visuel pour améliorer l'engagement
- **Palette Decathlon** : Utilisation des couleurs de la marque (#0082c3)

### Guide Visuel

Les exercices sont accompagnés d'illustrations pour :
- Position de départ
- Exécution du mouvement
- Position finale

Chaque exercice inclut également :
- Instructions étape par étape
- Erreurs courantes à éviter
- Muscles ciblés
- Niveau de difficulté

## 🧪 Développements Futurs

- [ ] Intégration avec l'API backend Django REST Framework
- [ ] Authentification JWT pour la gestion des utilisateurs
- [ ] Suivi de progression des exercices
- [ ] Programmes d'entraînement personnalisés
- [ ] Partage de résultats sur les réseaux sociaux
- [ ] Mode hors-ligne avec PWA

## 🌟 Difficultés Rencontrées et Solutions

### 1. Gestion du Thème Dynamique

**Difficulté** : Assurer la cohérence du thème sur tous les composants lors du basculement.

**Solution** : Utilisation de CSS variables au niveau `:root` et d'un attribut `data-theme` sur `<html>` pour des transitions fluides. Contexte React pour la synchronisation entre composants.

### 2. Images et Performance

**Difficulté** : Balance entre qualité visuelle et temps de chargement.

**Solution** : Images hébergées sur Unsplash avec paramètres d'optimisation (`w=500&h=400&fit=crop`), lazy loading natif, et utilisation de placeholders pendant le chargement.

### 3. Responsive Design

**Difficulté** : Adapter les grilles et les layouts pour toutes les tailles d'écran.

**Solution** : Utilisation de CSS Grid avec `auto-fit` et `minmax()` pour des layouts fluides. Media queries pour les ajustements spécifiques.

### 4. TypeScript avec React 19

**Difficulté** : Nouveaux types et API dans React 19.

**Solution** : Mise à jour de `@types/react` et `@types/react-dom` vers les versions compatibles. Adaptation des types pour les nouveaux hooks et fonctionnalités.

### 5. Données Structurées

**Difficulté** : Maintenir la cohérence entre les produits, exercices et questions.

**Solution** : Schémas JSON stricts avec IDs relationnels (`relatedExercises`). Types TypeScript partagés pour la validation.

## 📄 Licence

Ce projet a été développé dans le cadre de la **Nuit de l'Info 2025**.

## 👥 Auteur

Développé avec ❤️ pour Decathlon Digital

---

**Lien de l'application déployée** : [https://decathlon-ten.vercel.app/](https://decathlon-ten.vercel.app/)
