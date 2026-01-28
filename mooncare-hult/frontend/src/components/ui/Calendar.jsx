import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Calendar = ({ selectedDate, onDateSelect, maxDate = new Date() }) => {
    // Parse selectedDate (YYYY-MM-DD) to Date object, or default to maxDate/today
    const [currentMonth, setCurrentMonth] = useState(() => {
        return selectedDate ? new Date(selectedDate) : new Date();
    });

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    // Generate days array
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null); // Empty slots for previous month
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        // Optional: Prevent navigating way into the future if desired, but user asked for date selection validation mostly
        setCurrentMonth(nextMonth);
    };

    const handleDateClick = (day) => {
        if (!day) return;
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        // Adjust for timezone offset to format YYYY-MM-DD correctly in local time
        const offset = newDate.getTimezoneOffset();
        const localDate = new Date(newDate.getTime() - (offset * 60 * 1000));
        const formattedDate = localDate.toISOString().split('T')[0];

        onDateSelect(formattedDate);
    };

    const isFutureDate = (day) => {
        if (!day) return false;
        const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        // Compare dates without time
        const today = new Date(maxDate);
        today.setHours(23, 59, 59, 999); // Allow the current max day fully
        return checkDate > today;
    };

    const isSelected = (day) => {
        if (!day || !selectedDate) return false;
        const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        // Similar naive formatting to match YYYY-MM-DD string
        const offset = checkDate.getTimezoneOffset();
        const localDate = new Date(checkDate.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0] === selectedDate;
    };

    return (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-pink-100 w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-pink-50 rounded-full text-gray-600 transition">
                    <ChevronLeft size={20} />
                </button>
                <h3 className="font-bold text-gray-800">
                    {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-pink-50 rounded-full text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    // Optional: Disable next month button if it's completely in future
                    disabled={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) > maxDate}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-semibold text-gray-400 py-1">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, idx) => {
                    const isDisabled = isFutureDate(day);
                    const selected = isSelected(day);

                    if (!day) return <div key={idx}></div>;

                    return (
                        <motion.button
                            key={idx}
                            whileTap={!isDisabled ? { scale: 0.9 } : {}}
                            onClick={() => !isDisabled && handleDateClick(day)}
                            className={`
                                h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors relative
                                ${selected ? 'bg-[#FF6F91] text-white shadow-md' : 'text-gray-700 hover:bg-pink-50'}
                                ${isDisabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : ''}
                            `}
                        >
                            {day}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
