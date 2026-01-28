import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hi there! I'm your MoonCare assistant. I can give you personal guidance based on your symptoms. How are you feeling today?"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const quickQuestions = [
        {
            text: "I have cramps, what helps?",
            answer: "For cramps, applying heat (like a hot water bottle) to your lower abdomen can help relax the muscles. Gentle yoga or a warm bath are also soothing. If it's severe, consult a doctor."
        },
        {
            text: "Why do I feel so tired?",
            answer: "Fatigue is common during your period due to changing hormone levels. Try to prioritize sleep, stay hydrated, and eat iron-rich foods like spinach or lentils."
        },
        {
            text: "Is mood swing normal?",
            answer: "Yes, absolutely! Hormonal fluctuations during your cycle can impact neurotransmitters like serotonin. Be gentle with yourself and track your moods to see patterns."
        }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                text: "I'm sorry, I can't help you with this specific query right now. I'm still learning! Please try one of the topic buttons or consult a medical professional."
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuickQuestion = (question) => {
        const newUserMsg = { id: Date.now(), type: 'user', text: question.text };
        setMessages(prev => [...prev, newUserMsg]);
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                text: question.answer
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-10 right-12 z-50 flex flex-col items-end gap-4 pointer-events-none">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white w-100 sm:w-96 rounded-3xl shadow-2xl border border-pink-100 overflow-hidden pointer-events-auto flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-[#FF6F91] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">MoonCare Assistant</h3>
                                    <p className="text-xs opacity-90">Personalized Health Guide</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 bg-[#FDFBF7] space-y-4 min-h-[300px] scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <style>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                            ? 'bg-[#FF6F91] text-white rounded-br-none'
                                            : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        <div className="p-2 border-t border-pink-50 bg-white overflow-x-auto flex gap-2 no-scrollbar">
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickQuestion(q)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-pink-50 text-[#FF6F91] text-xs font-semibold rounded-full hover:bg-pink-100 transition"
                                >
                                    {q.text}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#FF6F91]/20 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 bg-[#FF6F91] text-white rounded-full hover:bg-[#FF5C82] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-[#FF6F91] rounded-full shadow-[0_8px_30px_rgb(255,111,145,0.4)] flex items-center justify-center text-white pointer-events-auto hover:bg-[#FF5C82] transition-colors"
            >
                {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
            </motion.button>
        </div>
    );
};
