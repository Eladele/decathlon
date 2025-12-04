import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Home.css';

const Home = () => {
    const { userProfile } = useUser();

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section fade-in">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">🏆 Decathlon Digital Challenge</div>
                        <h1 className="hero-title">
                            Devenez le <span className="text-gradient">CTO</span> de Votre{' '}
                            <span className="text-gradient">Santé Posturale</span>
                        </h1>
                        <p className="hero-subtitle">
                            Apprenez à réaliser correctement vos mouvements sportifs pour éviter les blessures
                            et maximiser vos performances.
                        </p>

                        <div className="hero-actions">
                            {userProfile ? (
                                <Link to="/exercises" className="btn btn-primary btn-large">
                                    Voir Mes Exercices →
                                </Link>
                            ) : (
                                <Link to="/qcm" className="btn btn-primary btn-large">
                                    Commencer le QCM →
                                </Link>
                            )}
                            <Link to="/exercises" className="btn btn-secondary btn-large">
                                Explorer les Exercices
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="floating-card glass-card">
                            <div className="card-icon">💪</div>
                            <div className="card-text">
                                <h4>Force</h4>
                                <p>Squats, Pompes, Fentes</p>
                            </div>
                        </div>
                        <div className="floating-card glass-card delay-1">
                            <div className="card-icon">🧘</div>
                            <div className="card-text">
                                <h4>Yoga</h4>
                                <p>Postures, Étirements</p>
                            </div>
                        </div>
                        <div className="floating-card glass-card delay-2">
                            <div className="card-icon">🎯</div>
                            <div className="card-text">
                                <h4>Gainage</h4>
                                <p>Core, Stabilité</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">4 Niveaux de Perfectionnement</h2>

                    <div className="features-grid">
                        <div className="feature-card glass-card">
                            <div className="feature-number">1</div>
                            <div className="feature-icon">📋</div>
                            <h3 className="feature-title">Profilage Sportif</h3>
                            <p className="feature-description">
                                Établissez votre profil avec notre QCM personnalisé pour des recommandations adaptées.
                            </p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-number">2</div>
                            <div className="feature-icon">📝</div>
                            <h3 className="feature-title">Instructions Personnalisées</h3>
                            <p className="feature-description">
                                Recevez des consignes détaillées étape par étape pour chaque mouvement.
                            </p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-number">3</div>
                            <div className="feature-icon">🎯</div>
                            <h3 className="feature-title">Guides Visuels</h3>
                            <p className="feature-description">
                                Visualisez la posture idéale avec des illustrations et animations.
                            </p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-number">4</div>
                            <div className="feature-icon">🛒</div>
                            <h3 className="feature-title">Produits Decathlon</h3>
                            <p className="feature-description">
                                Découvrez l'équipement recommandé pour optimiser votre pratique.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card glass-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Prêt à Améliorer Votre Technique ?</h2>
                            <p className="cta-subtitle">
                                Commencez dès maintenant votre parcours vers une pratique sportive plus sûre et efficace
                            </p>
                            <Link to="/qcm" className="btn btn-primary btn-large">
                                Démarrer Maintenant 🚀
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
