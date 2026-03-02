'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Wrench, FileText, Heart, ShieldAlert, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Recipes', icon: BookOpen, href: '/recipes' },
        { label: 'Saved', icon: Heart, href: '/favorites' },
        { label: 'Fix', icon: Wrench, href: '/troubleshooting' },
        { label: 'Manual', icon: FileText, href: '/manual' },
        { label: 'Safety', icon: ShieldAlert, href: '/safety' }
    ];

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-orange-100 dark:border-gray-800 h-screen fixed top-0 left-0 p-4 transition-colors">
                <div className="mb-8 px-2 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold font-serif text-orange-900 dark:text-orange-100 tracking-tight leading-tight">Daewoo 16L</h1>
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Air Fryer Companion</p>
                    </div>
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-800 dark:hover:text-orange-300'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-40 transition-colors">
                <div className="flex justify-around items-center h-16 px-2 relative">
                    {navItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-300'
                                    }`}
                            >
                                <div className={`p-1 rounded-full ${isActive ? 'bg-orange-100 dark:bg-orange-900/30' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="absolute -top-12 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
};
