import React from 'react';
import { Moon } from 'lucide-react';
import logo from '../assets/logo.png';

export const Navbar = ({ isLoggedIn, onLogin, onSignup, onLogout }) => {
    return (
        <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-pink-100">
            <div className="flex items-center gap-2">
                <img src={logo} alt="MoonCare" className="h-14 w-auto object-contain" />
            </div>

            <div className="flex gap-4">
                {isLoggedIn ? (
                    <button
                        onClick={onLogout}
                        className="px-6 py-2 rounded-full border-2 border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-all"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={onLogin}
                            className="px-6 py-2 rounded-full border-2 border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-all hidden sm:block"
                        >
                            Login
                        </button>
                        <button
                            onClick={onSignup}
                            className="px-6 py-2 rounded-full bg-[#FF6F91] text-white font-bold hover:bg-[#FF5C82] shadow-md transition-all hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};
