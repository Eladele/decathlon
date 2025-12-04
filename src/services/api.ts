import axios from 'axios';

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_API = import.meta.env.VITE_USE_API === 'true';

// Instance Axios configurée
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 secondes
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
    (config) => {
        // Ajouter le token d'authentification si disponible
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Gestion centralisée des erreurs
        if (error.response) {
            // Erreur de réponse du serveur
            console.error('API Error:', error.response.status, error.response.data);

            if (error.response.status === 401) {
                // Token expiré ou non autorisé
                localStorage.removeItem('auth_token');
                // Rediriger vers la page de connexion si nécessaire
            }
        } else if (error.request) {
            // Pas de réponse du serveur
            console.error('Network Error:', error.request);
        } else {
            // Autre erreur
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export { api, USE_API, API_BASE_URL };
export default api;
