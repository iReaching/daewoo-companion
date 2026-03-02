'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomRecipes } from '@/hooks/useCustomRecipes';
import { Recipe, CookingMode, Accessory, RackPosition } from '@/data/recipes';
import { supabase } from '@/lib/supabase';
import { Camera, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function CustomRecipePage() {
    const router = useRouter();
    const { addRecipe } = useCustomRecipes();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        mode: 'Air Fryer' as CookingMode,
        timeMin: 15,
        timeMax: '',
        timeUnit: 'min' as 'min' | 'hours',
        temperature: 200,
        accessory: 'Fryer basket' as Accessory,
        rackPosition: 'Middle rack level' as RackPosition,
        notes: '',
        imageUrl: ''
    });

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Ensure it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        try {
            setIsUploading(true);

            // Create a local preview immediately
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);

            // Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('recipe-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from('recipe-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, imageUrl: data.publicUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

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
            imageUrl: formData.imageUrl || undefined,
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 pb-24 transition-colors">
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-2">Add Custom Recipe</h1>
                    <p className="text-gray-600 dark:text-gray-400">Save your own perfected settings for future reference.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                    {/* Image Upload Area */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipe Photo (Optional)</label>

                        <div
                            className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-colors ${previewUrl || formData.imageUrl
                                    ? 'border-transparent bg-gray-100 dark:bg-gray-800'
                                    : 'border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 bg-gray-50 dark:bg-gray-800/50'
                                }`}
                        >
                            {(previewUrl || formData.imageUrl) ? (
                                <div className="relative aspect-video w-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={previewUrl || formData.imageUrl}
                                        alt="Recipe preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium text-sm hover:bg-gray-100 transform scale-95 hover:scale-100 transition-all"
                                        >
                                            Change Photo
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="flex justify-center gap-4 mb-4">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-orange-500 text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-all"
                                        >
                                            <Camera className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-medium">Camera</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-orange-500 text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-all"
                                        >
                                            <ImageIcon className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-medium">Gallery</span>
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Take a photo of your food or upload from your device
                                    </p>
                                </div>
                            )}

                            {isUploading && (
                                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex flex-col items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-2" />
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading...</p>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Food Name *</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Sweet Potato Fries"
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cooking Mode</label>
                            <select
                                id="mode"
                                name="mode"
                                value={formData.mode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                                <option value="Air Fryer">Air Fryer</option>
                                <option value="Toaster">Toaster</option>
                                <option value="Grill">Grill</option>
                                <option value="Dry Fruit">Dry Fruit</option>
                                <option value="Pizza">Pizza</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Temperature (°C)</label>
                            <input
                                required
                                type="number"
                                id="temperature"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                min={80} max={230}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="timeMin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Min Time</label>
                            <input
                                required
                                type="number"
                                id="timeMin"
                                name="timeMin"
                                value={formData.timeMin}
                                onChange={handleChange}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="timeMax" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Time (Opt)</label>
                            <input
                                type="number"
                                id="timeMax"
                                name="timeMax"
                                value={formData.timeMax}
                                onChange={handleChange}
                                min={1}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="timeUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit</label>
                            <select
                                id="timeUnit"
                                name="timeUnit"
                                value={formData.timeUnit}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                                <option value="min">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="accessory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Accessory</label>
                            <select
                                id="accessory"
                                name="accessory"
                                value={formData.accessory}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                                <option value="Fryer basket">Fryer basket</option>
                                <option value="Bake tray">Bake tray</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="rackPosition" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rack Position</label>
                            <select
                                id="rackPosition"
                                name="rackPosition"
                                value={formData.rackPosition}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            >
                                <option value="Top rack level">Top rack level</option>
                                <option value="Middle rack level">Middle rack level</option>
                                <option value="Bottom rack level">Bottom rack level</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="e.g., Turn halfway through, spray with olive oil..."
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
