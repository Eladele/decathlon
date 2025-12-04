# Guide d'Intégration API - Frontend React

Ce document explique comment le frontend React est structuré pour s'intégrer avec le backend Django REST Framework.

## 📁 Architecture

```
src/
├── services/           # Services API (appels HTTP)
│   ├── api.ts         # Configuration Axios + intercepteurs
│   ├── exerciseService.ts
│   ├── productService.ts
│   ├── questionService.ts
│   └── profileService.ts
│
├── components/
│   ├── LoadingSpinner/    # État de chargement
│   ├── ErrorMessage/      # Gestion d'erreurs
│   ├── ExerciseList/      # ✅ Utilise exerciseService
│   ├── ExerciseDetail/    # ✅ Utilise exerciseService
│   ├── QCM/               # ✅ Utilise questionService
│   └── ProductRecommendations/ # ✅ Utilise productService
│
└── data/           # Fichiers JSON (fallback)
    ├── exercises.json
    ├── products.json
    └── questions.json
```

---

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:8000/api

# Mode: true = utilise l'API, false = utilise JSON local
VITE_USE_API=false
```

**Mode de développement actuel** : `USE_API=false`
- L'app fonctionne avec les fichiers JSON locaux
- Aucun appel backend nécessaire
- Prêt pour la démo

**Pour basculer vers l'API**  : Changez `VITE_USE_API=true`
- Tous les composants utiliseront automatiquement l'API
- Le backend doit être lancé sur `localhost:8000`

---

## 🌐 Services API

### Configuration Axios (`api.ts`)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Service Exercise (`exerciseService.ts`)

```typescript
import api, { USE_API } from './api';
import exercisesData from '../data/exercises.json';

export const exerciseService = {
  async getAll(): Promise<Exercise[]> {
    if (!USE_API) {
      return Promise.resolve(exercisesData); // Fallback JSON
    }
    const response = await api.get('/exercises/');
    return response.data;
  },
  
  async getById(id: number): Promise<Exercise> {
    if (!USE_API) {
      return exercisesData.find(ex => ex.id === id);
    }
    const response = await api.get(`/exercises/${id}/`);
    return response.data;
  },
  
  // ... autres méthodes
};
```

**Fallback automatique** : Si `USE_API=false`, les données JSON locales sont utilisées.

---

## 📡 Endpoints API Attendus

Voici les endpoints que le backend Django doit fournir :

### Exercices

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/exercises/` | Liste tous les exercices |
| GET | `/api/exercises/{id}/` | Détails d'un exercice |
| GET | `/api/exercises/?category=Yoga` | Filtrer par catégorie |
| GET | `/api/exercises/?difficulty=débutant` | Filtrer par difficulté |
| GET | `/api/exercises/?search=squat` | Recherche textuelle |
| POST | `/api/exercises/recommended/` | Exercices personnalisés |

**Body pour `/recommended/`** :
```json
{
  "profile": {
    "level": "débutant",
    "sports": ["yoga"],
    "goals": ["souplesse", "santé"],
    "frequency": "modérée",
    "limitations": "aucune",
    "duration": "moyenne"
  }
}
```

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products/` | Liste tous les produits |
| GET | `/api/products/{id}/` | Détails d'un produit |
| GET | `/api/products/?exercise={id}` | Produits pour un exercice |
| GET | `/api/products/?category=Yoga` | Filtrer par catégorie |

### Questions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/questions/` | Liste toutes les questions |
| GET | `/api/questions/{id}/` | Détails d'une question |

### Profils Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/profiles/` | Créer un profil |
| GET | `/api/profiles/{sessionId}/` | Récupérer un profil |
| PATCH | `/api/profiles/{sessionId}/` | Mettre à jour un profil |

---

## 📦 Format des Données

### Exercise

```json
{
  "id": 1,
  "name": "Squats",
  "category": "Force",
  "difficulty": "débutant",
  "targetMuscles": ["Quadriceps", "Fessiers"],
  "description": "Exercice fondamental...",
  "userProfiles": ["débutant", "intermédiaire"],
  "goals": ["force", "tonification"],
  "instructions": [
    "Tenez-vous debout...",
    "Gardez le dos droit..."
  ],
  "commonMistakes": [
    "Genoux qui dépassent..."
  ],
  "imageUrl": "squat_illustration"
}
```

### Product

```json
{
  "id": 1,
  "name": "Tapis de Yoga Premium",
  "price": 29.99,
  "category": "Yoga",
  "relatedExercises": [4, 6],
  "imageUrl": "https://...",
  "description": "Tapis antidérapant...",
  "decathlonUrl": "https://www.decathlon.fr/..."
}
```

### Question

```json
{
  "id": 1,
  "question": "Quel est votre niveau ?",
  "type": "single",
  "options": [
    {
      "value": "débutant",
      "label": "Débutant",
      "points": { "level": "débutant" }
    }
  ]
}
```

---

## 🔄 Utilisation dans les Composants

### Exemple : ExerciseList

```typescript
import { exerciseService } from '../../services/exerciseService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await exerciseService.getAll();
        setExercises(data);
      } catch (err) {
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <div>{/* Afficher les exercices */}</div>;
};
```

**États gérés** :
- ✅ Loading : Spinner affiché
- ✅ Error : Message d'erreur avec bouton réessayer
- ✅ Success : Données affichées

---

## 🛠️ CORS Backend

Le backend Django doit configurer CORS pour accepter les requêtes du frontend :

```python
# settings.py
INSTALLED_APPS = [
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5174",  # Vite dev server
    "http://localhost:3000",  # Alternative
]
```

---

## 🧪 Tests

### Mode Fallback (JSON)
```bash
# .env.local
VITE_USE_API=false

# Lancer l'app
npm run dev
```
✅ Tout fonctionne avec les données JSON locales

### Mode API
```bash
# .env.local
VITE_USE_API=true

# 1. Lancer le backend Django
cd backend
python manage.py runserver

# 2. Lancer le frontend
npm run dev
```
✅ L'app communique avec le backend

---

## 🚀 Checklist de Migration

Pour votre ami qui développe le backend :

- [ ] **Créer les modèles Django** correspondant aux types TypeScript
- [ ] **Créer les serializers** DRF pour JSON ↔ Python
- [ ] **Créer les ViewSets** avec les filtres nécessaires
- [ ] **Configurer CORS** pour accepter localhost:5174
- [ ] **Importer les données** depuis les fichiers JSON
- [ ] **Tester les endpoints** avec Postman
- [ ] **Partager l'URL de l'API** (ex: `http://localhost:8000/api`)

### Côté Frontend (vous)

- [x] Services API créés avec fallback JSON
- [x] Composants refactorisés avec loading/error states
- [x] Configuration Axios avec intercepteurs
- [x] Variables d'environnement
- [ ] Passer `VITE_USE_API=true` quand backend prêt
- [ ] Tester l'intégration complète

---

## 📝 Notes Importantes

1. **Pas de modification nécessaire** pour passer du mode JSON au mode API
   - Il suffit de changer `VITE_USE_API` dans `.env.local`

2. **Tous les composants** sont maintenant async-ready
   - Loading states
   - Error handling
   - Retry functionality

3. **TypeScript** assure la cohérence des types
   - Les types dans `src/types/index.ts` doivent correspondre aux modèles Django

4. **Authentification** prête
   - L'intercepteur Axios ajoute automatiquement le token si présent
   - À implémenter côté backend (JWT recommandé)

---

## 🤝 Collaboration Backend/Frontend

### Communication

1. **Partager les types** : Assurez-vous que les structures de données correspondent
2. **URL de l'API** : Communiquez l'URL du backend (dev et production)
3. **Endpoints** : Documenter tous les endpoints disponibles
4. **Erreurs** : Utiliser des codes HTTP standards (200, 400, 404, 500)

### Format des Erreurs

Le backend devrait renvoyer des erreurs au format :
```json
{
  "error": "Message d'erreur lisible",
  "detail": "Détails techniques optionnels"
}
```

---

## ✅ Résumé

- **Mode actuel** : Fallback JSON (USE_API=false)
- **Production ready** : Oui, fonctionne hors ligne
- **API ready** : Oui, basculement instantané vers l'API
- **Tous les composants** : Refactorisés avec async/await
- **Error handling** : Complet avec retry
- **Loading states** : Sur tous les composants

**Prochaine étape** : Attendre que le backend soit prêt, puis changer `VITE_USE_API=true` !
