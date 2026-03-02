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
    }
];
