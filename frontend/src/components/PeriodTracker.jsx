import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Droplets, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PeriodTracker = ({
    isOpen,
    onClose,
    onEndPeriod,
    periodStartDate,
    setPeriodStartDate,
    dailyData,
    setDailyData,
    isOnPeriod,
    handlePeriodToggle
}) => {
    const [selectedDate, setSelectedDate] = useState(periodStartDate || new Date().toISOString().split('T')[0]);
    const [currentViewDate, setCurrentViewDate] = useState(new Date().toISOString().split('T')[0]);
    const [hasSetStartDate, setHasSetStartDate] = useState(!!periodStartDate);

    const handleSetStartDate = () => {
        setPeriodStartDate(selectedDate);
        setHasSetStartDate(true);
    };

    const dayNumber = useMemo(() => {
        if (!periodStartDate) return 1;
        const start = new Date(periodStartDate);
        const current = new Date(currentViewDate);
        start.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);
        const diffTime = current.getTime() - start.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
    }, [periodStartDate, currentViewDate]);

    const canGoNext = useMemo(() => {
        const current = new Date(currentViewDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);
        return current.getTime() < today.getTime();
    }, [currentViewDate]);

    const canGoPrevious = useMemo(() => {
        if (!periodStartDate) return false;
        const current = new Date(currentViewDate);
        const start = new Date(periodStartDate);
        current.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        return current.getTime() > start.getTime();
    }, [currentViewDate, periodStartDate]);

    const handlePreviousDay = () => {
        if (canGoPrevious) {
            const date = new Date(currentViewDate);
            date.setDate(date.getDate() - 1);
            setCurrentViewDate(date.toISOString().split('T')[0]);
        }
    };

    const handleNextDay = () => {
        if (canGoNext) {
            const date = new Date(currentViewDate);
            date.setDate(date.getDate() + 1);
            setCurrentViewDate(date.toISOString().split('T')[0]);
        }
    };

    const currentDayData = dailyData[currentViewDate] || {};

    const updateDailyData = (field, value) => {
        setDailyData(prev => ({
            ...prev,
            [currentViewDate]: {
                ...prev[currentViewDate],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        onClose();
        // The parent HomePage logic already has Toast and handles closing
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="min-h-screen w-full bg-[#FDFBF7] z-[100] fixed inset-0 overflow-y-auto flex flex-col"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-[#FF6F91] p-6 flex items-center justify-between text-white z-20 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Activity size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Track Your Period</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2"
                        >
                            <X size={18} />
                            Exit
                        </button>
                    </div>

                    <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-6">
                        {!hasSetStartDate ? (
                            // Start Date Selection
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-800">Select starting date of your period</h3>
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="flex-1 px-4 py-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#FF6F91]/20 outline-none"
                                    />
                                    <button
                                        onClick={handleSetStartDate}
                                        className="px-6 py-3 bg-[#FF6F91] text-white font-bold rounded-xl hover:bg-[#FF5C82] transition-colors shadow-md"
                                    >
                                        Set date
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Start Date Confirmation */}
                                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
                                    <p className="text-gray-700 font-medium">
                                        Your period started on:{' '}
                                        <span className="font-bold text-[#FF6F91]">
                                            {new Date(periodStartDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </p>
                                </div>

                                {/* Day Navigation */}
                                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
                                    <button
                                        onClick={handlePreviousDay}
                                        disabled={!canGoPrevious}
                                        className="p-2 rounded-full hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronLeft size={24} className="text-[#FF6F91]" />
                                    </button>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-[#FF6F91]">Day {dayNumber}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(currentViewDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleNextDay}
                                        disabled={!canGoNext}
                                        className="p-2 rounded-full hover:bg-pink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                    >
                                        <ChevronRight size={24} className="text-[#FF6F91]" />
                                    </button>
                                </div>

                                {/* Daily Questions */}
                                <div className="space-y-4">
                                    {/* Flow Intensity */}
                                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-3">How much was your flow today?</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {['Light', 'Medium', 'Heavy'].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => updateDailyData('flow', option)}
                                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${currentDayData.flow === option
                                                        ? 'bg-[#FF6F91] text-white shadow-md'
                                                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cramp Severity */}
                                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-3">How painful were your cramps today?</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {['No cramps', 'Mild', 'Medium', 'Very painful'].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => updateDailyData('cramps', option)}
                                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${currentDayData.cramps === option
                                                        ? 'bg-[#FF6F91] text-white shadow-md'
                                                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fatigue */}
                                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-3">Did you experience fatigue today?</h4>
                                        <div className="flex gap-2">
                                            {['Yes', 'No'].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => updateDailyData('fatigue', option)}
                                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${currentDayData.fatigue === option
                                                        ? 'bg-[#FF6F91] text-white shadow-md'
                                                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mood */}
                                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-3">Any mood changes today?</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {['Calm', 'Irritable', 'Low', 'Anxious'].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => updateDailyData('mood', option)}
                                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${currentDayData.mood === option
                                                        ? 'bg-[#FF6F91] text-white shadow-md'
                                                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pain Relief */}
                                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-3">Did you take pain relief today?</h4>
                                        <div className="flex gap-2">
                                            {['Yes', 'No'].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => updateDailyData('painRelief', option)}
                                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${currentDayData.painRelief === option
                                                        ? 'bg-[#FF6F91] text-white shadow-md'
                                                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Save Data Button */}
                                <button
                                    onClick={handleSave}
                                    className="w-full py-4 bg-[#FF6F91] text-white font-bold rounded-xl hover:bg-[#FF5C82] transition-colors shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Activity size={20} />
                                    Save data for today
                                </button>

                                {/* End Period Button */}
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to end period tracking?')) {
                                            onEndPeriod();
                                            onClose();
                                        }
                                    }}
                                    className="w-full py-3 bg-white border-2 border-[#FF6F91]/20 text-[#FF6F91] font-bold rounded-xl hover:bg-pink-50 transition-colors text-sm"
                                >
                                    End Period Tracking
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
