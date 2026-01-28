import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export const AnimatedIntro = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // 3 seconds per requirements

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#FDFBF7] to-[#FFE4E9] z-50"
        >
            <motion.img
                src={logo}
                alt="MoonCare Logo"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-80 h-auto object-contain mb-6"
            />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center "
            >
                <p className="text-xl text-pink-500 font-body font-semibold">Gentle care for your menstrual health</p>
            </motion.div>
        </motion.div>
    );
};
