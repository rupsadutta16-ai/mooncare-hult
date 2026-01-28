import React, { useMemo, useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { ChatBot } from './ChatBot';
import { KitRecommendation } from './KitRecommendation';
import {
    Thermometer,
    Heart,
    Activity,
    Moon,
    Edit3,
    Smile,
    Sparkles
} from 'lucide-react';
import kitImage from '../assets/kit.png';

export const HomePage = ({ isLoggedIn, userData, onLogin, onSignup, onLogout, onLogSymptoms, onLogMood }) => {
    const [kitState, setKitState] = useState('idle'); // idle, loading, recommended
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

        // Logic Model:
        // Menstrual: Day 1 - periodDuration
        // Follicular: Day (periodDuration + 1) - (Ovulation - 4)
        // Ovulation (Fertile): (Ovulation - 3) - (Ovulation + 1) -> approx Day 11-15 for 28 day cycle
        // Luteal: (Ovulation + 2) - End

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

        return {
            daysUntilNextPeriod,
            phase,
            insight,
            currentCycleDay
        };

    }, [userData]);


    // Logged In Dashboard Component
    const Dashboard = () => {
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
                            <button className="px-6 py-3 bg-[#FF6F91] text-white font-bold rounded-full shadow-md hover:bg-[#FF5C82] transition-colors">
                                Generate Kit Suggestion
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* ChatBot Overlay */}
                <ChatBot />
            </div>
        );
    };

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
            <Navbar
                isLoggedIn={isLoggedIn}
                onLogin={onLogin}
                onSignup={onSignup}
                onLogout={onLogout}
            />

            <main className={`flex-1 flex flex-col items-center ${isLoggedIn ? 'justify-start pt-8 pb-12' : 'justify-center'} p-4`}>
                <div className={`w-full transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {isLoggedIn ? (
                        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-left pb-20">

                            {/* 1. Cycle Status Overview */}
                            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-100 text-center transition-all hover:shadow-md duration-500">
                                <p className="text-gray-500 font-medium mb-2">Your period is expected in</p>
                                <div className="text-6xl font-display font-bold text-[#FF6F91] mb-2">
                                    {cycleData?.daysUntilNextPeriod || 5} Days
                                </div>
                                <p className="text-sm text-gray-400 mb-6 font-medium">
                                    Connect a wearable to get notified in advance
                                </p>

                                <div className="inline-block bg-pink-50 px-6 py-3 rounded-2xl mb-6">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-1">Current cycle phase</p>
                                    <p className="text-xl font-bold text-gray-800">{cycleData?.phase || 'Follicular'}</p>
                                </div>

                                <div className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed bg-white/50 p-4 rounded-xl border border-pink-50">
                                    ✨ <strong>Insight:</strong> {cycleData?.insight || 'Energy levels are rising!'}
                                </div>
                            </div>

                            {/* 2. Daily Logs Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    onClick={onLogSymptoms}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all hover:bg-pink-50/50 group duration-300"
                                >
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                        <Edit3 size={24} />
                                    </div>
                                    <p className="font-bold text-gray-700">Log today's symptoms</p>
                                </div>

                                <div
                                    onClick={onLogMood}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all hover:bg-pink-50/50 group duration-300"
                                >
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                                        <Smile size={24} />
                                    </div>
                                    <p className="font-bold text-gray-700">Log today's mood</p>
                                </div>
                            </div>

                            {/* 3. Sensor Data Section */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-800 pl-1">Your sensor data</h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { icon: Thermometer, color: 'text-orange-400', val: '36.5°C', label: 'Basal body temperature' },
                                        { icon: Heart, color: 'text-rose-500', val: '72 bpm', label: 'Heart rate' },
                                        { icon: Activity, color: 'text-teal-500', val: '2.5 µS', label: 'Skin conductivity' },
                                        { icon: Moon, color: 'text-indigo-400', val: '8h 12m', label: 'Sleep pattern' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                            <item.icon className={`${item.color} mb-1`} size={28} />
                                            <span className="text-lg font-bold text-gray-800">{item.val}</span>
                                            <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Customised Period Kit Section */}
                            <div
                                onClick={handleGenerateKit}
                                className="mt-8 w-full bg-[#FFF5F7] rounded-3xl overflow-hidden border border-[#FF6F91] cursor-pointer transition-all duration-500 group relative hover:shadow-xl transform hover:-translate-y-2"
                            >
                                <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                                    <div className="w-full md:w-1/2 flex justify-center">
                                        <img
                                            src={kitImage}
                                            alt="Custom Period Kit"
                                            className="w-full max-w-[320px] h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-display font-bold text-[#FF6F91] mb-6 leading-tight">
                                            Get customised period kit suggested by AI delivered based on your needs for this month
                                        </h2>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleGenerateKit(); }}
                                            className="px-8 py-4 bg-[#FF6F91] text-white font-bold rounded-2xl shadow-lg hover:bg-[#FF5C82] transition-all transform hover:scale-105 active:scale-95"
                                        >
                                            Generate Kit Suggestion
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <ChatBot />
                        </div>
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
        </div>
    );
};
