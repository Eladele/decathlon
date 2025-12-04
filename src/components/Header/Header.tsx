import './Header.css';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Header = () => {
    const { userProfile, resetProfile } = useUser();

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="logo">
                        <div className="logo-icon">🏃‍♂️</div>
                        <div className="logo-text">
                            <span className="logo-brand">Decathlon</span>
                            <span className="logo-subtitle">Santé Posturale</span>
                        </div>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="nav-link">Accueil</Link>
                        <Link to="/qcm" className="nav-link">Profil</Link>
                        <Link to="/exercises" className="nav-link">Exercices</Link>

                        {userProfile && (
                            <button onClick={resetProfile} className="btn-reset">
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
