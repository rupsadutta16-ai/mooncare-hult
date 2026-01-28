import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const PeriodSymptoms = ({ formData, updateFormData, onNext, onBack }) => {
    const symptomsList = [
        { id: 'cramps', label: 'Severe pain or cramps', emoji: '😣' },
        { id: 'mood', label: 'Mood swings & irritation', emoji: '😠' },
        { id: 'acne', label: 'Acne or skin problems', emoji: '🧖‍♀️' },
        { id: 'heavy', label: 'Heavy flow', emoji: '🩸' },
        { id: 'low', label: 'Low flow', emoji: '💧' },
        { id: 'sleep', label: 'Sleep disturbance', emoji: '😴' },
        { id: 'fatigue', label: 'Fatigue or weakness', emoji: '😫' },
        { id: 'itching', label: 'Itching/Irritation/Rashes', emoji: '😣' },
        { id: 'none', label: 'No major issue', emoji: '✨' },
    ];


    const handleToggle = (id) => {
        const current = formData.symptoms || [];
        if (current.includes(id)) {
            updateFormData({ symptoms: current.filter(s => s !== id) });
        } else {
            if (id === 'none') {
                updateFormData({ symptoms: ['none'] });
            } else {
                const newSymptoms = current.filter(s => s !== 'none');
                updateFormData({ symptoms: [...newSymptoms, id] });
            }
        }
    };

    const isSelected = (id) => (formData.symptoms || []).includes(id);

    return (
        <Card className="max-w-2xl mx-auto h-full flex flex-col md:overflow-visible overflow-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#FF6F91]">What symptoms do you usually experience?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 overflow-y-auto max-h-[60vh] sm:max-h-none p-1">
                {symptomsList.map((symptom) => {
                    const active = isSelected(symptom.id);
                    return (
                        <motion.button
                            key={symptom.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggle(symptom.id)}
                            className={clsx(
                                "flex items-center p-4 rounded-2xl border-2 text-left transition-all relative",
                                active
                                    ? "border-[#FF6F91] bg-pink-50 text-[#FF6F91] shadow-sm"
                                    : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <span className="text-2xl mr-3">{symptom.emoji}</span>
                            <span className="font-semibold text-lg flex-1">{symptom.label}</span>
                            {active && (
                                <div className="bg-[#FF6F91] rounded-full p-1 ml-2">
                                    <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex justify-between items-center bg-white pt-4 mt-auto border-t border-slate-100 sticky bottom-0">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-slate-600">
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!formData.symptoms || formData.symptoms.length === 0}
                    className={clsx("gap-2", (!formData.symptoms || formData.symptoms.length === 0) && "opacity-50 cursor-not-allowed")}
                >
                    Next <ArrowRight size={18} />
                </Button>
            </div>
        </Card>
    );
};
