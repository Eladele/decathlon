// User Profile Types
export interface UserProfile {
    level: 'débutant' | 'intermédiaire' | 'avancé';
    sports: string[];
    goals: string[];
    frequency: 'faible' | 'modérée' | 'élevée';
    limitations: string;
    duration: 'courte' | 'moyenne' | 'longue';
}

// Exercise Types
export interface Exercise {
    id: number;
    name: string;
    category: string;
    difficulty: 'débutant' | 'intermédiaire' | 'avancé';
    targetMuscles: string[];
    description: string;
    userProfiles: string[];
    goals: string[];
    instructions: string[];
    commonMistakes: string[];
    imageUrl: string;
}

// Product Types
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    relatedExercises: number[];
    imageUrl: string;
    description: string;
    decathlonUrl: string;
}

// Question Types
export interface QuestionOption {
    value: string;
    label: string;
    points: Record<string, any>;
}

export interface Question {
    id: number;
    question: string;
    type: 'single' | 'multiple';
    options: QuestionOption[];
}

// Form Response Types
export interface QuestionResponse {
    questionId: number;
    answer: string | string[];
}
