import type { QuestionResponse, UserProfile } from '../types';

export const calculateProfile = (responses: QuestionResponse[]): UserProfile => {
    const profile: UserProfile = {
        level: 'débutant',
        sports: [],
        goals: [],
        frequency: 'faible',
        limitations: 'aucune',
        duration: 'courte',
    };

    responses.forEach((response) => {
        const { questionId, answer } = response;

        // Question 1: Niveau d'expérience
        if (questionId === 1 && typeof answer === 'string') {
            profile.level = answer as 'débutant' | 'intermédiaire' | 'avancé';
        }

        // Question 2: Sports pratiqués
        if (questionId === 2 && Array.isArray(answer)) {
            profile.sports = answer;
        }

        // Question 3: Objectifs
        if (questionId === 3 && Array.isArray(answer)) {
            profile.goals = answer;
        }

        // Question 4: Fréquence
        if (questionId === 4 && typeof answer === 'string') {
            if (answer === '1-2') profile.frequency = 'faible';
            else if (answer === '3-4') profile.frequency = 'modérée';
            else if (answer === '5+') profile.frequency = 'élevée';
        }

        // Question 5: Limitations
        if (questionId === 5 && typeof answer === 'string') {
            profile.limitations = answer;
        }

        // Question 6: Durée
        if (questionId === 6 && typeof answer === 'string') {
            if (answer === '15-30') profile.duration = 'courte';
            else if (answer === '30-45') profile.duration = 'moyenne';
            else if (answer === '45+') profile.duration = 'longue';
        }
    });

    return profile;
};
