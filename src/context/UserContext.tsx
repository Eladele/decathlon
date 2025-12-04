import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile, QuestionResponse } from '../types';

interface UserContextType {
    userProfile: UserProfile | null;
    responses: QuestionResponse[];
    setUserProfile: (profile: UserProfile) => void;
    setResponses: (responses: QuestionResponse[]) => void;
    resetProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [responses, setResponses] = useState<QuestionResponse[]>([]);

    const resetProfile = () => {
        setUserProfile(null);
        setResponses([]);
    };

    return (
        <UserContext.Provider value={{ userProfile, responses, setUserProfile, setResponses, resetProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
