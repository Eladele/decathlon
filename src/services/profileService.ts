import api, { USE_API } from './api';
import type { UserProfile } from '../types';

/**
 * Service pour gérer les profils utilisateurs
 */
export const profileService = {
    /**
     * Créer un nouveau profil utilisateur
     */
    async create(profile: UserProfile): Promise<UserProfile> {
        if (!USE_API) {
            // En mode local, on retourne simplement le profil
            return Promise.resolve(profile);
        }

        const response = await api.post('/profiles/', profile);
        return response.data;
    },

    /**
     * Récupérer un profil par ID de session
     */
    async getBySessionId(sessionId: string): Promise<UserProfile> {
        if (!USE_API) {
            throw new Error('Profile retrieval not available in offline mode');
        }

        const response = await api.get(`/profiles/${sessionId}/`);
        return response.data;
    },

    /**
     * Mettre à jour un profil utilisateur
     */
    async update(sessionId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
        if (!USE_API) {
            throw new Error('Profile update not available in offline mode');
        }

        const response = await api.patch(`/profiles/${sessionId}/`, profile);
        return response.data;
    },
};
