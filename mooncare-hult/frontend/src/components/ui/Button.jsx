import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, onClick, className, variant = 'primary', ...props }) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform active:scale-95 touch-manipulation select-none";

    const variants = {
        primary: "bg-[#FF6F91] text-white hover:bg-[#FF5C82] focus:ring-[#FF6F91]",
        secondary: "bg-white text-[#FF6F91] border-2 border-[#FFD6E0] hover:bg-[#FFF0F4] focus:ring-[#FFD6E0]",
        outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:bg-slate-50",
        ghost: "bg-transparent text-[#FF6F91] hover:bg-[#FFF0F4]",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className={twMerge(baseStyles, variants[variant], className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};
