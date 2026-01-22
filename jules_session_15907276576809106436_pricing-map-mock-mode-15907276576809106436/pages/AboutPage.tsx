import React from 'react';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            <AppHeader />
            
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1559592413-7cec430aa669?q=80&w=2070&auto=format&fit=crop" 
                        alt="Dragon Bridge Da Nang" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl">
                            The Digital Nomad Capital
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl font-medium drop-shadow-md">
                            Why thousands of remote workers are trading Bali and Chiang Mai for Da Nang.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16 max-w-5xl">
                    {/* Intro */}
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Lifestyle</span>
                        <h2 className="text-3xl font-bold text-[#181111] dark:text-white mb-6">Work hard, Beach harder.</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Da Nang strikes the perfect balance for digital nomads. It offers the modern infrastructure of a major city—fiber optic internet, co-working spaces, and international airport—combined with a laid-back beach town vibe. Unlike the chaos of Ho Chi Minh City or the tourist crowds of Hoi An, Da Nang is livable, breathable, and affordable.
                        </p>
                    </div>

                    {/* Neighborhoods Grid */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-bold text-[#181111] dark:text-white mb-8">Know Your Neighborhoods</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* An Thuong */}
                            <div className="bg-white dark:bg-[#181111] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#333] group hover:-translate-y-1 transition-transform duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1667849357659-19965d836471?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="An Thuong" />
                                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">Expats & Tourism</div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg text-[#181111] dark:text-white mb-2">My An / An Thuong</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        The main "foreigner quarter". Walkable streets packed with cafes, burger joints, bars, and 24/7 marts. Just 5 minutes to My Khe Beach.
                                    </p>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Walkable</li>
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Nightlife</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Son Tra */}
                            <div className="bg-white dark:bg-[#181111] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#333] group hover:-translate-y-1 transition-transform duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1590252877526-2580556f082e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Son Tra" />
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Quiet & Local</div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg text-[#181111] dark:text-white mb-2">Son Tra / Nai Hien Dong</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        Located near the mountain and harbor. Much quieter, more local seafood restaurants, and incredible views of the city skyline.
                                    </p>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Cheaper Rent</li>
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Nature Access</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Hai Chau */}
                            <div className="bg-white dark:bg-[#181111] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#333] group hover:-translate-y-1 transition-transform duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1565618491593-9c5932df4677?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Hai Chau" />
                                    <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">City Center</div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg text-[#181111] dark:text-white mb-2">Hai Chau</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        The "city side" across the river. Here you find the government buildings, major banks, local markets (Han Market), and busy street life.
                                    </p>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Authentic Food</li>
                                        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Busy Vibe</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#333] rounded-2xl p-8 mb-20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-black text-primary">300+</span>
                                <span className="text-sm font-bold text-gray-500 uppercase">Cafes with Wifi</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-black text-primary">$450</span>
                                <span className="text-sm font-bold text-gray-500 uppercase">Avg Studio Rent</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-black text-primary">85</span>
                                <span className="text-sm font-bold text-gray-500 uppercase">Avg Mbps Speed</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-black text-primary">24/7</span>
                                <span className="text-sm font-bold text-gray-500 uppercase">Convenience</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#181111] dark:text-white mb-6">Ready to make the move?</h2>
                        <Link 
                            to="/listings"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/30 transition-all hover:scale-105"
                        >
                            Browse Verified Listings
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};
