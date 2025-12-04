import api, { USE_API } from './api';
import type { Exercise } from '../types';
import exercisesData from '../data/exercises.json';

/**
 * Service pour gérer les exercices
 */
export const exerciseService = {
    /**
     * Récupérer tous les exercices
     */
    async getAll(): Promise<Exercise[]> {
        if (!USE_API) {
            // Fallback sur les données JSON locales
            return Promise.resolve(exercisesData as Exercise[]);
        }

        const response = await api.get('/exercises/');
        return response.data;
    },

    /**
     * Récupérer un exercice par ID
     */
    async getById(id: number): Promise<Exercise> {
        if (!USE_API) {
            const exercise = exercisesData.find(ex => ex.id === id);
            if (!exercise) {
                throw new Error(`Exercise with id ${id} not found`);
            }
            return Promise.resolve(exercise as Exercise);
        }

        const response = await api.get(`/exercises/${id}/`);
        return response.data;
    },

    /**
     * Filtrer les exercices par catégorie
     */
    async filterByCategory(category: string): Promise<Exercise[]> {
        if (!USE_API) {
            const filtered = exercisesData.filter(ex => ex.category === category);
            return Promise.resolve(filtered as Exercise[]);
        }

        const response = await api.get(`/exercises/?category=${category}`);
        return response.data;
    },

    /**
     * Filtrer les exercices par difficulté
     */
    async filterByDifficulty(difficulty: string): Promise<Exercise[]> {
        if (!USE_API) {
            const filtered = exercisesData.filter(ex => ex.difficulty === difficulty);
            return Promise.resolve(filtered as Exercise[]);
        }

        const response = await api.get(`/exercises/?difficulty=${difficulty}`);
        return response.data;
    },

    /**
     * Rechercher des exercices
     */
    async search(query: string): Promise<Exercise[]> {
        if (!USE_API) {
            const filtered = exercisesData.filter(ex =>
                ex.name.toLowerCase().includes(query.toLowerCase()) ||
                ex.description.toLowerCase().includes(query.toLowerCase())
            );
            return Promise.resolve(filtered as Exercise[]);
        }

        const response = await api.get(`/exercises/?search=${query}`);
        return response.data;
    },

    /**
     * Obtenir des exercices recommandés basés sur le profil utilisateur
     */
    async getRecommended(profile: any): Promise<Exercise[]> {
        if (!USE_API) {
            // Logique locale de filtrage
            const filtered = exercisesData.filter(ex => {
                return ex.userProfiles.includes(profile.level) &&
                    ex.goals.some((goal: string) => profile.goals.includes(goal));
            });
            return Promise.resolve(filtered as Exercise[]);
        }

        const response = await api.post('/exercises/recommended/', { profile });
        return response.data;
    },
};
