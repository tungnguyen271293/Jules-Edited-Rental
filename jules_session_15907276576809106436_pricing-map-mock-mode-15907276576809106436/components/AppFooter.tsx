import React from 'react';

export const AppFooter: React.FC = () => (
    <footer className="bg-white dark:bg-[#181111] border-t border-[#f5f0f0] dark:border-[#333] py-10 mt-10">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-[#181111] dark:text-white">
                <div className="size-6 text-primary">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                    </svg>
                </div>
                <span className="font-bold text-lg">Enspired</span>
            </div>
            <p className="text-[#8a6060] text-sm">© 2024 Enspired. Made for Nomads in Da Nang.</p>
        </div>
    </footer>
);