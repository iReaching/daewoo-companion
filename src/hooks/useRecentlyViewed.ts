'use client';
import { useLocalStorage } from './useLocalStorage';

export function useRecentlyViewed() {
    const [recentIds, setRecentIds] = useLocalStorage<string[]>('daewoo_recent_recipes', []);

    const addRecent = (id: string) => {
        setRecentIds((prev) => {
            const filtered = prev.filter((item) => item !== id);
            return [id, ...filtered].slice(0, 10); // Keep last 10
        });
    };

    return { recentIds, addRecent };
}
