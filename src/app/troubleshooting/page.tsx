import { troubleshootingData } from '@/data/troubleshooting';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TroubleshootingPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Troubleshooting</h1>
                    <p className="text-gray-600">Quick fixes for common issues with your air fryer oven.</p>
                </div>

                <div className="space-y-4">
                    {troubleshootingData.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    {item.issue}
                                </h3>
                            </div>
                            <div className="p-5 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Possible Causes</h4>
                                    <ul className="space-y-2">
                                        {item.possibleCauses.map((cause, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                                <span className="text-sm leading-relaxed">{cause}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Solutions</h4>
                                    <ul className="space-y-2">
                                        {item.solutions.map((solution, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm leading-relaxed">{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
