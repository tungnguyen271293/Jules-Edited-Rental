import React, { useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { PropertyForm } from '../components/admin/PropertyForm';
import { fetchAllPropertiesAdmin, deleteProperty } from '../services/admin';
import { getUser, initGoogleServices } from '../services/supabase';

export const AdminDashboardPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            await initGoogleServices();
            const user = await getUser();
            if (user) {
                // In a real app we might check specific emails, but for this demo 
                // any logged in user with drive access is considered 'Admin' of their own data.
                setIsAdmin(true);
                loadData();
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const loadData = async () => {
        try {
            const data = await fetchAllPropertiesAdmin();
            setProperties(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await deleteProperty(id);
            loadData();
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center dark:text-white">Verifying Google Access...</div>;

    if (!isAdmin) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4 dark:text-white">
                <span className="material-symbols-outlined text-6xl text-red-500">lock</span>
                <h1 className="text-2xl font-bold">Admin Access Required</h1>
                <p>Please sign in via the header button to manage your inventory.</p>
                <a href="/" className="text-primary hover:underline">Return Home</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <AppHeader />
            <div className="container mx-auto px-6 py-10 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-[#181111] dark:text-white tracking-tight">Drive CMS Dashboard</h1>
                        <p className="text-gray-500">Manage your Enspired inventory on Google Drive</p>
                    </div>
                    {view === 'list' && (
                        <button 
                            onClick={() => setView('create')}
                            className="bg-primary hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Add Listing
                        </button>
                    )}
                </div>

                {view === 'create' ? (
                    <PropertyForm 
                        onSuccess={() => { setView('list'); loadData(); }} 
                        onCancel={() => setView('list')} 
                    />
                ) : (
                    <div className="bg-white dark:bg-[#181111] rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#222] text-xs uppercase text-gray-500 font-bold border-b border-gray-200 dark:border-[#333]">
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">District</th>
                                    <th className="px-6 py-4">Price (VND)</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#333]">
                                {properties.map((prop) => (
                                    <tr key={prop.id} className="hover:bg-gray-50 dark:hover:bg-[#1f1515] transition">
                                        <td className="px-6 py-4">
                                            <div className="size-12 rounded-lg bg-gray-200 dark:bg-[#333] overflow-hidden">
                                                {prop.property_media?.[0] && (
                                                    <img src={prop.property_media[0].url} className="w-full h-full object-cover" alt="Thumb" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[#181111] dark:text-white">
                                            {prop.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${prop.category === 'Villa' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {prop.category || 'Apartment'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{prop.district}</td>
                                        <td className="px-6 py-4 font-mono text-sm text-[#181111] dark:text-white">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prop.price_vnd || prop.price_per_night || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleDelete(prop.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {properties.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No properties found. <br/>Add a listing to create the database file on Drive.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};