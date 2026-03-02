'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        async function fetchFavorites() {
            const { data, error } = await supabase.from('favorites').select('recipe_id');
            if (error) {
                console.error('Error fetching favorites:', error);
            } else if (data) {
                setFavorites(data.map(d => d.recipe_id));
            }
        }
        fetchFavorites();
    }, []);

    const toggleFavorite = async (id: string) => {
        const isFav = favorites.includes(id);

        // Optimistic update
        setFavorites(prev =>
            isFav ? prev.filter(favId => favId !== id) : [...prev, id]
        );

        if (isFav) {
            const { error } = await supabase.from('favorites').delete().eq('recipe_id', id);
            if (error) console.error('Error removing favorite:', error);
        } else {
            const { error } = await supabase.from('favorites').insert({ recipe_id: id });
            if (error) console.error('Error adding favorite:', error);
        }
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
}
