import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeHeader } from '../components/HomeHeader';
import { HomeFooter } from '../components/HomeFooter';
import { PROPERTIES } from '../constants';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const featuredListings = PROPERTIES.slice(0, 3);

    // Search States
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (checkIn) params.append('checkIn', checkIn);
        if (checkOut) params.append('checkOut', checkOut);
        if (guests > 1) params.append('guests', guests.toString());
        
        navigate(`/listings?${params.toString()}`);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <HomeHeader />
            
            {/* Hero Section */}
            <div className="relative w-full">
                <div className="flex flex-col items-center justify-center min-h-[600px] w-full bg-cover bg-center bg-no-repeat relative px-4" 
                     style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAadkKBNA7rzxlLG5IPn9PnpqF8bdXwnhD6oV46g7MRiIbDipbS_COBxj-VwVntyB6xL5m4crPb0n2UodXbJZ4KRAG56K5ke4uhSMQB-32argOPyanEIJE9rBDJsNTfMa9d3dUha81CkXLo978ZJj_DdEG0e1s6uEWJ_3r8uEv8aU6KMyvFuZplKBcvMkNas0hhQKbF7bFtAi4kkrJEm8QpcZnUHzzBYanZA5oOa5Uyoooa08c1IPecSeZmWfFVvNWRemwxp17lpmE")'}}>
                    <div className="relative z-10 flex flex-col items-center max-w-[960px] w-full gap-8 text-center pt-10">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                                Live Like a Local,<br className="hidden md:block"/> Work Like a Pro
                            </h1>
                            <h2 className="text-gray-100 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                                Curated mid-term rentals in Da Nang designed specifically for digital nomads. Reliable WiFi, ergonomic workspaces, and flexible leases.
                            </h2>
                        </div>
                        
                        {/* Search Box */}
                        <div className="w-full max-w-[850px] bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                                {/* Location Input */}
                                <div className="md:col-span-4 flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#331818] px-3 h-14 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-gray-500">search</span>
                                    <input 
                                        className="w-full bg-transparent border-none focus:ring-0 text-[#181111] dark:text-white placeholder-gray-500 ml-2 truncate" 
                                        placeholder="Neighborhood (e.g. My Khe)"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>

                                {/* Date Range */}
                                <div className="md:col-span-3 flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#331818] px-3 h-14 focus-within:ring-2 focus-within:ring-primary/20 transition-all relative">
                                    <div className="flex flex-col justify-center w-full">
                                        <span className="text-[10px] font-bold uppercase text-gray-500">Check In</span>
                                        <input 
                                            type="date" 
                                            className="bg-transparent border-none p-0 text-sm font-bold text-[#181111] dark:text-white focus:ring-0 w-full"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-3 flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#331818] px-3 h-14 focus-within:ring-2 focus-within:ring-primary/20 transition-all relative">
                                    <div className="flex flex-col justify-center w-full">
                                        <span className="text-[10px] font-bold uppercase text-gray-500">Check Out</span>
                                        <input 
                                            type="date" 
                                            className="bg-transparent border-none p-0 text-sm font-bold text-[#181111] dark:text-white focus:ring-0 w-full"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Guests & Search Button */}
                                <div className="md:col-span-2 flex gap-2">
                                     <div className="flex-1 md:hidden lg:flex flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#331818] px-2 h-14">
                                        <select 
                                            className="bg-transparent border-none text-sm font-bold text-[#181111] dark:text-white focus:ring-0 w-full"
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                        >
                                            <option value={1}>1 Guest</option>
                                            <option value={2}>2 Guests</option>
                                            <option value={3}>3 Guests</option>
                                            <option value={4}>4+ Guests</option>
                                        </select>
                                    </div>
                                    <button onClick={handleSearch} className="h-14 w-full bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center shadow-lg hover:shadow-xl">
                                        <span className="material-symbols-outlined text-[24px]">search</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex gap-2 flex-wrap items-center justify-start md:justify-center border-t border-gray-100 dark:border-gray-700 pt-3">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Quick Filters:</span>
                                <button onClick={() => { setLocation('An Thuong'); handleSearch(); }} className="group flex h-8 items-center gap-2 rounded-full bg-gray-100 dark:bg-[#3a2020] hover:bg-gray-200 dark:hover:bg-[#4a2a2a] px-3 transition-colors border border-transparent hover:border-gray-300">
                                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[18px]">location_on</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">An Thuong</span>
                                </button>
                                <button className="group flex h-8 items-center gap-2 rounded-full bg-gray-100 dark:bg-[#3a2020] hover:bg-gray-200 dark:hover:bg-[#4a2a2a] px-3 transition-colors border border-transparent hover:border-gray-300">
                                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[18px]">calendar_month</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Monthly+</span>
                                </button>
                                <button className="group flex h-8 items-center gap-2 rounded-full bg-gray-100 dark:bg-[#3a2020] hover:bg-gray-200 dark:hover:bg-[#4a2a2a] px-3 transition-colors border border-transparent hover:border-gray-300">
                                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[18px]">wifi</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Verified Wifi</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 md:py-24 px-6 md:px-20 bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="flex-1 flex flex-col gap-8">
                            <div>
                                <span className="text-primary font-bold tracking-wider text-sm uppercase">Cost Advantage</span>
                                <h2 className="text-3xl md:text-5xl font-black text-[#181111] dark:text-white mt-2 mb-4 leading-tight">
                                    Stop Overpaying on Airbnb
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Don't pay daily tourist rates for your monthly life. We negotiate mid-term contracts directly with owners to save you 30-40% on average compared to platforms like Airbnb or Booking.com.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-[#3a2020] shadow-sm">
                                    <div className="bg-primary/10 p-3 rounded-lg h-fit text-primary">
                                        <span className="material-symbols-outlined">speed</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg dark:text-white">Verified Speed</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Every listing includes a speed test screenshot. No more zoom lags.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-[#3a2020] shadow-sm">
                                    <div className="bg-primary/10 p-3 rounded-lg h-fit text-primary">
                                        <span className="material-symbols-outlined">chair</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg dark:text-white">Workspace Ready</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Proper desks and ergonomic chairs, not kitchen tables.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Comparison Chart */}
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-[#3a2020]">
                                <h3 className="text-xl font-bold mb-8 text-center dark:text-white">Monthly Cost Comparison (Da Nang)</h3>
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                                        <span>Typical Airbnb</span>
                                        <span>$1,200/mo</span>
                                    </div>
                                    <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative group">
                                        <div className="h-full bg-gray-400 dark:bg-gray-600 w-[100%] flex items-center justify-end px-4 text-white font-medium">
                                            <span className="text-xs opacity-70">Daily Rates Accumulate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm font-bold mb-2 text-[#181111] dark:text-white">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary filled text-[18px]">check_circle</span>
                                            Enspired
                                        </span>
                                        <span className="text-primary text-lg">$750/mo</span>
                                    </div>
                                    <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative shadow-inner">
                                        <div className="h-full bg-primary w-[62%] flex items-center justify-end px-4 text-white font-bold animate-pulse">
                                            Save ~37%
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-center text-gray-400 mt-6">
                                    *Based on average 1-bedroom apartment in My Khe area for a 30-day stay.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Listings */}
            <section className="py-16 px-6 bg-white dark:bg-[#1a0f0f]">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#181111] dark:text-white mb-2">Curated for Nomads</h2>
                            <p className="text-gray-500 dark:text-gray-400">Top rated spaces with dedicated workspaces in Da Nang.</p>
                        </div>
                        <Link to="/listings" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline">
                            View all listings <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredListings.map(item => (
                            <div key={item.id} className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-[#3a2020] bg-white dark:bg-surface-dark shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative h-64 overflow-hidden">
                                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.image} alt={item.title}/>
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-[#181111] dark:text-white flex items-center gap-1">
                                        <span className="material-symbols-outlined text-green-500 text-[16px]">wifi</span> {item.wifi}
                                    </div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full text-white transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-[#181111] dark:text-white line-clamp-1">{item.title}</h3>
                                        <div className="flex items-center gap-1 text-sm font-bold">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-[16px]">star</span>
                                            <span className="dark:text-white">{item.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{item.desc}</p>
                                    <div className="flex gap-3 mb-6">
                                        {item.amenities.map(am => (
                                            <span key={am} className="px-2 py-1 bg-gray-100 dark:bg-[#331818] rounded text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">check</span> {am}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-[#3a2020] pt-4">
                                        <div>
                                            <span className="text-xl font-bold text-primary">${item.price}</span>
                                            <span className="text-sm text-gray-400">/ month</span>
                                        </div>
                                        <Link to={`/property/${item.id}`} className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm rounded-lg transition-colors">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/listings" className="block w-full py-3 bg-white border border-gray-200 rounded-lg text-primary font-bold shadow-sm">View all listings</Link>
                    </div>
                </div>
            </section>
            <HomeFooter />
        </div>
    );
};
