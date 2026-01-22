import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Admin Route */}
                <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
