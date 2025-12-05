import type { Exercise } from '../../types';
import './VisualGuide.css';

interface VisualGuideProps {
    exercise: Exercise;
}

const VisualGuide = ({ exercise }: VisualGuideProps) => {
    // Using online images for posture visualization
    const visualImages = [
        {
            id: 1,
            title: 'Position de départ',
            description: 'Visualisation de la posture initiale',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=400&fit=crop'
        },
        {
            id: 2,
            title: 'Mouvement',
            description: 'Exécution correcte du mouvement',
            imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&h=400&fit=crop'
        },
        {
            id: 3,
            title: 'Position finale',
            description: 'Posture à la fin du mouvement',
            imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=400&fit=crop'
        }
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
                        <div className="visual-image-container">
                            <img
                                src={visual.imageUrl}
                                alt={visual.title}
                                className="visual-image"
                                loading="lazy"
                            />
                            <div className="visual-overlay">
                                <div className="visual-step-number">{visual.id}</div>
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
