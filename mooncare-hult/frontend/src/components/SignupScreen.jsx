import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const SignupScreen = ({ onSignupSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email.');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            onSignupSuccess();
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FDFBF7]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md border border-pink-100"
            >
                <h2 className="text-3xl font-display font-bold text-gray-800 mb-6 text-center">Create Account</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-600 font-medium mb-1 ml-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                            placeholder="hello@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1 ml-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-pink-100 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full bg-[#FF6F91] hover:bg-[#FF5C82] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-95"
                    >
                        Sign Up
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
