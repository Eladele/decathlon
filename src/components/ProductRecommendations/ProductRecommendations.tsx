import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import type { Product } from '../../types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ProductRecommendations.css';

interface ProductRecommendationsProps {
    exerciseId: number;
}

const ProductRecommendations = ({ exerciseId }: ProductRecommendationsProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getByExerciseId(exerciseId);
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [exerciseId]);

    if (loading) {
        return (
            <div className="products-section">
                <LoadingSpinner size="medium" message="Chargement des produits..." />
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="products-section">
            <h2 className="products-title">
                <span className="title-icon">🛒</span>
                Équipements Recommandés
            </h2>
            <p className="products-subtitle">
                Découvrez les produits Decathlon pour optimiser vos entraînements
            </p>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card glass-card">
                        <div className="product-image-container">
                            <div className="product-image-placeholder">
                                <span className="product-icon">
                                    {product.category === 'Yoga' ? '🧘' :
                                        product.category === 'Musculation' ? '🏋️' :
                                            product.category === 'Fitness' ? '💪' :
                                                product.category === 'Vêtements' ? '👕' :
                                                    product.category === 'Récupération' ? '✨' : '🎽'}
                                </span>
                            </div>
                            <div className="product-category-badge">{product.category}</div>
                        </div>

                        <div className="product-content">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>

                            <div className="product-footer">
                                <div className="product-price">
                                    <span className="price-amount">{product.price.toFixed(2)} €</span>
                                </div>
                                <a
                                    href={product.decathlonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-buy"
                                >
                                    Voir sur Decathlon →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="decathlon-banner glass-card">
                <div className="banner-content">
                    <span className="banner-icon">🏃‍♂️</span>
                    <div className="banner-text">
                        <h3>Tous les équipements pour votre pratique sportive</h3>
                        <p>Retrouvez l'ensemble de notre gamme sur Decathlon.fr</p>
                    </div>
                    <a
                        href="https://www.decathlon.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Visiter Decathlon.fr
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductRecommendations;
