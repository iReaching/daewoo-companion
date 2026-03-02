'use client';
import React, { useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { defaultRecipes, Recipe } from '@/data/recipes';
import { useCustomRecipes } from '@/hooks/useCustomRecipes';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeModal } from '@/components/RecipeModal';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const { customRecipes } = useCustomRecipes();
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const allRecipes = [...defaultRecipes, ...customRecipes];
    const favoriteRecipes = allRecipes.filter(r => favorites.includes(r.id));

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="w-8 h-8 text-red-500 fill-red-500" /> Saved Recipes
                    </h1>
                    <p className="text-gray-600">Your favorite air fryer recipes across all modes.</p>
                </div>

                {favoriteRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isFavorite={isFavorite(recipe.id)}
                                onToggleFavorite={toggleFavorite}
                                onClick={setSelectedRecipe}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Heart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">No favorites yet</h2>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">Tap the heart icon on any recipe to save it here for quick access later.</p>
                        <Link
                            href="/recipes"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition"
                        >
                            Browse Recipes
                        </Link>
                    </div>
                )}
            </div>

            <RecipeModal
                recipe={selectedRecipe}
                isOpen={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />
        </div>
    );
}
