import { manualData } from '@/data/manual';
import { Info, Settings, ShieldCheck } from 'lucide-react';

export default function ManualPage() {
    const { productSpecs, accessories, controlPanel, generalTips } = manualData;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 transition-colors">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-2">Digital Manual</h1>
                    <p className="text-gray-600 dark:text-gray-400">Reference specifications, controls, and tips for the {productSpecs.model}.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Info className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Product Specifications</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(productSpecs).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Control Panel</h3>
                        </div>
                        <ul className="space-y-2">
                            {controlPanel.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Accessories</h3>
                        </div>
                        <ul className="space-y-2">
                            {accessories.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-amber-900 dark:text-amber-500 mb-4">Cooking Tips & Notes</h2>
                    <ul className="space-y-3">
                        {generalTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-amber-800 dark:text-amber-400 text-sm">
                                <span className="mt-1 font-bold">•</span>
                                <span className="leading-relaxed">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
