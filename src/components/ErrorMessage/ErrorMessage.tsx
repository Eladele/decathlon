import './ErrorMessage.css';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorMessage = ({
    message = 'Une erreur est survenue. Veuillez réessayer.',
    onRetry
}: ErrorMessageProps) => {
    return (
        <div className="error-message-container glass-card">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Oops !</h3>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    Réessayer
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
