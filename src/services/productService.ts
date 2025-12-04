import api, { USE_API } from './api';
import type { Product } from '../types';
import productsData from '../data/products.json';

/**
 * Service pour gérer les produits Decathlon
 */
export const productService = {
    /**
     * Récupérer tous les produits
     */
    async getAll(): Promise<Product[]> {
        if (!USE_API) {
            return Promise.resolve(productsData as Product[]);
        }

        const response = await api.get('/products/');
        return response.data;
    },

    /**
     * Récupérer un produit par ID
     */
    async getById(id: number): Promise<Product> {
        if (!USE_API) {
            const product = productsData.find(p => p.id === id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            return Promise.resolve(product as Product);
        }

        const response = await api.get(`/products/${id}/`);
        return response.data;
    },

    /**
     * Récupérer les produits liés à un exercice
     */
    async getByExerciseId(exerciseId: number): Promise<Product[]> {
        if (!USE_API) {
            const filtered = productsData.filter(p =>
                p.relatedExercises.includes(exerciseId)
            );
            return Promise.resolve(filtered as Product[]);
        }

        const response = await api.get(`/products/?exercise=${exerciseId}`);
        return response.data;
    },

    /**
     * Filtrer les produits par catégorie
     */
    async filterByCategory(category: string): Promise<Product[]> {
        if (!USE_API) {
            const filtered = productsData.filter(p => p.category === category);
            return Promise.resolve(filtered as Product[]);
        }

        const response = await api.get(`/products/?category=${category}`);
        return response.data;
    },
};
