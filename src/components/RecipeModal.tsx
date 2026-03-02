import React, { useEffect } from 'react';
import { Recipe } from '@/data/recipes';
import { X, Flame, Clock, Thermometer, Box, Layers, Info } from 'lucide-react';

interface RecipeModalProps {
    recipe: Recipe | null;
    isOpen: boolean;
    onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {recipe.imageUrl ? (
                    <div className="relative h-48 w-full shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={recipe.imageUrl} alt={recipe.name} className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                            <h2 className="text-2xl font-bold text-white pr-4">{recipe.name}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-orange-50/30 shrink-0">
                        <h2 className="text-xl font-bold text-gray-800 pr-4">{recipe.name}</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full hover:bg-orange-100 text-gray-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Main Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-orange-50 rounded-xl text-center">
                            <Flame className="w-6 h-6 text-orange-500 mb-1" />
                            <span className="text-xs text-gray-500 capitalize">Mode</span>
                            <span className="font-semibold text-gray-800 text-sm mt-0.5">{recipe.mode}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-orange-50 rounded-xl text-center">
                            <Thermometer className="w-6 h-6 text-orange-500 mb-1" />
                            <span className="text-xs text-gray-500">Temp</span>
                            <span className="font-semibold text-gray-800 text-sm mt-0.5">{recipe.temperature}°C</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-orange-50 rounded-xl text-center">
                            <Clock className="w-6 h-6 text-orange-500 mb-1" />
                            <span className="text-xs text-gray-500">Time</span>
                            <span className="font-semibold text-gray-800 text-sm mt-0.5">
                                {recipe.timeMin}{recipe.timeMax ? `-${recipe.timeMax}` : ''} {recipe.timeUnit}
                            </span>
                        </div>
                    </div>

                    {/* Placement Details */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <Box className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Accessory</p>
                                <p className="font-medium text-gray-800">{recipe.accessory}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <Layers className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Rack Position</p>
                                <p className="font-medium text-gray-800">{recipe.rackPosition}</p>
                            </div>
                        </div>
                    </div>

                    {/* Notes & Reminders */}
                    {recipe.notes && (
                        <div className="bg-amber-50 p-4 rounded-xl flex gap-3 text-amber-800">
                            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm mb-1">Recipe Note</p>
                                <p className="text-sm opacity-90">{recipe.notes}</p>
                            </div>
                        </div>
                    )}

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-400">
                            * Actual results may vary depending on portion size, food thickness, and brand.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
