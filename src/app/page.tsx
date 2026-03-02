'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Flame, Wrench, FileText, ShieldAlert, Heart, PlusCircle } from 'lucide-react';
import { defaultRecipes, Recipe } from '@/data/recipes';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { RecipeCard } from '@/components/RecipeCard';
import { useFavorites } from '@/hooks/useFavorites';
import { RecipeModal } from '@/components/RecipeModal';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { recentIds } = useRecentlyViewed();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const recentRecipes = defaultRecipes.filter(r => recentIds.includes(r.id));
  const quickCategories = [
    { name: 'Recipe Book', href: '/recipes', icon: Flame, color: 'bg-orange-100 text-orange-600' },
    { name: 'Favorites', href: '/favorites', icon: Heart, color: 'bg-red-100 text-red-600' },
    { name: 'Troubleshooting', href: '/troubleshooting', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
    { name: 'Manual', href: '/manual', icon: FileText, color: 'bg-gray-100 text-gray-600' },
    { name: 'Safety & Cleaning', href: '/safety', icon: ShieldAlert, color: 'bg-green-100 text-green-600' },
    { name: 'Add Custom', href: '/recipes/custom', icon: PlusCircle, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Daewoo Air Fryer Oven Companion
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Quick cooking guide, troubleshooting, and manual reference for my Daewoo 16L Air Fryer Oven (DRAF01-16CRMSL).
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 border-0 rounded-2xl shadow-sm text-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="mt-3 font-medium text-gray-800 text-sm text-center">{cat.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Recently Viewed (if any) */}
        {recentRecipes.length > 0 && (
          <div className="pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Jump Back In</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentRecipes.slice(0, 4).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={(recipe) => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
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
