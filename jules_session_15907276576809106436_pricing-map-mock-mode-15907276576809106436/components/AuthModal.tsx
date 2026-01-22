import React, { useState, useEffect } from 'react';
import { signInWithGoogle, initGoogleServices, getUser } from '../services/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            initGoogleServices().catch(e => setError("Failed to initialize Google Services"));
        }
    }, [isOpen]);

    if (!isOpen) return null;
    
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            const user = await getUser();
            if (user) {
                onClose();
                window.location.reload();
            } else {
                setError("Login succeeded but user info could not be fetched.");
            }
        } catch (err: any) {
            console.error(err);
            setError('Google Sign In failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white dark:bg-[#181111] rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-[fadeIn_0.2s_ease-out]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
                
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary mb-4">
                         <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#181111] dark:text-white">Admin Access</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Sign in with Google to manage your Enspired properties directly from Drive.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 text-left">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </div>
                )}

                <button 
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
                >
                    {loading ? (
                        <span className="size-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>
                
                <p className="mt-6 text-xs text-gray-400">
                    This will request access to manage files created by this app (drive.file scope).
                </p>
            </div>
        </div>
    );
};