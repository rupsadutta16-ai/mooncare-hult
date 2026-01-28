import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Calendar } from './ui/Calendar';

export const MoodLogScreen = ({ onSave, onBack, historyLog = {} }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMood, setSelectedMood] = useState(null);

    // Load existing data
    useEffect(() => {
        if (historyLog[selectedDate]) {
            setSelectedMood(historyLog[selectedDate]);
        } else {
            setSelectedMood(null);
        }
    }, [selectedDate, historyLog]);

    const moods = [
        { id: 'happy', label: 'Happy', icon: '😊' },
        { id: 'calm', label: 'Calm', icon: '😌' },
        { id: 'energetic', label: 'Energetic', icon: '⚡' },
        { id: 'anxious', label: 'Anxious', icon: '😰' },
        { id: 'sad', label: 'Sad', icon: '😢' },
        { id: 'irritable', label: 'Irritable', icon: '😠' },
        { id: 'moody', label: 'Moody', icon: '🌀' },
        { id: 'tired', label: 'Tired', icon: '🥱' }
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleSave = () => {
        onSave(selectedDate, selectedMood);
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
                <h1 className="text-xl font-bold font-display text-gray-800">Log Mood</h1>
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

                {/* Mood Grid */}
                <div>
                    <h2 className="text-lg font-bold text-gray-700 mb-4 px-1">How are you feeling on {selectedDate}?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {moods.map((mood) => (
                            <motion.button
                                key={mood.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedMood(mood.id)}
                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedMood === mood.id
                                        ? 'bg-[#FF6F91] border-[#FF6F91] text-white shadow-lg'
                                        : 'bg-white border-pink-50 text-gray-600 hover:border-pink-200 shadow-sm'
                                    }`}
                            >
                                <span className="text-4xl filter drop-shadow-sm mb-1">{mood.icon}</span>
                                <span className={`font-medium text-sm ${selectedMood === mood.id ? 'text-white' : 'text-gray-600'}`}>
                                    {mood.label}
                                </span>
                                {selectedMood === mood.id && (
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
                            {historyDates.map(date => {
                                const moodId = historyLog[date];
                                const m = moods.find(md => md.id === moodId);
                                return (
                                    <div key={date} className="flex items-center gap-4 p-3 bg-pink-50/50 rounded-2xl">
                                        <div className="bg-white px-3 py-1 rounded-lg text-sm font-bold text-[#FF6F91] shadow-sm whitespace-nowrap">
                                            {date}
                                        </div>
                                        <div className="flex-1">
                                            {m ? (
                                                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <span className="text-xl">{m.icon}</span> {m.label}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-400 italic">No mood logged</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={!selectedMood}
                        className="w-full py-4 bg-[#FF6F91] text-white font-bold rounded-full shadow-lg hover:bg-[#FF5C82] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};
