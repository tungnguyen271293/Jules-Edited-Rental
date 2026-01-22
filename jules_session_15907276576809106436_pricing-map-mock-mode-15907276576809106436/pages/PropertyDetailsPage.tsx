import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { RealMapLink } from '../components/RealMapLink';
import { PROPERTIES } from '../constants';

export const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams();
    const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[3]; 
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBookingSuccess(true);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#181111] dark:text-[#f5f0f0] min-h-screen flex flex-col overflow-x-hidden">
            <AppHeader />

            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 lg:px-10 pb-20">
                {/* Breadcrumbs */}
                <div className="py-4">
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                        <a className="text-[#8a6060] font-medium hover:text-primary hover:underline" href="#">Da Nang</a>
                        <span className="text-[#8a6060] font-medium">/</span>
                        <Link className="text-[#8a6060] font-medium hover:text-primary hover:underline" to="/listings">Listings</Link>
                        <span className="text-[#8a6060] font-medium">/</span>
                        <span className="text-[#181111] dark:text-white font-medium">{property.title}</span>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="relative w-full h-[300px] md:h-[480px] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 mb-8 group">
                    {/* Main Image */}
                    <div className="md:col-span-2 md:row-span-2 relative h-full">
                        <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700" style={{backgroundImage: `url('${property.image}')`}}>
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-white transition-colors">
                                <span className="material-symbols-outlined filled text-primary">play_circle</span>
                                Watch Video Tour
                            </button>
                        </div>
                    </div>
                    {/* Side Images */}
                    <div className="hidden md:block bg-cover bg-center hover:brightness-90 transition-all cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQTpgMi_7Z30qbI34DZLFJxgs9h_hP_LELUMN9hcRCfpDfWpcJZe5oFCF1w42NqMbfQqrJGeuvW7V2um31yBBXK03NAvpgGvisj8E_9xhU102f4tnSbHgg1SDoy867BLZX-2hpxYVjlyh5hQGHUVeJht3GeuTyePpV-QPG0N2QN-Z9DyiZUOwpnm73tYA2s5iHMBRwPjYHBVoO3jV2jHEvPm1ivrHFWV80nkR7VVh0so8PbkhieMyjrWtnLqUnmG_j11jKPqi1PHg')"}}></div>
                    <div className="hidden md:block bg-cover bg-center hover:brightness-90 transition-all cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwV8NHWCwyTnRG5HZb4Fk7N0JubAx0ZQGOk6QtBUzRAP161oQdqQvRIla-ff7BVuD7ToCpNyITCSaQwKsSn0pz5yPJAW5rNue_RFhN3TzSJA06qQfUWH3YmIiSmGjVxziyd2ZezRmeaXvqlOZ9-_m1RfGd85sOQyxUQUAf55cBZW9zY0oWMpzHxz6G5xs9RCXrrMOzBmJBgAAlnb1E_f6xIMVRk9-C88vZ7JhbZGSKyPE-mnR3erfHsL-Ny3iGRghTaD3D-35o2mw')"}}></div>
                    <div className="hidden md:block bg-cover bg-center hover:brightness-90 transition-all cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzHMoo0FQONO5dThVTDohTpYnnzkgLLodkvOPMaJ7TMwzYyX7UXBrwDWzg4vvoepDMszt55pXKsuVuGQUW3YUiH81ECc2MdEEiAciTZ2HZLeWagN1W1PvLMMhZ2nInuVEwPnQB4kZ4Jo6l8i6KoJSnSvlJCcVVa7shh6jH07jP3O11KV4qTThhcfLsjtgxxqBFbBfQETr6hGM-ebBIH9OLoRunAjWMOpJlKa-05YKvTwXp0nBPEpfY8JgCf2uOtryREnXCH8HZUFE')"}}></div>
                    <div className="hidden md:block relative bg-cover bg-center hover:brightness-90 transition-all cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtdX-uQimCKRQhd-5issJTeCo5Yj-G4zDbG8BkMIym8UgiuM_6jQHSyMR6Noi3sWoh4AcxBB4JSvDhyeR5Ss3zJsVYKGieXQu3IOAom6cZxNIBdI6Oxs06pFHQr_3QWKwsdwOflH9IZpIo7YnKvzwzXsiGR8321X-b0BnDXeyOnFhXpd_70LD7GHkSibBqEAvZp60p1KXPbf_f8nJsEK9YKZlPSer_ANU3WREo-lEzKQL8BWyY7b5PyMQ6knpJRrs1AVx37SldW9Q')"}}>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <span className="text-white font-bold text-lg">+12 photos</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-[#181111] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight mb-2">{property.title} - Dedicated Workspace</h1>
                                    <div className="flex items-center gap-2 text-[#8a6060] text-sm md:text-base">
                                        <span className="material-symbols-outlined text-base">location_on</span>
                                        <span className="font-medium">{property.location}</span>
                                        <span className="mx-1">•</span>
                                        <span className="flex items-center gap-1 text-[#181111] dark:text-white font-bold">
                                            <span className="material-symbols-outlined filled text-primary text-sm">star</span> {property.rating}
                                        </span>
                                        <span className="underline cursor-pointer">(24 reviews)</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col items-end">
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 border border-primary/20">
                                        <span className="material-symbols-outlined text-sm filled">verified</span>
                                        Verified by Enspired
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Nomad Score */}
                        <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#181111] dark:text-white flex items-center gap-2">
                                    Nomad Score 
                                    <span className="text-primary text-2xl">9.2</span>
                                    <span className="text-gray-400 text-sm font-normal">/ 10</span>
                                </h3>
                                <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded font-bold">Speed Verified 2 days ago</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
                                        <span className="material-symbols-outlined">wifi</span> Internet Speed
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">Download</span>
                                            <span className="font-bold text-[#181111] dark:text-white">{property.wifi}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">Upload</span>
                                            <span className="font-bold text-[#181111] dark:text-white">90 Mbps</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-8">
                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
                                        <span className="material-symbols-outlined">desk</span> Workspace Setup
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-[#181111] dark:text-white">
                                            <span className="material-symbols-outlined text-primary">chair_alt</span>
                                            Herman Miller Aeron Chair
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-[#181111] dark:text-white">
                                            <span className="material-symbols-outlined text-primary">monitor</span>
                                            27" 4K Monitor (USB-C)
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-[#181111] dark:text-white">
                                            <span className="material-symbols-outlined text-primary">table_restaurant</span>
                                            Standing Desk (Electric)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="text-[#181111] dark:text-gray-300 leading-relaxed text-lg">
                            <p className="mb-4">
                                Experience the ultimate productivity haven in the heart of {property.location}. This {property.type} is designed specifically for remote workers who need reliable infrastructure without sacrificing comfort. Just {property.distance || '10 mins'} from the beach and surrounded by the best coffee shops in Da Nang.
                            </p>
                            <p>
                                The space features distinct zones for working and relaxing, blackout curtains for uninterrupted sleep, and a fully equipped kitchenette for your morning brew.
                            </p>
                        </div>
                        {/* Location */}
                        <div>
                            <h3 className="text-xl font-bold text-[#181111] dark:text-white mb-6">Location</h3>
                            <div className="bg-white dark:bg-[#181111] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-bold text-lg dark:text-white">{property.location}</h4>
                                        <p className="text-gray-500 text-sm">Da Nang, Vietnam</p>
                                    </div>
                                    <RealMapLink 
                                        query={`${property.location}, Da Nang`} 
                                        className="bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#333] text-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                                        label="Open in Google Maps"
                                    />
                                </div>
                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
                                     <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/108.24,16.05,14,0/800x400?access_token=YOUR_TOKEN')"}}></div>
                                     <RealMapLink 
                                        query={`${property.location}, Da Nang`} 
                                        className="relative z-10 bg-white dark:bg-[#181111] text-[#181111] dark:text-white px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                                        label="View Exact Location"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-xl font-bold text-[#181111] dark:text-white mb-6">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">ac_unit</span> Air Conditioning
                                </div>
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">local_laundry_service</span> Washer/Dryer
                                </div>
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">kitchen</span> Equipped Kitchen
                                </div>
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">door_front</span> Private Entrance
                                </div>
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">local_parking</span> Motorbike Parking
                                </div>
                                <div className="flex items-center gap-3 text-[#181111] dark:text-gray-300">
                                    <span className="material-symbols-outlined text-gray-400">cleaning_services</span> Weekly Cleaning
                                </div>
                            </div>
                        </div>
                        {/* Price Transparency */}
                        <div className="bg-gradient-to-br from-[#f8f5f5] to-white dark:from-[#2a2a2a] dark:to-[#221010] border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-[#181111] dark:text-white">Price Transparency</h3>
                                    <p className="text-sm text-gray-500 mt-1">Direct booking vs. Standard OTA rates</p>
                                </div>
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm filled">savings</span>
                                    Save $250 / month
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-[#332222] text-xs uppercase text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3">Platform</th>
                                            <th className="px-6 py-3">Monthly Rate</th>
                                            <th className="px-6 py-3">Service Fees</th>
                                            <th className="px-6 py-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        <tr className="bg-white dark:bg-[#2d1b1b]">
                                            <td className="px-6 py-4 font-medium text-gray-400">Airbnb / OTA</td>
                                            <td className="px-6 py-4 text-gray-400">${Math.round(property.price * 1.3)}</td>
                                            <td className="px-6 py-4 text-gray-400">$50</td>
                                            <td className="px-6 py-4 text-right font-medium text-gray-400 decoration-slice line-through">${Math.round(property.price * 1.3) + 50}</td>
                                        </tr>
                                        <tr className="bg-red-50/50 dark:bg-primary/5">
                                            <td className="px-6 py-4 font-bold text-primary flex items-center gap-2">
                                                Enspired <span className="material-symbols-outlined text-sm filled">check_circle</span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-[#181111] dark:text-white">${property.price}</td>
                                            <td className="px-6 py-4 text-green-600 font-bold">$0</td>
                                            <td className="px-6 py-4 text-right font-bold text-xl text-[#181111] dark:text-white">${property.price}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Booking Widget */}
                            <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <span className="text-2xl font-bold text-[#181111] dark:text-white">${property.price}</span>
                                        <span className="text-gray-500 text-sm"> / month</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <span className="material-symbols-outlined text-sm">calendar_month</span> Min 1 month
                                    </div>
                                </div>
                                <form className="space-y-4" onSubmit={handleBooking}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Move-in Date</label>
                                            <div className="relative">
                                                <input required className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary" type="date"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Duration</label>
                                            <select className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary">
                                                <option>1 Month</option>
                                                <option>2 Months</option>
                                                <option>3 Months</option>
                                                <option>6+ Months</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Guests</label>
                                            <select className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary">
                                                <option>1 Guest</option>
                                                <option>2 Guests</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-md shadow-red-500/20" type="submit">
                                        Request to Book
                                    </button>
                                    <p className="text-center text-xs text-gray-400">You won't be charged yet</p>
                                </form>
                            </div>
                            {/* Quick Inquiry */}
                            <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                                <h4 className="font-bold text-[#181111] dark:text-white mb-4">Quick Inquiry</h4>
                                <div className="flex flex-col gap-3">
                                    <button className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075e54] dark:text-[#25D366] font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#25D366]/20">
                                        <img alt="WhatsApp" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC84_G-iYs24AtRhoS_2-fwBFP41dOqiPNGgaH9x2JwWF4mzAH4HqaDbGnKs5TQMe3HW526jOQ1z4RXDuQLbIowvTGLFmccV3lTnyPsBoT6l-B64GayyeRmjeSXdF0LbZQPLBRJ7Ig8EKTvVhMMm4nI6zwTL1wBwpHBhIpsTr7NiaaypXiX2J-51fQPuMBdmo78r70QAr1HJ6mHZwxiB9OgcL5aogxG4tLYySWapW6Kd2kHfleyjEZjbMsLQdSJfXES6YjOwoQjLgQ"/>
                                        Chat on WhatsApp
                                    </button>
                                    <button className="w-full bg-[#0068FF]/10 hover:bg-[#0068FF]/20 text-[#0068FF] font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#0068FF]/20">
                                        <span className="bg-[#0068FF] text-white text-xs font-bold rounded px-1">Zalo</span>
                                        Chat on Zalo
                                    </button>
                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">or email us</span>
                                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <input className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:ring-primary focus:border-primary placeholder:text-gray-400" placeholder="Your Name" type="text"/>
                                        <input className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:ring-primary focus:border-primary placeholder:text-gray-400" placeholder="Your Email" type="email"/>
                                        <textarea className="w-full bg-[#f8f5f5] dark:bg-[#221010] border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:ring-primary focus:border-primary placeholder:text-gray-400 resize-none" placeholder="Message..." rows={3}></textarea>
                                        <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <AppFooter />
            
            {/* Booking Success Modal */}
            {isBookingSuccess && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsBookingSuccess(false)}></div>
                    <div className="relative bg-white dark:bg-[#181111] rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-[fadeIn_0.3s_ease-out]">
                        <div className="size-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl filled">check_circle</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#181111] dark:text-white mb-2">Request Sent!</h3>
                        <p className="text-gray-500 mb-8">
                            We've sent your request to the owner. You'll receive a confirmation email shortly.
                        </p>
                        <button onClick={() => setIsBookingSuccess(false)} className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
                            Awesome
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};