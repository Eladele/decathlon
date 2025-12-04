import type { Exercise, UserProfile } from '../types';

export const filterExercises = (exercises: Exercise[], profile: UserProfile | null): Exercise[] => {
    if (!profile) {
        return exercises;
    }

    return exercises.filter((exercise) => {
        // Filter by level
        const levelMatch = exercise.userProfiles.includes(profile.level);

        // Filter by goals - at least one goal should match
        const goalsMatch = profile.goals.length === 0 ||
            profile.goals.some((goal) => exercise.goals.includes(goal));

        return levelMatch && goalsMatch;
    });
};

export const sortExercisesByRelevance = (exercises: Exercise[], profile: UserProfile): Exercise[] => {
    return [...exercises].sort((a, b) => {
        // Prioritize exercises matching user's level
        const aLevelMatch = a.difficulty === profile.level ? 1 : 0;
        const bLevelMatch = b.difficulty === profile.level ? 1 : 0;

        if (aLevelMatch !== bLevelMatch) {
            return bLevelMatch - aLevelMatch;
        }

        // Then by number of matching goals
        const aGoalsMatch = a.goals.filter((g) => profile.goals.includes(g)).length;
        const bGoalsMatch = b.goals.filter((g) => profile.goals.includes(g)).length;

        return bGoalsMatch - aGoalsMatch;
    });
};
