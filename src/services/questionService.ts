import api, { USE_API } from './api';
import type { Question } from '../types';
import questionsData from '../data/questions.json';

/**
 * Service pour gérer les questions du QCM
 */
export const questionService = {
    /**
     * Récupérer toutes les questions
     */
    async getAll(): Promise<Question[]> {
        if (!USE_API) {
            return Promise.resolve(questionsData as Question[]);
        }

        const response = await api.get('/questions/');
        return response.data;
    },

    /**
     * Récupérer une question par ID
     */
    async getById(id: number): Promise<Question> {
        if (!USE_API) {
            const question = questionsData.find(q => q.id === id);
            if (!question) {
                throw new Error(`Question with id ${id} not found`);
            }
            return Promise.resolve(question as Question);
        }

        const response = await api.get(`/questions/${id}/`);
        return response.data;
    },
};
