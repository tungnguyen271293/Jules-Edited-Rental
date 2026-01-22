import React, { useState, useEffect } from 'react';
import { getRealMapLocation, MapLocation } from '../services/gemini';

interface RealMapLinkProps {
    query: string;
    className?: string;
    showIcon?: boolean;
    label?: string;
}

export const RealMapLink: React.FC<RealMapLinkProps> = ({ query, className, showIcon = true, label = "View on Maps" }) => {
    const [location, setLocation] = useState<MapLocation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Fetch location on hover or click to save tokens, or immediately? 
    // For this demo, let's fetch on mount but handle it gracefully.
    useEffect(() => {
        let mounted = true;
        
        const fetchLocation = async () => {
            if (!query) return;
            setLoading(true);
            const result = await getRealMapLocation(query);
            if (mounted) {
                setLocation(result);
                if (!result) setError(true);
                setLoading(false);
            }
        };

        fetchLocation();

        return () => { mounted = false; };
    }, [query]);

    if (error) {
        // Fallback to a simple search link if grounding fails
        const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        return (
            <a 
                href={fallbackUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${className} opacity-80 hover:opacity-100 flex items-center gap-1`}
                onClick={(e) => e.stopPropagation()}
            >
                {showIcon && <span className="material-symbols-outlined text-[18px]">map</span>}
                {label}
            </a>
        );
    }

    if (loading) {
        return (
            <span className={`${className} flex items-center gap-1 opacity-60`}>
                <span className="animate-spin size-3 border-2 border-current border-t-transparent rounded-full"></span>
                Locating...
            </span>
        );
    }

    if (location) {
        return (
            <a 
                href={location.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${className} text-primary hover:text-red-700 flex items-center gap-1 font-medium transition-colors`}
                title={location.title}
                onClick={(e) => e.stopPropagation()}
            >
                {showIcon && <span className="material-symbols-outlined filled text-[18px]">location_on</span>}
                {label}
            </a>
        );
    }

    return null;
};