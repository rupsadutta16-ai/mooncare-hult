import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export const BasicDetails = ({ formData, updateFormData, onNext }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.age || formData.age < 10 || formData.age > 100) newErrors.age = "Please enter a valid age";

        if (formData.heightUnit === 'cm') {
            if (!formData.heightValue || formData.heightValue < 50 || formData.heightValue > 300) newErrors.height = "Please enter a valid height";
        } else {
            if (!formData.heightFeet && !formData.heightInches) newErrors.height = "Please enter your height";
        }

        if (!formData.weightValue || formData.weightValue < 20 || formData.weightValue > 300) newErrors.weight = "Please enter a valid weight";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    const InputLabel = ({ children }) => (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
            {children}
        </label>
    );

    return (
        <Card className="max-w-md mx-auto relative overflow-hidden">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#FF6F91]">Basic Details</h2>

            <div className="space-y-6">
                {/* Age Input */}
                <div>
                    <InputLabel>Age (years)</InputLabel>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => updateFormData({ age: e.target.value })}
                        placeholder="e.g. 24"
                        className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium placeholder:text-slate-300"
                    />
                    {errors.age && <p className="text-red-400 text-xs mt-1 ml-1">{errors.age}</p>}
                </div>

                {/* Height Input */}
                <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                        <label className="block text-sm font-semibold text-slate-700">Height</label>
                        <div className="flex bg-pink-50 rounded-lg p-1">
                            {['cm', 'ft/in'].map(unit => (
                                <button
                                    key={unit}
                                    onClick={() => updateFormData({ heightUnit: unit })}
                                    className={clsx(
                                        "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                        formData.heightUnit === unit
                                            ? "bg-white text-[#FF6F91] shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>

                    {formData.heightUnit === 'cm' ? (
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.heightValue}
                                onChange={(e) => updateFormData({ heightValue: e.target.value })}
                                placeholder="e.g. 165"
                                className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">cm</span>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    value={formData.heightFeet}
                                    onChange={(e) => updateFormData({ heightFeet: e.target.value })}
                                    placeholder="5"
                                    className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ft</span>
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    value={formData.heightInches}
                                    onChange={(e) => updateFormData({ heightInches: e.target.value })}
                                    placeholder="4"
                                    className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">in</span>
                            </div>
                        </div>
                    )}
                    {errors.height && <p className="text-red-400 text-xs mt-1 ml-1">{errors.height}</p>}
                </div>

                {/* Weight Input */}
                <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                        <label className="block text-sm font-semibold text-slate-700">Weight</label>
                        <div className="flex bg-pink-50 rounded-lg p-1">
                            {['kg', 'lb'].map(unit => (
                                <button
                                    key={unit}
                                    onClick={() => updateFormData({ weightUnit: unit })}
                                    className={clsx(
                                        "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                        formData.weightUnit === unit
                                            ? "bg-white text-[#FF6F91] shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.weightValue}
                            onChange={(e) => updateFormData({ weightValue: e.target.value })}
                            placeholder="e.g. 60"
                            className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:border-[#FF6F91] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-lg font-medium"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">{formData.weightUnit}</span>
                    </div>
                    {errors.weight && <p className="text-red-400 text-xs mt-1 ml-1">{errors.weight}</p>}
                </div>

                <div className="pt-4 flex justify-end">
                    <Button onClick={handleNext} className="w-full sm:w-auto gap-2">
                        Next <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
