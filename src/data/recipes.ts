export type CookingMode = 'Air Fryer' | 'Toaster' | 'Grill' | 'Dry Fruit' | 'Pizza';
export type Accessory = 'Fryer basket' | 'Bake tray';
export type RackPosition = 'Top rack level' | 'Middle rack level' | 'Bottom rack level';

export interface Recipe {
    id: string;
    name: string;
    mode: CookingMode;
    timeMin: number;
    timeMax?: number;
    timeUnit: 'min' | 'hours';
    temperature: number; // in Celsius
    accessory: Accessory;
    rackPosition: RackPosition;
    notes?: string;
    isCustom?: boolean;
    imageUrl?: string;
}

export const defaultRecipes: Recipe[] = [
    {
        id: 'french-fries',
        name: 'French fries',
        mode: 'Air Fryer',
        timeMin: 18,
        timeMax: 25,
        timeUnit: 'min',
        temperature: 230,
        accessory: 'Fryer basket',
        rackPosition: 'Middle rack level',
        notes: 'About 400g, turn food',
        imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'chicken-wings',
        name: 'Chicken wings',
        mode: 'Air Fryer',
        timeMin: 18,
        timeMax: 25,
        timeUnit: 'min',
        temperature: 230,
        accessory: 'Bake tray',
        rackPosition: 'Middle rack level',
        notes: 'Food turning',
        imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'pork-chop',
        name: 'Pork chop',
        mode: 'Air Fryer',
        timeMin: 30,
        timeUnit: 'min',
        temperature: 230,
        accessory: 'Bake tray',
        rackPosition: 'Middle rack level',
        notes: 'Food turning',
        imageUrl: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'popcorn-chicken',
        name: 'Popcorn chicken',
        mode: 'Air Fryer',
        timeMin: 18,
        timeUnit: 'min',
        temperature: 200,
        accessory: 'Fryer basket',
        rackPosition: 'Middle rack level',
        imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'egg-tart',
        name: 'Egg tart',
        mode: 'Toaster',
        timeMin: 12,
        timeMax: 15,
        timeUnit: 'min',
        temperature: 180,
        accessory: 'Bake tray',
        rackPosition: 'Bottom rack level',
        imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'cake',
        name: 'Cake',
        mode: 'Toaster',
        timeMin: 15,
        timeUnit: 'min',
        temperature: 160,
        accessory: 'Bake tray',
        rackPosition: 'Bottom rack level',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'cookies',
        name: 'Cookies',
        mode: 'Toaster',
        timeMin: 18,
        timeUnit: 'min',
        temperature: 180,
        accessory: 'Bake tray',
        rackPosition: 'Bottom rack level',
        notes: 'Food turning',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'roast-whole-chicken',
        name: 'Roast whole chicken',
        mode: 'Grill',
        timeMin: 30,
        timeUnit: 'min',
        temperature: 230,
        accessory: 'Fryer basket',
        rackPosition: 'Bottom rack level',
        imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'dry-fruits',
        name: 'Dry fruits',
        mode: 'Dry Fruit',
        timeMin: 7,
        timeUnit: 'hours',
        temperature: 80,
        accessory: 'Fryer basket',
        rackPosition: 'Middle rack level',
        notes: 'Adjust time according to fruit thickness',
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'pizza',
        name: 'Pizza',
        mode: 'Pizza',
        timeMin: 10,
        timeMax: 12,
        timeUnit: 'min',
        temperature: 200,
        accessory: 'Bake tray',
        rackPosition: 'Bottom rack level',
        notes: 'Needs to be defrosted',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'
    }
];
