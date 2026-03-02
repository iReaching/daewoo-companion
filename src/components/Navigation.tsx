'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Wrench, FileText, Heart, ShieldAlert } from 'lucide-react';

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

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden md:flex flex-col w-64 bg-white border-r border-orange-100 h-screen fixed top-0 left-0 p-4">
                <div className="mb-8 px-2">
                    <h1 className="text-xl font-bold font-serif text-orange-900 tracking-tight leading-tight">Daewoo 16L</h1>
                    <p className="text-xs text-orange-600 mt-1">Air Fryer Companion</p>
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
                                        ? 'bg-orange-100 text-orange-900 font-medium'
                                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-800'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-40">
                <div className="flex justify-around items-center h-16 px-2">
                    {navItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-orange-500'
                                    }`}
                            >
                                <div className={`p-1 rounded-full ${isActive ? 'bg-orange-100' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};
