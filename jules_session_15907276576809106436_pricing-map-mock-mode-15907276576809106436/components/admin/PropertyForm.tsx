import React, { useState, useEffect } from 'react';
import { useDrivePicker } from 'react-drive-picker';
import { AdminPropertyInput, createPropertyWithImages, District, Category, DriveImage } from '../../services/admin';
import { getAccessToken, initGoogleServices } from '../../services/supabase';

interface PropertyFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<DriveImage[]>([]);
    
    // Drive Picker Hook
    const [openPicker, authResponse] = useDrivePicker();  
    
    const [formData, setFormData] = useState<AdminPropertyInput>({
        title: '',
        description: '',
        price_vnd: 15000000,
        address: '',
        district: 'Son Tra',
        category: 'Apartment'
    });

    useEffect(() => {
        initGoogleServices();
    }, []);

    const handleOpenPicker = () => {
        const token = getAccessToken();
        if (!token) {
            alert("Please sign in first via the Admin Dashboard header.");
            return;
        }
        
        openPicker({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
            developerKey: process.env.API_KEY || "",
            viewId: "DOCS_IMAGES",
            token: token,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callback: (data) => {
                if (data.action === 'picked') {
                    const newImages = data.docs.map((doc: any) => ({
                        // Use thumbnailLink for display, or construct a usable link
                        // Ideally for a public site we need a public link, but for drive.file scope 
                        // we often use the thumbnailLink or webContentLink if authenticated.
                        // For this demo we use the thumbnail which is usually accessible.
                        url: `https://lh3.googleusercontent.com/d/${doc.id}`, 
                        id: doc.id
                    }));
                    setSelectedImages(prev => [...prev, ...newImages]);
                }
            },
        });
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createPropertyWithImages(formData, selectedImages);
            alert('Property created successfully!');
            onSuccess();
        } catch (err: any) {
            console.error(err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#181111] p-6 rounded-xl border border-gray-200 dark:border-[#333] space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#333] pb-4">
                <h2 className="text-xl font-bold text-[#181111] dark:text-white">New Listing (Drive CMS)</h2>
                <button type="button" onClick={onCancel} className="text-gray-500 hover:text-[#181111] dark:hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Property Title</label>
                    <input 
                        required
                        className="w-full bg-gray-50 dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] rounded-lg px-4 py-3 text-[#181111] dark:text-white focus:ring-primary"
                        placeholder="e.g. Mee Villa 6BR Ocean View"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <div className="flex gap-2">
                        {(['Apartment', 'Villa'] as Category[]).map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFormData({...formData, category: cat})}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors border ${
                                    formData.category === cat 
                                    ? 'bg-primary text-white border-primary' 
                                    : 'bg-white dark:bg-[#222] text-gray-500 border-gray-200 dark:border-[#444]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">District</label>
                    <select
                        className="w-full bg-gray-50 dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] rounded-lg px-4 py-3 text-[#181111] dark:text-white focus:ring-primary"
                        value={formData.district}
                        onChange={e => setFormData({...formData, district: e.target.value as District})}
                    >
                        <option value="Hai Chau">Hai Chau</option>
                        <option value="Son Tra">Son Tra</option>
                        <option value="Ngu Hanh Son">Ngu Hanh Son</option>
                        <option value="Cam Le">Cam Le</option>
                        <option value="Thanh Khe">Thanh Khe</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price (VND / Month)</label>
                    <input 
                        type="number"
                        required
                        className="w-full bg-gray-50 dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] rounded-lg px-4 py-3 text-[#181111] dark:text-white focus:ring-primary"
                        value={formData.price_vnd}
                        onChange={e => setFormData({...formData, price_vnd: Number(e.target.value)})}
                    />
                </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Address</label>
                    <input 
                        required
                        className="w-full bg-gray-50 dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] rounded-lg px-4 py-3 text-[#181111] dark:text-white focus:ring-primary"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea 
                        className="w-full bg-gray-50 dark:bg-[#2a1515] border border-gray-200 dark:border-[#3a2020] rounded-lg px-4 py-3 text-[#181111] dark:text-white focus:ring-primary h-32"
                        placeholder="Detailed description of the property..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Photos (via Drive)</label>
                    <div 
                        onClick={handleOpenPicker}
                        className="border-2 border-dashed border-gray-300 dark:border-[#444] rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-[#222] transition cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-12 h-12" />
                        <p className="text-sm font-bold text-[#181111] dark:text-white">Select from Google Drive</p>
                        <p className="text-xs text-gray-500">Choose images to link to this property</p>
                    </div>

                    {selectedImages.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                            {selectedImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100">
                                    <img src={img.url} className="w-full h-full object-cover" alt="Selected" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-[#333]">
                <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-red-500/20 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {loading ? <span className="animate-spin material-symbols-outlined">refresh</span> : 'Create Listing'}
                </button>
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="flex-1 bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444] text-[#181111] dark:text-white font-bold py-3 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};