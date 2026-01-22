import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthModal } from './AuthModal';
import { MobileMenu } from './MobileMenu';

export const HomeHeader: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-surface-light/95 backdrop-blur-sm border-b border-[#f5f0f0] dark:bg-surface-dark/95 dark:border-[#3a2020]">
                <div className="flex items-center justify-between px-6 py-4 max-w-[1280px] mx-auto">
                    <div className="flex items-center gap-3">
                        <Link to="/">
                            <div className="flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined filled text-3xl">home_work</span>
                            </div>
                        </Link>
                        <Link to="/">
                            <h2 className="text-[#181111] dark:text-white text-xl font-extrabold tracking-tight">Enspired</h2>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="text-[#181111] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors" to="/listings">Listings</Link>
                        <Link className="text-[#181111] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors" to="/about">About Da Nang</Link>
                        <Link className="text-[#181111] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors" to="#">For Owners</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsLoginModalOpen(true)} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-red-700 transition-colors text-white text-sm font-bold shadow-sm">
                            <span>Sign In</span>
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-[#181111] dark:text-white hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            <AuthModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLoginClick={() => setIsLoginModalOpen(true)} />
        </>
    );
};
