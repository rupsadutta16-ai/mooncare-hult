import React from 'react';
import { Card } from './ui/Card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const SuccessScreen = ({ onContinue }) => (
    <Card className="text-center py-12">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <Check className="w-12 h-12 text-green-500" strokeWidth={4} />
        </motion.div>
        <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">All Done!</h2>
        <p className="text-lg text-slate-500 font-body mb-8">Thank you for sharing your details. <br /> We're ready to help you track your health.</p>

        <button
            onClick={onContinue}
            className="px-8 py-3 bg-[#FF6F91] text-white text-lg font-bold rounded-full shadow-lg hover:bg-[#FF5C82] hover:scale-105 transition-all"
        >
            Go to Dashboard
        </button>
    </Card>
);
