import React from 'react';
import { Link } from 'react-router-dom';

export const HomeFooter: React.FC = () => (
    <footer className="bg-gray-50 dark:bg-[#150a0a] border-t border-gray-200 dark:border-[#3a2020] pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <span className="material-symbols-outlined filled">home_work</span>
                        <span className="text-xl font-extrabold tracking-tight text-[#181111] dark:text-white">Enspired</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Helping digital nomads find their perfect home base in Da Nang. Verified speeds, comfy chairs, and local prices.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-[#181111] dark:text-white mb-4">Discover</h4>
                    <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link className="hover:text-primary transition-colors" to="/listings">All Listings</Link></li>
                        <li><a className="hover:text-primary transition-colors" href="#">My Khe Beach</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">An Thuong</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">City Center</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-[#181111] dark:text-white mb-4">Company</h4>
                    <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">For Landlords</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Nomad Guide</a></li>
                        <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-[#181111] dark:text-white mb-4">Stay Updated</h4>
                    <div className="flex flex-col gap-3">
                        <input className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="Enter your email" type="email"/>
                        <button className="w-full py-2 bg-primary hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 dark:border-[#3a2020] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                <p>© 2023 Enspired. All rights reserved.</p>
                <div className="flex gap-6">
                    <a className="hover:text-gray-600 dark:hover:text-gray-300" href="#">Privacy Policy</a>
                    <a className="hover:text-gray-600 dark:hover:text-gray-300" href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);