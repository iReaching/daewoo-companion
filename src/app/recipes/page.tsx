'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeModal } from '@/components/RecipeModal';
import { defaultRecipes, Recipe } from '@/data/recipes';
import { useFavorites } from '@/hooks/useFavorites';
import { useCustomRecipes } from '@/hooks/useCustomRecipes';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RecipesContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedMode, setSelectedMode] = useState<string>('All');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const { toggleFavorite, isFavorite } = useFavorites();
    const { customRecipes } = useCustomRecipes();
    const { addRecent } = useRecentlyViewed();

    const allRecipes = useMemo(() => [...defaultRecipes, ...customRecipes], [customRecipes]);

    const modes = ['All', 'Air Fryer', 'Toaster', 'Grill', 'Dry Fruit', 'Pizza'];

    const filteredRecipes = useMemo(() => {
        return allRecipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesMode = selectedMode === 'All' || recipe.mode === selectedMode;
            return matchesSearch && matchesMode;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [allRecipes, searchQuery, selectedMode]);

    const handleRecipeClick = (recipe: Recipe) => {
        addRecent(recipe.id);
        setSelectedRecipe(recipe);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">

                <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Recipe Book</h1>
                        <p className="text-gray-600">Browse all recommended settings for your foods.</p>
                    </div>
                    <Link
                        href="/recipes/custom"
                        className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-orange-700 transition-colors shadow-sm"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add a Recipe
                    </Link>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search foods, e.g. 'chicken', 'fries'..."
                />

                {/* Filters */}
                <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
                    {modes.map(mode => (
                        <button
                            key={mode}
                            onClick={() => setSelectedMode(mode)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedMode === mode
                                ? 'bg-orange-600 text-white shadow-sm'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-orange-50'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                isFavorite={isFavorite(recipe.id)}
                                onToggleFavorite={toggleFavorite}
                                onClick={handleRecipeClick}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-500">
                            <p className="text-lg">No recipes found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedMode('All'); }}
                                className="mt-4 text-orange-600 hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <RecipeModal
                recipe={selectedRecipe}
                isOpen={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />
        </div>
    );
}

export default function RecipesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Loading...</div>}>
            <RecipesContent />
        </Suspense>
    );
}
