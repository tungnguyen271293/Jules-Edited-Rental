import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { RealMapLink } from '../components/RealMapLink';
import { LeafletMap } from '../components/LeafletMap';
import { PROPERTIES } from '../constants';
import { getPropertiesByDistrict, DatabaseProperty, initGoogleServices } from '../services/supabase';

// Helper to map DB property to UI property
const mapDbToUiProperty = (dbProp: DatabaseProperty) => ({
    id: dbProp.id,
    title: dbProp.title,
    location: `${dbProp.address}, ${dbProp.district}`,
    distance: dbProp.district,
    rating: 5.0, // Default for new DB listings
    price: (dbProp.price_per_night * 30) || Math.round((dbProp.price_vnd || 0) / 25000), 
    image: dbProp.property_media?.[0]?.url || "https://placehold.co/600x400?text=No+Image",
    wifi: "Speed Check Pending",
    amenities: ["Desk", "AC"],
    reviews: 0,
    desc: `${dbProp.district} • Drive CMS`,
    type: dbProp.category || "Apartment", // Use DB category or fallback
    isDatabase: true, // Flag to identify
    latitude: dbProp.latitude || undefined,
    longitude: dbProp.longitude || undefined
});

// Helper to estimate guest capacity based on type
const getCapacity = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('villa')) return 8;
    if (t.includes('3br') || t.includes('3 bedroom')) return 6;
    if (t.includes('2br') || t.includes('2 bedroom')) return 4;
    return 2; // Studio, 1BR, Suite, Loft default to 2
};

export const ListingsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    
    // Read params
    const paramLocation = searchParams.get('location') || '';
    const paramGuests = parseInt(searchParams.get('guests') || '1');
    const paramStart = searchParams.get('checkIn');
    const paramEnd = searchParams.get('checkOut');

    // 1. Existing mock data
    const initialListings = useMemo(() => {
        return [...PROPERTIES];
    }, []);

    const [dbListings, setDbListings] = useState<any[]>([]);
    const [isLoadingDb, setIsLoadingDb] = useState(false);

    // 3. Fetch from Drive on mount
    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoadingDb(true);
            try {
                // Initialize services to ensure client is ready
                await initGoogleServices();

                const districtsToFetch = ['Son Tra', 'Hai Chau', 'Ngu Hanh Son'];
                const allFetched = [];
                
                for (const d of districtsToFetch) {
                    const data = await getPropertiesByDistrict(d);
                    if (data) allFetched.push(...data);
                }
                
                if (allFetched.length > 0) {
                    // Deduplicate by ID
                    const unique = Array.from(new Map(allFetched.map(item => [item.id, item])).values());
                    const mapped = unique.map(mapDbToUiProperty);
                    setDbListings(mapped);
                }
            } catch (err) {
                // If not logged in or error, just silently fail for public view
                // console.warn("Could not load Drive data (User might not be logged in)");
            } finally {
                setIsLoadingDb(false);
            }
        };

        fetchProperties();
    }, []);

    const [selectedBedrooms, setSelectedBedrooms] = useState<string>('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([400, 5000]);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    // Filtering Logic
    const filteredListings = useMemo(() => {
        const allListings = [...dbListings, ...initialListings];
        
        return allListings.filter(item => {
            // 1. Location Filter (Text Match)
            if (paramLocation) {
                const searchLower = paramLocation.toLowerCase();
                const matchTitle = item.title.toLowerCase().includes(searchLower);
                const matchLoc = item.location.toLowerCase().includes(searchLower);
                const matchDesc = item.desc?.toLowerCase().includes(searchLower);
                if (!matchTitle && !matchLoc && !matchDesc) return false;
            }

            // 2. Guest Capacity Filter
            if (paramGuests > 1) {
                const cap = getCapacity(item.type);
                if (cap < paramGuests) return false;
            }

            // 3. Price Filter
            if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
            
            // 4. Bedroom Filter (UI Toggle)
            if (selectedBedrooms !== 'All') {
                if (selectedBedrooms === 'Studio' && item.type !== 'Studio') return false;
                if (selectedBedrooms === '1' && item.type !== '1BR' && item.type !== 'Loft' && item.type !== 'Suite' && item.type !== 'Apartment') return false;
                if (selectedBedrooms === '2' && item.type !== '2BR') return false;
                if (selectedBedrooms === '3+' && item.type !== '3BR' && item.type !== 'Villa') return false;
            }
            
            return true;
        });
    }, [selectedBedrooms, priceRange, initialListings, dbListings, paramLocation, paramGuests]);

    return (
        <div className="flex flex-col min-h-screen">
            <AppHeader />
            <main className="flex-grow container mx-auto px-4 md:px-8 py-6 max-w-7xl">
                {/* Breadcrumbs & Header */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#8a6060]">
                        <Link className="hover:text-primary transition" to="/">Home</Link>
                        <span>/</span>
                        <span className="text-[#181111] dark:text-white font-medium">Da Nang Stays</span>
                    </div>
                    
                    {/* Active Search Filters Display */}
                    {(paramLocation || paramGuests > 1 || paramStart) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                             {paramLocation && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                    <span className="material-symbols-outlined text-xs">location_on</span> {paramLocation}
                                </span>
                             )}
                             {paramStart && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                    <span className="material-symbols-outlined text-xs">calendar_month</span> {paramStart} {paramEnd ? `to ${paramEnd}` : '+'}
                                </span>
                             )}
                             {paramGuests > 1 && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                    <span className="material-symbols-outlined text-xs">group</span> {paramGuests} Guests
                                </span>
                             )}
                             <Link to="/listings" className="text-xs text-gray-400 hover:text-[#181111] dark:hover:text-white underline self-center ml-1">Clear Search</Link>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#181111] dark:text-white tracking-tight">Stays in Da Nang</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[#8a6060]">Found {filteredListings.length} verified properties</p>
                                {isLoadingDb && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1">
                                        <span className="animate-spin material-symbols-outlined text-[12px]">sync</span>
                                        Syncing Drive CMS...
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex h-10 bg-[#f5f0f0] dark:bg-[#2a2a2a] p-1 rounded-lg self-start md:self-end">
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-4 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white dark:bg-[#181111] shadow-sm text-[#181111] dark:text-white' : 'text-[#8a6060] hover:text-[#181111] dark:hover:text-white'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                                List View
                            </button>
                            <button 
                                onClick={() => setViewMode('map')}
                                className={`flex items-center gap-2 px-4 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-white dark:bg-[#181111] shadow-sm text-[#181111] dark:text-white' : 'text-[#8a6060] hover:text-[#181111] dark:hover:text-white'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">map</span>
                                Map View
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-1/4 shrink-0 space-y-8">
                        <div className="sticky top-24 space-y-6">
                            {/* Price Filter */}
                            <div className="bg-white dark:bg-[#181111] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-[#333]">
                                <h3 className="font-bold text-[#181111] dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                    Price Range (Monthly)
                                </h3>
                                <div className="px-2">
                                    <input 
                                        type="range" 
                                        min="400" 
                                        max="5000" 
                                        step="50"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    />
                                    <div className="flex justify-between mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Bedrooms */}
                            <div className="bg-white dark:bg-[#181111] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-[#333]">
                                <h3 className="font-bold text-[#181111] dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">bed</span>
                                    Bedrooms
                                </h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {['All', 'Studio', '1', '2'].map((t) => (
                                        <label key={t} className="cursor-pointer">
                                            <input 
                                                checked={selectedBedrooms === t}
                                                onChange={() => setSelectedBedrooms(t)}
                                                className="peer sr-only" 
                                                type="radio"
                                                name="bedrooms"
                                            />
                                            <div className="h-9 flex items-center justify-center rounded-lg border border-[#e6dbdb] dark:border-[#444] text-sm font-medium peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-gray-50 dark:hover:bg-[#222] transition">
                                                {t === 'All' ? 'All' : t === 'Studio' ? 'Std' : t + 'BR'}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={() => { setSelectedBedrooms('All'); setPriceRange([400, 5000]); }}
                                className="w-full bg-[#181111] dark:bg-white text-white dark:text-black font-bold h-11 rounded-lg hover:opacity-90 transition"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Listing Grid */}
                    <div className="w-full lg:w-3/4">
                        {viewMode === 'list' ? (
                            <>
                                {filteredListings.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredListings.map(item => (
                                            <div key={item.id} className="group bg-white dark:bg-[#181111] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-[#333] transition-all duration-300 flex flex-col">
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
                                                    <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src={item.image}/>
                                                    
                                                    {item.isDatabase ? (
                                                        <div className="absolute top-4 left-4 z-20 bg-green-600/95 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                                                            <span className="material-symbols-outlined text-[16px]">cloud</span>
                                                            Drive CMS
                                                        </div>
                                                    ) : (
                                                        <div className="absolute top-4 left-4 z-20 bg-primary/95 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                                                            <span className="material-symbols-outlined text-[16px]">verified_user</span>
                                                            Verified
                                                        </div>
                                                    )}

                                                    <button className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white text-white hover:text-primary p-2 rounded-full backdrop-blur-md transition">
                                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                                    </button>
                                                </div>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-lg leading-tight text-[#181111] dark:text-white group-hover:text-primary transition">{item.title}</h3>
                                                    </div>
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <p className="text-sm text-[#8a6060] flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                            {item.location}
                                                        </p>
                                                        {/* Real Map Link */}
                                                        <RealMapLink 
                                                            query={`${item.location}, Da Nang`} 
                                                            className="text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded" 
                                                            label="Map"
                                                        />
                                                    </div>
                                                    <div className="bg-background-light dark:bg-[#222] rounded-lg p-3 mb-4 grid grid-cols-3 gap-2 divide-x divide-gray-200 dark:divide-gray-700">
                                                        <div className="flex flex-col items-center gap-1 text-center">
                                                            <span className="material-symbols-outlined text-primary text-[20px]">wifi</span>
                                                            <span className="text-xs font-bold text-[#181111] dark:text-gray-200">{item.wifi}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 text-center">
                                                            <span className="material-symbols-outlined text-primary text-[20px]">chair</span>
                                                            <span className="text-xs font-bold text-[#181111] dark:text-gray-200">{item.amenities[0] || 'Desk'}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1 text-center">
                                                            <span className="material-symbols-outlined text-primary text-[20px]">directions_walk</span>
                                                            <span className="text-xs font-bold text-[#181111] dark:text-gray-200">{item.nomadScore || 85}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#333] flex items-center justify-between gap-3">
                                                        <div>
                                                            <p className="text-xl font-bold text-primary">${item.price}<span className="text-sm font-medium text-gray-500 text-black dark:text-gray-400">/mo</span></p>
                                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.type}</p>
                                                        </div>
                                                        <Link to={`/property/${item.id}`} className="flex-1 px-3 py-2 text-xs font-bold text-[#181111] dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center">
                                                            Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-[#181111] rounded-xl border border-dashed border-gray-300 dark:border-[#333]">
                                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No properties found</h3>
                                        <p className="text-gray-500 mb-4">Try adjusting your filters.</p>
                                        <button 
                                            onClick={() => { setSelectedBedrooms('All'); setPriceRange([400, 5000]); }}
                                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-[#333]">
                                <LeafletMap properties={filteredListings} />
                            </div>
                        )}
                        
                        {viewMode === 'list' && filteredListings.length > 0 && (
                            <div className="mt-10 flex justify-center">
                                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#181111] border border-[#e6dbdb] dark:border-[#444] text-[#181111] dark:text-white font-bold text-sm hover:bg-[#f5f0f0] dark:hover:bg-[#222] transition">
                                    Load More Properties
                                    <span className="material-symbols-outlined">expand_more</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <AppFooter />
        </div>
    );
};