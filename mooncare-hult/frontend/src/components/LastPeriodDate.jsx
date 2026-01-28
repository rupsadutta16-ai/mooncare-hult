import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export const LastPeriodDate = ({ formData, updateFormData, onNext, onBack }) => {
    return (
        <Card className="max-w-md mx-auto relative overflow-hidden">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#FF6F91]">When was your last period?</h2>

            <div className="mb-8 relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                    Select Date
                </label>
                <div className="relative">
                    <input
                        type="date"
                        value={formData.lastPeriod}
                        onChange={(e) => updateFormData({ lastPeriod: e.target.value })}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-4 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium text-slate-700 appearance-none pl-12"
                    />
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6F91] w-6 h-6 pointer-events-none" />
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-slate-600">
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!formData.lastPeriod}
                    className={`gap-2 ${!formData.lastPeriod && "opacity-50 cursor-not-allowed"}`}
                >
                    Next <ArrowRight size={18} />
                </Button>
            </div>
        </Card>
    );
};
