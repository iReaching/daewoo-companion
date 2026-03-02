import { safetyData } from '@/data/safety';
import { Droplet, ShieldAlert } from 'lucide-react';

export default function SafetyPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Cleaning & Safety</h1>
                    <p className="text-gray-600">Important guidelines for maintaining your Daewoo 16L.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                    <div className="bg-red-50 p-5 flex items-center gap-3 border-b border-red-100">
                        <ShieldAlert className="w-6 h-6 text-red-600" />
                        <h2 className="text-xl font-bold text-red-900">Important Safeguards</h2>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-4">
                            {safetyData.safeguards.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-800">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="bg-blue-50 p-5 flex items-center gap-3 border-b border-blue-100">
                        <Droplet className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-blue-900">Cleaning Instructions</h2>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-4">
                            {safetyData.cleaningInstructions.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-800">
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2" />
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
