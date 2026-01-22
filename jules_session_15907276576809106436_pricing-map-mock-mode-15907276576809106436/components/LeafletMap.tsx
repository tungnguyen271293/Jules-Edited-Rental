import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

interface LeafletMapProps {
    properties: Property[];
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ properties }) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        // Initialize Map centered on Da Nang
        mapRef.current = L.map(containerRef.current).setView([16.0544, 108.2022], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        // Clear existing layers (except tiles)
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current?.removeLayer(layer);
            }
        });

        // Define custom icon
        const customIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const bounds = L.latLngBounds([]);

        properties.forEach(prop => {
            if (prop.latitude && prop.longitude) {
                const marker = L.marker([prop.latitude, prop.longitude], { icon: customIcon })
                    .addTo(mapRef.current!);
                
                // Create a popup content container
                const popupContent = document.createElement('div');
                const root = createRoot(popupContent);
                
                root.render(
                    <div className="min-w-[200px] flex flex-col gap-2">
                        <div className="h-24 w-full rounded-lg overflow-hidden relative">
                             <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                             <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded font-bold">
                                ${prop.price}
                             </span>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm leading-tight mb-1">{prop.title}</h4>
                            <p className="text-xs text-gray-500 mb-2">{prop.type} • {prop.wifi}</p>
                            <a href={`/#/property/${prop.id}`} className="block w-full text-center bg-red-600 text-white text-xs font-bold py-1.5 rounded hover:bg-red-700 transition">
                                View Details
                            </a>
                        </div>
                    </div>
                );

                marker.bindPopup(popupContent);
                bounds.extend([prop.latitude, prop.longitude]);
            }
        });

        // Fit bounds if markers exist
        if (properties.some(p => p.latitude) && bounds.isValid()) {
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [properties]);

    return (
        <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-[#333] relative z-0">
             <div ref={containerRef} className="w-full h-full" />
        </div>
    );
};
