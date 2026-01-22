import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModal } from './AuthModal';
import { MobileMenu } from './MobileMenu';

export const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Dropdown states
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(`/listings?location=${encodeURIComponent(searchTerm)}`);
        }
    };

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-[#181111] border-b border-[#f5f0f0] dark:border-[#333]">
                <div className="px-4 md:px-10 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-8 flex-1">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="size-8 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight hidden sm:block text-[#181111] dark:text-white">Enspired</h2>
                        </Link>
                        <div className="hidden md:flex w-full max-w-md items-center rounded-lg bg-[#f5f0f0] dark:bg-[#2a2a2a] px-3 h-10 transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
                            <span className="material-symbols-outlined text-[#8a6060]">search</span>
                            <input 
                                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder-[#8a6060] text-[#181111] dark:text-white" 
                                placeholder="Search location, e.g. My An, Da Nang"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 items-center relative">
                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => toggleDropdown('profile')}
                                className="hidden sm:flex h-10 px-4 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-red-700 transition"
                            >
                                User Profile
                            </button>
                            {activeDropdown === 'profile' && (
                                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#181111] rounded-xl shadow-xl border border-gray-100 dark:border-[#333] overflow-hidden animate-[fadeIn_0.1s_ease-out]">
                                    <div className="py-2 border-b border-gray-100 dark:border-[#333]">
                                        <div className="px-4 py-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase">Signed in as</p>
                                            <p className="text-sm font-bold text-[#181111] dark:text-white truncate">nomad@enspired.com</p>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                        <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">My Trips</button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">Saved Listings</button>
                                        <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">Account Settings</button>
                                    </div>
                                    <div className="py-1 border-t border-gray-100 dark:border-[#333]">
                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/10">Log Out</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Language Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => toggleDropdown('lang')}
                                className="flex size-10 items-center justify-center rounded-lg bg-[#f5f0f0] dark:bg-[#2a2a2a] text-[#181111] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                <span className="material-symbols-outlined">language</span>
                            </button>
                            {activeDropdown === 'lang' && (
                                <div className="absolute right-0 top-12 w-40 bg-white dark:bg-[#181111] rounded-xl shadow-xl border border-gray-100 dark:border-[#333] overflow-hidden z-50">
                                    <button className="w-full text-left px-4 py-2 text-sm font-bold bg-gray-50 dark:bg-[#222] text-primary flex justify-between">
                                        English (US) <span className="material-symbols-outlined text-sm">check</span>
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">Vietnamese</button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">Korean</button>
                                </div>
                            )}
                        </div>

                        {/* Currency Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => toggleDropdown('currency')}
                                className="flex size-10 items-center justify-center rounded-lg bg-[#f5f0f0] dark:bg-[#2a2a2a] text-[#181111] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                <span className="material-symbols-outlined">currency_exchange</span>
                            </button>
                            {activeDropdown === 'currency' && (
                                <div className="absolute right-0 top-12 w-32 bg-white dark:bg-[#181111] rounded-xl shadow-xl border border-gray-100 dark:border-[#333] overflow-hidden z-50">
                                    <button className="w-full text-left px-4 py-2 text-sm font-bold bg-gray-50 dark:bg-[#222] text-primary flex justify-between">
                                        USD ($) <span className="material-symbols-outlined text-sm">check</span>
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">VND (₫)</button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-[#181111] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#222]">EUR (€)</button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden ml-2 text-[#181111] dark:text-white hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLoginClick={() => setIsLoginModalOpen(true)} />
            
            {/* Click backdrop to close dropdowns */}
            {activeDropdown && (
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setActiveDropdown(null)}></div>
            )}
        </>
    );
};
