'use client';
import { useLocalStorage } from './useLocalStorage';
import { Recipe } from '@/data/recipes';

export function useCustomRecipes() {
    const [customRecipes, setCustomRecipes] = useLocalStorage<Recipe[]>('daewoo_custom_recipes', []);

    const addRecipe = (recipe: Recipe) => {
        setCustomRecipes((prev) => [...prev, { ...recipe, isCustom: true }]);
    };

    const updateRecipe = (updatedRecipe: Recipe) => {
        setCustomRecipes((prev) => prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r)));
    };

    const deleteRecipe = (id: string) => {
        setCustomRecipes((prev) => prev.filter((r) => r.id !== id));
    };

    return { customRecipes, addRecipe, updateRecipe, deleteRecipe };
}
