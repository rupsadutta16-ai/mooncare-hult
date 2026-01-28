import React, { useState, useMemo } from 'react';
import { Package, Trash2, Plus, Minus, ArrowLeft, Cherry, Coffee, Sparkles, Droplets, Pill, ShoppingBag, ClipboardList, Zap, PlusCircle } from 'lucide-react';

const ALL_POTENTIAL_ITEMS = [
    { id: 1, name: 'Heavy Flow Pad', description: 'Maximum protection for heavy flow days.', price: 14, defaultQty: 4, icon: <Droplets className="text-pink-500" /> },
    { id: 2, name: 'Medium Flow Pad', description: 'Balanced comfort and absorption.', price: 10, defaultQty: 6, icon: <Droplets className="text-pink-400" /> },
    { id: 3, name: 'Low Flow Pad', description: 'Ultra-thin for light days and spotting.', price: 8, defaultQty: 4, icon: <Droplets className="text-pink-300" /> },
    { id: 4, name: '2 Herbal Tea Sachets', description: 'Soothing blend to reduce bloating.', price: 40, defaultQty: 1, icon: <Coffee className="text-amber-600" /> },
    { id: 5, name: 'Cramp Relief Patches', description: 'Fast-acting long-lasting relief.', price: 55, defaultQty: 2, icon: <Zap className="text-teal-500" /> },
    { id: 6, name: 'Dark Chocolate', description: 'Rich 70% cocoa for mood enhancement.', price: 70, defaultQty: 1, icon: <Cherry className="text-rose-800" /> },
    { id: 8, name: 'Herbal Supplement Powder', description: 'Natural hormone balance support.', price: 65, defaultQty: 1, icon: <Pill className="text-emerald-500" /> },
    { id: 7, name: 'V-Wash', description: 'Gentle pH-balanced intimate cleanser.', price: 56, defaultQty: 1, icon: <Droplets className="text-blue-400" /> },
    { id: 9, name: 'Hygiene Wipes', description: 'Quick refreshing cleanse on the go.', price: 40, defaultQty: 1, icon: <Sparkles className="text-blue-300" /> },
    { id: 10, name: 'Acne Patches', description: 'Hydrocolloid patches for clear skin.', price: 7, defaultQty: 1, icon: <Sparkles className="text-yellow-400" /> },
    { id: 11, name: 'Diet Chart', description: 'Personalized nutrition for your cycle.', price: 15, defaultQty: 1, isLocked: true, icon: <ClipboardList className="text-indigo-500" /> },
];

export const KitRecommendation = ({ onBack, userData }) => {
    // Initial State Setup
    const [items, setItems] = useState(() => {
        const hasSevereCramps = userData?.symptoms?.includes('cramps');
        return ALL_POTENTIAL_ITEMS.slice(0, 8).map(item => ({
            ...item,
            quantity: item.id === 5 && hasSevereCramps ? 4 : item.defaultQty
        }));
    });

    const [addons, setAddons] = useState(() => ALL_POTENTIAL_ITEMS.slice(8));
    
    const packagingFee = 80;
    const deliveryFee = 100;

    const updateQuantity = (id, delta) => {
        setItems(prev => prev.map(item => {
            if (item.id === id && !item.isLocked) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const handleRemoveFromKit = (itemToRemove) => {
        setItems(prev => prev.filter(item => item.id !== itemToRemove.id));
        setAddons(prev => [...prev, { ...itemToRemove, quantity: itemToRemove.defaultQty }]);
    };

    const handleAddToKit = (addonToAdd) => {
        setAddons(prev => prev.filter(item => item.id !== addonToAdd.id));
        setItems(prev => [...prev, { ...addonToAdd, quantity: addonToAdd.defaultQty }]);
    };

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
    const grandTotal = subtotal + packagingFee + deliveryFee;

    const AddOnsSection = () => (
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <PlusCircle className="text-[#FF6F91]" size={24} />
                Available Add-Ons
            </h2>
            <div className="space-y-4">
                {addons.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No more add-ons available.</p>
                ) : (
                    addons.map(addon => (
                        <div key={addon.id} className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-pink-200 hover:border-[#FF6F91] transition-colors group">
                            <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#FF6F91] group-hover:text-white transition-colors">
                                {React.cloneElement(addon.icon, { size: 20 })}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-800">{addon.name}</h4>
                                <p className="text-[10px] text-gray-500">₹{addon.price}</p>
                            </div>
                            <button 
                                onClick={() => handleAddToKit(addon)}
                                className="p-2 text-[#FF6F91] hover:bg-pink-50 rounded-full transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-[#FF6F91] transition-colors mb-8 font-medium"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </button>

            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-[#FF6F91] mb-2">Recommended Kit</h1>
                <p className="text-slate-600">Based on your cycle data, we've curated these essentials just for you.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Items List */}
                <div className="flex-1 space-y-4">
                    {items.length === 0 ? (
                        <div className="bg-white p-8 rounded-3xl border border-pink-100 text-center space-y-4">
                            <ShoppingBag size={48} className="mx-auto text-pink-200" />
                            <p className="text-slate-500 font-medium">Your kit is empty. Select some add-ons to get started!</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl border border-pink-50 flex items-center gap-4 transition-all hover:shadow-md hover:border-pink-200 animate-in fade-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center shrink-0">
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                                    <p className="text-[#FF6F91] font-bold">₹{item.price * item.quantity}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    {!item.isLocked ? (
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-full px-3 py-1 border border-slate-100">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="text-gray-400 hover:text-[#FF6F91] transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="text-gray-400 hover:text-[#FF6F91] transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-1 bg-slate-50 rounded-full border border-slate-100 text-xs font-bold text-gray-400 italic">
                                            Fixed Qty: 1
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => handleRemoveFromKit(item)}
                                        className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors group"
                                    >
                                        <Trash2 size={12} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* Add-Ons Section (Mobile Only - appears below all kit content if flex-col) */}
                    <div className="block lg:hidden">
                        <AddOnsSection />
                    </div>
                </div>

                {/* Summary Section */}
                <div className="w-full lg:w-80 h-fit space-y-4 lg:sticky lg:top-8">
                    <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Package className="text-[#FF6F91]" size={24} />
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 text-sm font-medium">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Packaging</span>
                                <span>₹{packagingFee}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 border-b border-dashed border-slate-100 pb-4">
                                <span>Delivery</span>
                                <span>₹{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2">
                                <span>Grand Total</span>
                                <span className="text-[#FF6F91]">₹{grandTotal}</span>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-4 bg-[#FF6F91] text-white font-bold rounded-2xl shadow-lg hover:bg-[#FF5C82] hover:scale-[1.02] transition-all">
                            Checkout Now
                        </button>
                    </div>

                    {/* Add-Ons Section (Desktop Only - appears below summary) */}
                    <div className="hidden lg:block">
                        <AddOnsSection />
                    </div>
                </div>
            </div>
        </div>
    );
};
