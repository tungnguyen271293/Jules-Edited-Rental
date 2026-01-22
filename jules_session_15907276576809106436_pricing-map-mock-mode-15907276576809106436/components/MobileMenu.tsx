import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onLoginClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[55] md:hidden">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
             <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-[#181111] shadow-2xl p-6 flex flex-col gap-6 animate-[slideIn_0.3s_ease-out]">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#333] pb-4">
                    <span className="text-xl font-bold text-[#181111] dark:text-white">Menu</span>
                    <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#333] transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav className="flex flex-col gap-2">
                    <Link to="/" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#181111] dark:text-gray-200 font-medium transition-colors">
                        <span className="material-symbols-outlined text-gray-400">home</span> Home
                    </Link>
                    <Link to="/listings" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#181111] dark:text-gray-200 font-medium transition-colors">
                        <span className="material-symbols-outlined text-gray-400">apartment</span> Listings
                    </Link>
                    <Link to="/about" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#181111] dark:text-gray-200 font-medium transition-colors">
                        <span className="material-symbols-outlined text-gray-400">map</span> About Da Nang
                    </Link>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#222] text-[#181111] dark:text-gray-200 font-medium transition-colors">
                        <span className="material-symbols-outlined text-gray-400">key</span> For Owners
                    </a>
                </nav>
                <div className="mt-auto pt-6 flex flex-col gap-3">
                    <button onClick={() => { onClose(); onLoginClick(); }} className="w-full py-3 rounded-lg border border-gray-200 dark:border-[#333] text-[#181111] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-[#222] transition-colors">
                        Log In
                    </button>
                    <button className="w-full py-3 rounded-lg bg-primary hover:bg-red-700 text-white font-bold transition-colors">
                        Sign Up
                    </button>
                </div>
             </div>
        </div>
    );
};
