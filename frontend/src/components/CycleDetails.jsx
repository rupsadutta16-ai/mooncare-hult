import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const CycleDetails = ({ formData, updateFormData, onNext, onBack }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.periodDuration || formData.periodDuration < 1 || formData.periodDuration > 15) {
            newErrors.periodDuration = "Please calculate your typical period length (1-15 days)";
        }
        if (!formData.cycleLength || formData.cycleLength < 15 || formData.cycleLength > 100) {
            newErrors.cycleLength = "Please enter a valid cycle length (15-100 days)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#FF6F91]">Cycle Details</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                        How many days does your period usually last?
                    </label>
                    <input
                        type="number"
                        value={formData.periodDuration}
                        onChange={(e) => updateFormData({ periodDuration: e.target.value })}
                        placeholder="e.g. 5"
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                    />
                    {errors.periodDuration && <p className="text-red-400 text-xs mt-1 ml-1">{errors.periodDuration}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                        How long is your menstrual cycle (in days)?
                    </label>
                    <input
                        type="number"
                        value={formData.cycleLength}
                        onChange={(e) => updateFormData({ cycleLength: e.target.value })}
                        placeholder="e.g. 28"
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                    />
                    <p className="text-xs text-slate-400 mt-1 ml-1">Usually between 21 and 35 days</p>
                    {errors.cycleLength && <p className="text-red-400 text-xs mt-1 ml-1">{errors.cycleLength}</p>}
                </div>

                <div className="pt-6 flex justify-between items-center">
                    <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-slate-600">
                        Back
                    </Button>
                    <Button onClick={handleSubmit} className="bg-[#FF6F91] shadow-md hover:shadow-lg gap-2">
                        Complete <CheckCircle size={18} />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
