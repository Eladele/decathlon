import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { calculateProfile } from '../../utils/calculateProfile';
import { questionService } from '../../services/questionService';
import type { QuestionResponse, Question } from '../../types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './QCM.css';

const QCM = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState<QuestionResponse[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setUserProfile, setResponses: saveResponses } = useUser();
    const navigate = useNavigate();

    // Charger les questions au montage
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await questionService.getAll();
                setQuestions(data);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('Impossible de charger le questionnaire. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleRetry = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await questionService.getAll();
            setQuestions(data);
        } catch (err) {
            console.error('Error fetching questions:', err);
            setError('Impossible de charger le questionnaire. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner size="large" message="Chargement du questionnaire..." />;
    }

    if (error) {
        return (
            <div className="qcm-container">
                <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="qcm-container">
                <p>Aucune question disponible.</p>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswer = (value: string) => {
        const question = questions[currentQuestion];

        if (question.type === 'single') {
            setSelectedAnswers([value]);
        } else {
            // Multiple choice
            if (selectedAnswers.includes(value)) {
                setSelectedAnswers(selectedAnswers.filter(v => v !== value));
            } else {
                setSelectedAnswers([...selectedAnswers, value]);
            }
        }
    };

    const handleNext = () => {
        const question = questions[currentQuestion];
        const answer = question.type === 'single' ? selectedAnswers[0] : selectedAnswers;

        const newResponse: QuestionResponse = {
            questionId: question.id,
            answer: answer
        };

        const newResponses = [...responses, newResponse];
        setResponses(newResponses);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswers([]);
        } else {
            // Calculate profile and navigate
            const profile = calculateProfile(newResponses);
            setUserProfile(profile);
            saveResponses(newResponses);
            navigate('/exercises');
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const previousResponse = responses[currentQuestion - 1];
            if (Array.isArray(previousResponse.answer)) {
                setSelectedAnswers(previousResponse.answer);
            } else {
                setSelectedAnswers([previousResponse.answer]);
            }
            setResponses(responses.slice(0, -1));
        }
    };

    const canProceed = selectedAnswers.length > 0;
    const question = questions[currentQuestion];

    return (
        <div className="qcm-container fade-in">
            <div className="qcm-header">
                <h1 className="qcm-title">Créez Votre Profil Sportif</h1>
                <p className="qcm-subtitle">
                    Répondez à quelques questions pour obtenir des recommandations personnalisées
                </p>

                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="progress-text">
                    Question {currentQuestion + 1} sur {questions.length}
                </p>
            </div>

            <div className="question-card glass-card">
                <h2 className="question-text">{question.question}</h2>

                <div className="options-container">
                    {question.options.map((option) => {
                        const isSelected = selectedAnswers.includes(option.value);

                        return (
                            <button
                                key={option.value}
                                className={`option-button ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleAnswer(option.value)}
                            >
                                <span className="option-check">
                                    {isSelected ? '✓' : ''}
                                </span>
                                <span className="option-label">{option.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="navigation-buttons">
                    {currentQuestion > 0 && (
                        <button className="btn btn-secondary" onClick={handlePrevious}>
                            ← Précédent
                        </button>
                    )}

                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!canProceed}
                    >
                        {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QCM;
