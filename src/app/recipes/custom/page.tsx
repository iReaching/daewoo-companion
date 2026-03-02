'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomRecipes } from '@/hooks/useCustomRecipes';
import { Recipe, CookingMode, Accessory, RackPosition } from '@/data/recipes';

export default function CustomRecipePage() {
    const router = useRouter();
    const { addRecipe } = useCustomRecipes();

    const [formData, setFormData] = useState({
        name: '',
        mode: 'Air Fryer' as CookingMode,
        timeMin: 15,
        timeMax: '',
        timeUnit: 'min' as 'min' | 'hours',
        temperature: 200,
        accessory: 'Fryer basket' as Accessory,
        rackPosition: 'Middle rack level' as RackPosition,
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create unique id
        const newId = `custom-${Date.now()}`;

        const newRecipe: Recipe = {
            id: newId,
            name: formData.name,
            mode: formData.mode,
            timeMin: Number(formData.timeMin),
            timeMax: formData.timeMax ? Number(formData.timeMax) : undefined,
            timeUnit: formData.timeUnit,
            temperature: Number(formData.temperature),
            accessory: formData.accessory,
            rackPosition: formData.rackPosition,
            notes: formData.notes,
            isCustom: true
        };

        addRecipe(newRecipe);
        router.push('/recipes');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-24">
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Add Custom Recipe</h1>
                    <p className="text-gray-600">Save your own perfected settings for future reference.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Food Name *</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Sweet Potato Fries"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Cooking Mode</label>
                            <select
                                id="mode"
                                name="mode"
                                value={formData.mode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                            >
                                <option value="Air Fryer">Air Fryer</option>
                                <option value="Toaster">Toaster</option>
                                <option value="Grill">Grill</option>
                                <option value="Dry Fruit">Dry Fruit</option>
                                <option value="Pizza">Pizza</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
                            <input
                                required
                                type="number"
                                id="temperature"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                min={80} max={230}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="timeMin" className="block text-sm font-medium text-gray-700">Min Time</label>
                            <input
                                required
                                type="number"
                                id="timeMin"
                                name="timeMin"
                                value={formData.timeMin}
                                onChange={handleChange}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="timeMax" className="block text-sm font-medium text-gray-700">Max Time (Opt)</label>
                            <input
                                type="number"
                                id="timeMax"
                                name="timeMax"
                                value={formData.timeMax}
                                onChange={handleChange}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="timeUnit" className="block text-sm font-medium text-gray-700">Unit</label>
                            <select
                                id="timeUnit"
                                name="timeUnit"
                                value={formData.timeUnit}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                            >
                                <option value="min">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="accessory" className="block text-sm font-medium text-gray-700">Accessory</label>
                            <select
                                id="accessory"
                                name="accessory"
                                value={formData.accessory}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                            >
                                <option value="Fryer basket">Fryer basket</option>
                                <option value="Bake tray">Bake tray</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="rackPosition" className="block text-sm font-medium text-gray-700">Rack Position</label>
                            <select
                                id="rackPosition"
                                name="rackPosition"
                                value={formData.rackPosition}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                            >
                                <option value="Top rack level">Top rack level</option>
                                <option value="Middle rack level">Middle rack level</option>
                                <option value="Bottom rack level">Bottom rack level</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="e.g., Turn halfway through, spray with olive oil..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 shadow-sm transition-colors"
                        >
                            Save Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
