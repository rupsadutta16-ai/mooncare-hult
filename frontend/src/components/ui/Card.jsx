import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={twMerge(
                'bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8 w-full max-w-lg mx-auto',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
