import React, { useMemo, useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { ChatBot } from './ChatBot';
import { KitRecommendation } from './KitRecommendation';
import { PeriodTracker } from './PeriodTracker';
import { Toast } from './ui/Toast';
import {
    Thermometer,
    Heart,
    Activity,
    Moon,
    Edit3,
    Smile,
    Sparkles,
    Droplets,
    Calendar,
    ChevronLeft
} from 'lucide-react';
import kitImage from '../assets/kit.png';
import { motion, AnimatePresence } from 'framer-motion';

// Past Periods History Component
const PastPeriodsHistory = ({ data, onBack }) => {
    const sortedDates = Object.keys(data).sort((a, b) => new Date(b) - new Date(a));

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen w-full bg-[#FDFBF7] z-[100] fixed inset-0 overflow-y-auto flex flex-col"
        >
            <div className="sticky top-0 bg-[#FF6F91] p-6 flex items-center justify-between text-white z-20 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <h2 className="text-xl font-bold">Past Periods Data</h2>
                </div>
                <button
                    onClick={onBack}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2"
                >
                    <ChevronLeft size={18} />
                    Back to Dashboard
                </button>
            </div>

            <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-6">
                {sortedDates.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-sm">
                        <p className="text-gray-500 font-medium">No past period data found yet.</p>
                        <p className="text-sm text-gray-400 mt-2">Start tracking to see your history here!</p>
                    </div>
                ) : (
                    sortedDates.map(date => {
                        const dayData = data[date];
                        return (
                            <div key={date} className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4 border-b border-pink-50 pb-3">
                                    <h3 className="text-lg font-bold text-[#FF6F91]">
                                        {new Date(date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {dayData.flow && (
                                        <div className="bg-pink-50/50 p-3 rounded-2xl">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Flow</p>
                                            <p className="font-bold text-gray-700">{dayData.flow}</p>
                                        </div>
                                    )}
                                    {dayData.cramps && (
                                        <div className="bg-pink-50/50 p-3 rounded-2xl">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Cramps</p>
                                            <p className="font-bold text-gray-700">{dayData.cramps}</p>
                                        </div>
                                    )}
                                    {dayData.mood && (
                                        <div className="bg-pink-50/50 p-3 rounded-2xl">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Mood</p>
                                            <p className="font-bold text-gray-700">{dayData.mood}</p>
                                        </div>
                                    )}
                                    {dayData.fatigue && (
                                        <div className="bg-pink-50/50 p-3 rounded-2xl">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Fatigue</p>
                                            <p className="font-bold text-gray-700">{dayData.fatigue}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
};

// Logged In Dashboard Component
const Dashboard = ({
    cycleData,
    isOnPeriod,
    handleEndPeriod,
    handlePeriodToggle,
    setShowHistory,
    setShowPeriodTracker,
    onLogMood,
    onLogSymptoms,
    onGenerateKit
}) => {
    const { daysUntilNextPeriod, phase, insight } = cycleData || {
        daysUntilNextPeriod: 5,
        phase: 'Follicular',
        insight: 'Energy levels are rising!'
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-left pb-20">

            {/* 1. Cycle Status Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 text-center">
                <p className="text-gray-500 font-medium mb-2">Your period is expected in</p>
                <div className="text-6xl font-display font-bold text-[#FF6F91] mb-2">
                    {daysUntilNextPeriod} Days
                </div>
                <p className="text-sm text-gray-400 mb-6 font-medium">
                    Connect a wearable to get notified in advance
                </p>

                <div className="inline-block bg-pink-50 px-6 py-3 rounded-2xl mb-6">
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Current cycle phase</p>
                    <p className="text-xl font-bold text-gray-800">{phase}</p>
                </div>

                <div className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed bg-white/50 p-4 rounded-xl border border-pink-50">
                    ✨ <strong>Insight:</strong> {insight}
                </div>
            </div>

            {/* 2. Daily Logs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Symptoms Card */}
                <div
                    onClick={onLogSymptoms}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-pink-50/50"
                >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                        <Edit3 size={24} />
                    </div>
                    <p className="font-bold text-gray-700">Log today's symptoms</p>
                </div>

                {/* Mood Card */}
                <div
                    onClick={onLogMood}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-pink-50/50"
                >
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                        <Smile size={24} />
                    </div>
                    <p className="font-bold text-gray-700">Log today's mood</p>
                </div>

                {/* Track period card */}
                {isOnPeriod && (
                    <div
                        onClick={() => setShowPeriodTracker(true)}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-shadow hover:bg-pink-50/50 md:col-span-2 lg:col-span-1"
                    >
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                            <Droplets size={24} />
                        </div>
                        <p className="font-bold text-gray-700">Track your period</p>
                    </div>
                )}
            </div>

            {/* Period Tracking Section */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Period Tracking</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {!isOnPeriod ? (
                            <>
                                <p className="text-gray-600 font-medium">Are you on your period currently?</p>
                                <div className="flex items-center gap-2 bg-pink-50/50 p-1.5 rounded-full border border-pink-100">
                                    <button
                                        onClick={() => handlePeriodToggle(true)}
                                        className="px-6 py-2 rounded-full text-sm font-bold transition-all text-gray-500 hover:bg-pink-100"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => handlePeriodToggle(false)}
                                        className="px-6 py-2 rounded-full text-sm font-bold transition-all bg-[#FF6F91] text-white shadow-md"
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 font-medium">Has your period ended?</p>
                                <div className="flex items-center gap-2 bg-pink-50/50 p-1.5 rounded-full border border-pink-100">
                                    <button
                                        onClick={handleEndPeriod}
                                        className="px-6 py-2 rounded-full text-sm font-bold transition-all text-gray-500 hover:bg-pink-100"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="px-6 py-2 rounded-full text-sm font-bold transition-all bg-[#FF6F91] text-white shadow-md"
                                    >
                                        No
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Past Periods Data Button */}
                    <button
                        onClick={() => setShowHistory(true)}
                        className="w-full py-3 bg-pink-50 text-[#FF6F91] font-bold rounded-2xl hover:bg-pink-100 transition-colors flex items-center justify-center gap-2 border border-pink-100"
                    >
                        <Calendar size={18} />
                        Your past periods data
                    </button>
                </div>
            </div>

            {/* 3. Sensor Data Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pl-1">Your sensor data</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Basal Body Temperature */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center text-center gap-2">
                        <Thermometer className="text-orange-400 mb-1" size={28} />
                        <span className="text-lg font-bold text-gray-800">36.5°C</span>
                        <span className="text-xs text-gray-500 font-medium">Basal body temperature</span>
                    </div>

                    {/* Heart Rate */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center text-center gap-2">
                        <Heart className="text-rose-500 mb-1" size={28} />
                        <span className="text-lg font-bold text-gray-800">72 bpm</span>
                        <span className="text-xs text-gray-500 font-medium">Heart rate</span>
                    </div>

                    {/* Skin Conductivity */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center text-center gap-2">
                        <Activity className="text-teal-500 mb-1" size={28} />
                        <span className="text-lg font-bold text-gray-800">2.5 µS</span>
                        <span className="text-xs text-gray-500 font-medium">Skin conductivity</span>
                    </div>

                    {/* Sleep Pattern */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center text-center gap-2">
                        <Moon className="text-indigo-400 mb-1" size={28} />
                        <span className="text-lg font-bold text-gray-800">8h 12m</span>
                        <span className="text-xs text-gray-500 font-medium">See your sleep pattern</span>
                    </div>
                </div>
            </div>

            {/* 4. Customised Period Kit Section */}
            <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="border border-[#FF6F91] mt-8 w-full bg-[#FFF5F7] rounded-3xl overflow-hidden border border-pink-100 cursor-pointer transition-all duration-300 group"
            >
                <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={kitImage}
                            alt="Custom Period Kit"
                            className="w-full max-w-[400px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-[#FF6F91] mb-4">
                            Get customised period kit suggested by AI delivered based on your needs for this month
                        </h2>
                        <button
                            onClick={onGenerateKit}
                            className="px-6 py-3 bg-[#FF6F91] text-white font-bold rounded-full shadow-md hover:bg-[#FF5C82] transition-colors"
                        >
                            Generate Kit Suggestion
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const HomePage = ({ isLoggedIn, userData, onLogin, onSignup, onLogout, onLogSymptoms, onLogMood }) => {
    const [kitState, setKitState] = useState('idle'); // idle, loading, recommended
    const [isOnPeriod, setIsOnPeriod] = useState(false);
    const [periodStartDate, setPeriodStartDate] = useState(null);
    const [periodDailyData, setPeriodDailyData] = useState({});
    const [showPeriodTracker, setShowPeriodTracker] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleGenerateKit = () => {
        setKitState('loading');
        setTimeout(() => {
            setKitState('recommended');
        }, 4000);
    };

    const handlePeriodToggle = (value) => {
        setIsOnPeriod(value);
    };

    const handleEndPeriod = () => {
        setIsOnPeriod(false);
        setPeriodStartDate(null);
        // We no longer clear periodDailyData to preserve history
    };

    // Cycle Logic
    const cycleData = useMemo(() => {
        if (!userData || !userData.lastPeriod) return null;

        const cycleLength = parseInt(userData.cycleLength) || 28;
        const periodDuration = parseInt(userData.periodDuration) || 5;
        const lastPeriodDate = new Date(userData.lastPeriod);
        const today = new Date();

        // Calculate days elapsed since last period
        const diffTime = Math.abs(today - lastPeriodDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Current day in cycle (1-based)
        const currentCycleDay = (diffDays % cycleLength) || cycleLength;

        // Calculate next period
        const daysUntilNextPeriod = cycleLength - currentCycleDay;

        // Determine Phase
        let phase = 'Follicular';
        let insight = "Energy levels are rising! You might feel more social, optimistic, and confident.";

        const ovulationDay = cycleLength - 14;
        const fertileStart = ovulationDay - 4;
        const fertileEnd = ovulationDay + 1;

        if (currentCycleDay <= periodDuration) {
            phase = 'Menstrual';
            insight = "Rest and recharge. Your energy might be lower, so take it easy and prioritize self-care.";
        } else if (currentCycleDay < fertileStart) {
            phase = 'Follicular';
            insight = "Your energy is bouncing back! You might feel creative and ready to potential new projects.";
        } else if (currentCycleDay <= fertileEnd) {
            phase = 'Ovulation';
            insight = "Peak energy and confidence! You're likely at your most social and high-energy right now.";
        } else {
            phase = 'Luteal';
            insight = "Winding down. You might feel more introspective or experience PMS symptoms. Be gentle with yourself.";
        }

        if (isOnPeriod) {
            return {
                daysUntilNextPeriod: 0,
                phase: 'Menstrual',
                insight: "Rest and recharge. Your energy might be lower, so take it easy and prioritize self-care.",
                currentCycleDay
            };
        }

        return {
            daysUntilNextPeriod,
            phase,
            insight,
            currentCycleDay
        };

    }, [userData, isOnPeriod]);

    if (kitState === 'recommended') {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
                <main className="pt-8 pb-12">
                    <KitRecommendation onBack={() => setKitState('idle')} userData={userData} />
                </main>
            </div>
        );
    }

    if (kitState === 'loading') {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-pink-100 border-t-[#FF6F91] rounded-full animate-spin"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF6F91] animate-pulse" size={32} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-display font-bold text-gray-800">Hang tight!</h2>
                        <p className="text-slate-600 animate-pulse font-medium">
                            Crafting the perfect care kit based on your unique menstrual needs...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <AnimatePresence>
                {showHistory && (
                    <PastPeriodsHistory
                        data={periodDailyData}
                        onBack={() => setShowHistory(false)}
                    />
                )}
            </AnimatePresence>

            {showPeriodTracker ? (
                <PeriodTracker
                    isOpen={true}
                    onClose={() => setShowPeriodTracker(false)}
                    onEndPeriod={handleEndPeriod}
                    periodStartDate={periodStartDate}
                    setPeriodStartDate={setPeriodStartDate}
                    dailyData={periodDailyData}
                    setDailyData={setPeriodDailyData}
                    isOnPeriod={isOnPeriod}
                    handlePeriodToggle={handlePeriodToggle}
                />
            ) : (
                <>
                    <Navbar
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                        onLogin={onLogin}
                        onSignup={onSignup}
                        onLogout={onLogout}
                    />

                    <main className={`flex-1 flex flex-col items-center ${isLoggedIn ? 'justify-start pt-8 pb-12' : 'justify-center'} p-4`}>
                        <div className={`w-full transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {isLoggedIn ? (
                                <Dashboard
                                    cycleData={cycleData}
                                    isOnPeriod={isOnPeriod}
                                    handleEndPeriod={handleEndPeriod}
                                    handlePeriodToggle={handlePeriodToggle}
                                    setShowHistory={setShowHistory}
                                    setShowPeriodTracker={setShowPeriodTracker}
                                    onLogMood={onLogMood}
                                    onLogSymptoms={onLogSymptoms}
                                    onGenerateKit={handleGenerateKit}
                                />
                            ) : (
                                <div className="max-w-2xl mx-auto text-center py-12">
                                    <h1 className="text-5xl md:text-6xl font-display font-bold text-[#FF6F91] mb-6 leading-[1.1]">
                                        Understand Your Cycle,<br />Embrace Your Health
                                    </h1>
                                    <p className="text-xl md:text-2xl text-slate-600 mb-10 font-body leading-relaxed max-w-xl mx-auto">
                                        MoonCare helps you track, understand, and improve your menstrual health through personalized insights and gentle care.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={onSignup}
                                            className="px-8 py-4 bg-[#FF6F91] text-white text-lg font-bold rounded-full shadow-lg hover:bg-[#FF5C82] hover:scale-105 transition-all"
                                        >
                                            Get Started Today
                                        </button>
                                        <button
                                            onClick={onLogin}
                                            className="px-8 py-4 bg-white text-[#FF6F91] border-2 border-[#FFD6E0] text-lg font-bold rounded-full hover:bg-pink-50 transition-all"
                                        >
                                            I have an account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                    <ChatBot className="sticky bottom-4 right-4" />
                </>
            )}

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};
