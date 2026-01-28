import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, Check } from 'lucide-react';
import { clsx } from 'clsx';

export const PCODScreen = ({ formData, updateFormData, onNext, onBack }) => {
    const options = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'unsure', label: "I don't know" }
    ];

    return (
        <Card className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#FF6F91]">Do you have PCOD?</h2>

            <div className="space-y-4 mb-8">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => updateFormData({ pcod: option.value })}
                        className={clsx(
                            "w-full p-4 rounded-xl border-2 text-left transition-all relative group",
                            formData.pcod === option.value
                                ? "border-[#FF6F91] bg-pink-50 text-[#FF6F91]"
                                : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        <span className="font-semibold text-lg">{option.label}</span>
                        {formData.pcod === option.value && (
                            <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FF6F91]" />
                        )}
                        <div className={clsx(
                            "absolute inset-0 rounded-xl transition-opacity opacity-0 group-hover:opacity-10 pointer-events-none",
                            formData.pcod === option.value ? "bg-[#FF6F91]" : "bg-slate-400"
                        )} />
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-slate-600">
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!formData.pcod}
                    className={clsx("gap-2", !formData.pcod && "opacity-50 cursor-not-allowed")}
                >
                    Next <ArrowRight size={18} />
                </Button>
            </div>
        </Card>
    );
};
