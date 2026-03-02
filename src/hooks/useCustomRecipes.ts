'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Recipe, CookingMode, Accessory, RackPosition } from '@/data/recipes';

function mapRowToRecipe(row: any): Recipe {
    return {
        id: row.id,
        name: row.name,
        mode: row.mode as CookingMode,
        timeMin: row.time_min,
        timeMax: row.time_max ?? undefined,
        timeUnit: row.time_unit as 'min' | 'hours',
        temperature: row.temperature,
        accessory: row.accessory as Accessory,
        rackPosition: row.rack_position as RackPosition,
        notes: row.notes || undefined,
        imageUrl: row.image_url || undefined,
        isCustom: row.is_custom
    };
}

function mapRecipeToRow(recipe: Recipe): any {
    return {
        id: recipe.id,
        name: recipe.name,
        mode: recipe.mode,
        time_min: recipe.timeMin,
        time_max: recipe.timeMax || null,
        time_unit: recipe.timeUnit,
        temperature: recipe.temperature,
        accessory: recipe.accessory,
        rack_position: recipe.rackPosition,
        notes: recipe.notes || null,
        image_url: recipe.imageUrl || null,
        is_custom: true
    };
}

export function useCustomRecipes() {
    const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const { data, error } = await supabase.from('custom_recipes').select('*').order('created_at', { ascending: true });
            if (error) {
                console.error('Error fetching custom recipes:', error);
            } else if (data) {
                setCustomRecipes(data.map(mapRowToRecipe));
            }
        }
        fetchRecipes();
    }, []);

    const addRecipe = async (recipe: Recipe) => {
        const newRecipe = { ...recipe, isCustom: true };
        setCustomRecipes(prev => [...prev, newRecipe]);
        const { error } = await supabase.from('custom_recipes').insert(mapRecipeToRow(newRecipe));
        if (error) console.error('Error adding custom recipe:', error);
    };

    const updateRecipe = async (updatedRecipe: Recipe) => {
        setCustomRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
        const { error } = await supabase.from('custom_recipes').update(mapRecipeToRow(updatedRecipe)).eq('id', updatedRecipe.id);
        if (error) console.error('Error updating custom recipe:', error);
    };

    const deleteRecipe = async (id: string) => {
        setCustomRecipes(prev => prev.filter(r => r.id !== id));
        const { error } = await supabase.from('custom_recipes').delete().eq('id', id);
        if (error) console.error('Error deleting custom recipe:', error);
    };

    return { customRecipes, addRecipe, updateRecipe, deleteRecipe };
}
