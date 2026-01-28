import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Calendar } from './ui/Calendar';

export const SymptomLogScreen = ({ onSave, onBack, historyLog = {} }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    // Load existing data when selectedDate changes
    useEffect(() => {
        if (historyLog[selectedDate]) {
            setSelectedSymptoms(historyLog[selectedDate]);
        } else {
            setSelectedSymptoms([]);
        }
    }, [selectedDate, historyLog]);

    const symptoms = [
        { id: 'cramps', label: 'Cramps', icon: '⚡' },
        { id: 'headache', label: 'Headache', icon: '🤕' },
        { id: 'bloating', label: 'Bloating', icon: '🐡' },
        { id: 'fatigue', label: 'Fatigue', icon: '😴' },
        { id: 'nausea', label: 'Nausea', icon: '🤢' },
        { id: 'acne', label: 'Acne', icon: '🧖‍♀️' },
        { id: 'cravings', label: 'Cravings', icon: '🍫' },
        { id: 'insomnia', label: 'Insomnia', icon: '🦉' }
    ];

    const toggleSymptom = (id) => {
        setSelectedSymptoms(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleSave = () => {
        onSave(selectedDate, selectedSymptoms);
    };

    // Prepare History List (Sort by date desc)
    const historyDates = Object.keys(historyLog).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            {/* Header */}
            <div className="p-6 flex items-center gap-4 bg-white shadow-sm border-b border-pink-50 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ArrowLeft className="text-gray-600" />
                </button>
                <h1 className="text-xl font-bold font-display text-gray-800">Log Symptoms</h1>
            </div>

            <div className="flex-1 p-6 max-w-2xl mx-auto w-full flex flex-col gap-8 pb-20">
                {/* Date Selection */}
                <div>
                    <label className="flex items-center gap-2 text-gray-600 font-bold mb-4 px-1">
                        Select Date
                    </label>
                    <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                    />
                </div>

                {/* Symptoms Grid */}
                <div>
                    <h2 className="text-lg font-bold text-gray-700 mb-4 px-1">What are you feeling on {selectedDate}?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {symptoms.map((symptom) => (
                            <motion.button
                                key={symptom.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleSymptom(symptom.id)}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedSymptoms.includes(symptom.id)
                                        ? 'bg-[#FF6F91] border-[#FF6F91] text-white shadow-lg'
                                        : 'bg-white border-pink-50 text-gray-600 hover:border-pink-200 shadow-sm'
                                    }`}
                            >
                                <span className="text-3xl filter drop-shadow-sm">{symptom.icon}</span>
                                <span className={`font-medium text-sm ${selectedSymptoms.includes(symptom.id) ? 'text-white' : 'text-gray-600'}`}>
                                    {symptom.label}
                                </span>
                                {selectedSymptoms.includes(symptom.id) && (
                                    <div className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5">
                                        <Check size={12} color="white" />
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* History Section */}
                {historyDates.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 mt-4">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Previous Logs</h3>
                        <div className="space-y-3">
                            {historyDates.map(date => (
                                <div key={date} className="flex items-start gap-4 p-3 bg-pink-50/50 rounded-2xl">
                                    <div className="bg-white px-3 py-1 rounded-lg text-sm font-bold text-[#FF6F91] shadow-sm whitespace-nowrap">
                                        {date}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {historyLog[date].map(sId => {
                                            const s = symptoms.find(sym => sym.id === sId);
                                            return s ? (
                                                <span key={sId} className="text-sm text-gray-600 bg-white px-2 py-1 rounded-md border border-pink-100 flex items-center gap-1">
                                                    {s.icon} {s.label}
                                                </span>
                                            ) : null;
                                        })}
                                        {historyLog[date].length === 0 && <span className="text-sm text-gray-400 italic">No symptoms logged</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-[#FF6F91] text-white font-bold rounded-full shadow-lg hover:bg-[#FF5C82] transition-transform hover:scale-[1.02]"
                    >
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};
