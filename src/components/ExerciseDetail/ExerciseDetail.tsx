import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { exerciseService } from '../../services/exerciseService';
import type { Exercise } from '../../types';
import VisualGuide from '../VisualGuide/VisualGuide';
import ProductRecommendations from '../ProductRecommendations/ProductRecommendations';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './ExerciseDetail.css';

const ExerciseDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExercise = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);
                const data = await exerciseService.getById(Number(id));
                setExercise(data);
            } catch (err) {
                console.error('Error fetching exercise:', err);
                setError('Impossible de charger cet exercice. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [id]);

    const handleRetry = async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await exerciseService.getById(Number(id));
            setExercise(data);
        } catch (err) {
            console.error('Error fetching exercise:', err);
            setError('Impossible de charger cet exercice. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner size="large" message="Chargement de l'exercice..." />;
    }

    if (error) {
        return (
            <div className="container" style={{ padding: '4rem 1rem' }}>
                <ErrorMessage message={error} onRetry={handleRetry} />
                <Link to="/exercises" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                    Retour aux exercices
                </Link>
            </div>
        );
    }

    if (!exercise) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2>Exercice non trouvé</h2>
                <Link to="/exercises" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                    Retour aux exercices
                </Link>
            </div>
        );
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'débutant': return 'difficulty-beginner';
            case 'intermédiaire': return 'difficulty-intermediate';
            case 'avancé': return 'difficulty-advanced';
            default: return '';
        }
    };

    return (
        <div className="exercise-detail-container fade-in">
            <div className="container">
                <Link to="/exercises" className="back-link">
                    ← Retour aux exercices
                </Link>

                <div className="exercise-detail-header">
                    <div className="header-content">
                        <div className="exercise-icon-large">
                            {exercise.category === 'Yoga' ? '🧘' :
                                exercise.category === 'Force' ? '💪' : '🏃'}
                        </div>
                        <div>
                            <span className={`difficulty-badge ${getDifficultyColor(exercise.difficulty)}`}>
                                {exercise.difficulty}
                            </span>
                            <h1 className="exercise-detail-title">{exercise.name}</h1>
                            <p className="exercise-category">{exercise.category}</p>
                        </div>
                    </div>
                    <p className="exercise-detail-description">{exercise.description}</p>
                </div>

                <div className="detail-grid">
                    {/* Instructions Section - Level 2 */}
                    <div className="detail-section glass-card">
                        <h2 className="section-title">
                            <span className="title-icon">📋</span>
                            Instructions Étape par Étape
                        </h2>
                        <ol className="instructions-list">
                            {exercise.instructions.map((instruction, idx) => (
                                <li key={idx} className="instruction-item">
                                    <span className="instruction-number">{idx + 1}</span>
                                    <span className="instruction-text">{instruction}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Target Muscles Section */}
                    <div className="detail-section glass-card">
                        <h2 className="section-title">
                            <span className="title-icon">💪</span>
                            Muscles Ciblés
                        </h2>
                        <div className="muscles-grid">
                            {exercise.targetMuscles.map((muscle, idx) => (
                                <div key={idx} className="muscle-item">
                                    {muscle}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Mistakes Section */}
                    <div className="detail-section glass-card full-width">
                        <h2 className="section-title">
                            <span className="title-icon">⚠️</span>
                            Erreurs Courantes à Éviter
                        </h2>
                        <ul className="mistakes-list">
                            {exercise.commonMistakes.map((mistake, idx) => (
                                <li key={idx} className="mistake-item">
                                    <span className="mistake-icon">✗</span>
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Visual Guide - Level 3 */}
                <VisualGuide exercise={exercise} />

                {/* Product Recommendations - Level 4 */}
                <ProductRecommendations exerciseId={exercise.id} />
            </div>
        </div>
    );
};

export default ExerciseDetail;
