import { safetyData } from '@/data/safety';
import { Droplet, ShieldAlert } from 'lucide-react';

export default function SafetyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 transition-colors">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-2">Cleaning & Safety</h1>
                    <p className="text-gray-600 dark:text-gray-400">Important guidelines for maintaining your Daewoo 16L.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden">
                    <div className="bg-red-50 dark:bg-red-950/30 p-5 flex items-center gap-3 border-b border-red-100 dark:border-red-900/30">
                        <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-500" />
                        <h2 className="text-xl font-bold text-red-900 dark:text-red-400">Important Safeguards</h2>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-4">
                            {safetyData.safeguards.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30 overflow-hidden">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-5 flex items-center gap-3 border-b border-blue-100 dark:border-blue-900/30">
                        <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400">Cleaning Instructions</h2>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-4">
                            {safetyData.cleaningInstructions.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 mt-2" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
