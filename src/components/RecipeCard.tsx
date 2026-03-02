import React from 'react';
import { Recipe } from '@/data/recipes';
import { Flame, Clock, Thermometer, Box, Star } from 'lucide-react';

interface RecipeCardProps {
    recipe: Recipe;
    isFavorite: boolean;
    onToggleFavorite: (id: string, e: React.MouseEvent) => void;
    onClick: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite, onClick }) => {
    return (
        <div
            onClick={() => onClick(recipe)}
            className="bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col h-full"
        >
            <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{recipe.name}</h3>
                    <button
                        onClick={(e) => onToggleFavorite(recipe.id, e)}
                        className="text-gray-400 hover:text-orange-500 transition-colors p-1"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Star className={`w-5 h-5 ${isFavorite ? 'fill-orange-500 text-orange-500' : ''}`} />
                    </button>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-orange-700">{recipe.mode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="flex items-center gap-1.5 bg-orange-50/50 p-1.5 rounded-md">
                            <Thermometer className="w-4 h-4 text-gray-500" />
                            <span>{recipe.temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-orange-50/50 p-1.5 rounded-md">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{recipe.timeMin}{recipe.timeMax ? `-${recipe.timeMax}` : ''} {recipe.timeUnit}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <Box className="w-4 h-4 text-gray-400" />
                        <span className="text-xs">{recipe.accessory} • {recipe.rackPosition}</span>
                    </div>
                </div>
            </div>

            {(recipe.notes || recipe.isCustom) && (
                <div className="bg-orange-50/50 px-4 py-2 border-t border-orange-100 text-xs text-orange-800 flex justify-between items-center">
                    <span className="truncate">{recipe.notes || 'No extra notes'}</span>
                    {recipe.isCustom && <span className="bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Custom</span>}
                </div>
            )}
        </div>
    );
};
