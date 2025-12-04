import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { filterExercises, sortExercisesByRelevance } from '../../utils/filterExercises';
import { exerciseService } from '../../services/exerciseService';
import type { Exercise } from '../../types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './ExerciseList.css';

const ExerciseList = () => {
    const { userProfile } = useUser();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Charger les exercices au montage du composant
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await exerciseService.getAll();
                setAllExercises(data);
            } catch (err) {
                console.error('Error fetching exercises:', err);
                setError('Impossible de charger les exercices. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    // Filtrer et trier les exercices
    let filteredExercises = filterExercises(allExercises, userProfile);
    if (userProfile) {
        filteredExercises = sortExercisesByRelevance(filteredExercises, userProfile);
    }
    if (selectedCategory !== 'all') {
        filteredExercises = filteredExercises.filter(ex => ex.category === selectedCategory);
    }

    const categories = ['all', ...new Set(allExercises.map(ex => ex.category))];

    // Gérer le rechargement en cas d'erreur
    const handleRetry = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await exerciseService.getAll();
            setAllExercises(data);
        } catch (err) {
            console.error('Error fetching exercises:', err);
            setError('Impossible de charger les exercices. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'débutant': return 'difficulty-beginner';
            case 'intermédiaire': return 'difficulty-intermediate';
            case 'avancé': return 'difficulty-advanced';
            default: return '';
        }
    };

    // Afficher le spinner de chargement
    if (loading) {
        return <LoadingSpinner size="large" message="Chargement des exercices..." />;
    }

    // Afficher le message d'erreur
    if (error) {
        return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    return (
        <div className="exercise-list-container fade-in">
            <div className="container">
                <div className="exercise-header">
                    <h1 className="exercise-title">
                        {userProfile ? 'Exercices Personnalisés' : 'Tous les Exercices'}
                    </h1>
                    <p className="exercise-subtitle">
                        {userProfile
                            ? `Découvrez ${filteredExercises.length} exercices adaptés à votre profil`
                            : 'Parcourez notre catalogue d\'exercices'}
                    </p>
                </div>

                {userProfile && (
                    <div className="profile-summary glass-card">
                        <h3>Votre Profil</h3>
                        <div className="profile-tags">
                            <span className="tag tag-level">{userProfile.level}</span>
                            {userProfile.goals.map(goal => (
                                <span key={goal} className="tag tag-goal">{goal}</span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'all' ? 'Tous' : cat}
                        </button>
                    ))}
                </div>

                <div className="exercises-grid">
                    {filteredExercises.map(exercise => (
                        <Link
                            key={exercise.id}
                            to={`/exercise/${exercise.id}`}
                            className="exercise-card glass-card"
                        >
                            <div className="exercise-card-header">
                                <div className="exercise-icon">
                                    {exercise.category === 'Yoga' ? '🧘' :
                                        exercise.category === 'Force' ? '💪' : '🏃'}
                                </div>
                                <span className={`difficulty-badge ${getDifficultyColor(exercise.difficulty)}`}>
                                    {exercise.difficulty}
                                </span>
                            </div>

                            <h3 className="exercise-name">{exercise.name}</h3>
                            <p className="exercise-description">{exercise.description}</p>

                            <div className="exercise-muscles">
                                {exercise.targetMuscles.slice(0, 3).map((muscle, idx) => (
                                    <span key={idx} className="muscle-tag">{muscle}</span>
                                ))}
                            </div>

                            <div className="exercise-footer">
                                <span className="view-more">Voir les détails →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredExercises.length === 0 && (
                    <div className="no-results">
                        <p>Aucun exercice trouvé pour cette catégorie.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseList;
