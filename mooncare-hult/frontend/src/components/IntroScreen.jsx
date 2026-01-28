import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Moon } from 'lucide-react';

export const IntroScreen = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-purple-50 to-pink-50"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center shadow-sm mb-4">
                    <Moon size={48} className="text-[#FF6F91]" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                    Welcome to MoonCare 🌙
                </h1>
                <p className="text-xl text-slate-600 max-w-sm mx-auto">
                    Let’s understand your menstrual health better.
                </p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#FF6F91] rounded-full shadow-lg hover:shadow-xl hover:bg-[#FF5C82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F91]"
                onClick={onStart}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
        </motion.div>
    );
};
