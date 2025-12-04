import type { Exercise } from '../../types';
import './VisualGuide.css';

interface VisualGuideProps {
    exercise: Exercise;
}

const VisualGuide = ({ exercise }: VisualGuideProps) => {
    // For now, using placeholder images. In production, these would be real images/animations
    const visualImages = [
        { id: 1, title: 'Position de départ', description: 'Visualisation de la posture initiale' },
        { id: 2, title: 'Mouvement', description: 'Exécution correcte du mouvement' },
        { id: 3, title: 'Position finale', description: 'Posture à la fin du mouvement' }
    ];

    return (
        <div className="visual-guide-section">
            <h2 className="visual-guide-title">
                <span className="title-icon">🎯</span>
                Guide Visuel
            </h2>
            <p className="visual-guide-subtitle">
                Visualisez la bonne posture pour réaliser correctement <strong>{exercise.name}</strong>
            </p>

            <div className="visual-grid">
                {visualImages.map((visual) => (
                    <div key={visual.id} className="visual-card glass-card">
                        <div className="visual-placeholder">
                            <div className="visual-icon">
                                {exercise.category === 'Yoga' ? '🧘' :
                                    exercise.category === 'Force' ? '💪' : '🏃'}
                            </div>
                            <div className="visual-animation">
                                <div className="animation-pulse"></div>
                            </div>
                        </div>
                        <div className="visual-info">
                            <h3 className="visual-title">{visual.title}</h3>
                            <p className="visual-description">{visual.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="tips-card glass-card">
                <div className="tips-header">
                    <span className="tips-icon">💡</span>
                    <h3>Conseils pour une Exécution Parfaite</h3>
                </div>
                <ul className="tips-list">
                    <li>Échauffez-vous pendant 5-10 minutes avant de commencer</li>
                    <li>Concentrez-vous sur la qualité du mouvement plutôt que la vitesse</li>
                    <li>Respirez de manière régulière et contrôlée</li>
                    <li>Écoutez votre corps et arrêtez si vous ressentez une douleur</li>
                    <li>Augmentez progressivement l'intensité au fil des séances</li>
                </ul>
            </div>
        </div>
    );
};

export default VisualGuide;
