import { savePropertiesToDrive, fetchAllProperties, DatabaseProperty, getUser } from './supabase';

export type District = 'Hai Chau' | 'Son Tra' | 'Ngu Hanh Son' | 'Lien Chieu' | 'Thanh Khe' | 'Cam Le';
export type Category = 'Villa' | 'Apartment';

export interface AdminPropertyInput {
    title: string;
    description: string;
    price_vnd: number;
    address: string;
    district: District;
    category: Category;
    latitude?: number;
    longitude?: number;
}

export interface DriveImage {
    url: string;
    id: string;
}

/**
 * Creates a new property in the Drive JSON database.
 */
export async function createPropertyWithImages(
    propertyData: AdminPropertyInput,
    images: DriveImage[]
) {
    // 1. Check Auth
    const user = await getUser();
    if (!user) throw new Error('Not authenticated with Google');

    // 2. Prepare new Property Object
    const newProperty: DatabaseProperty = {
        id: crypto.randomUUID(), // Generate a UUID
        owner_id: user.id,
        ...propertyData,
        price_per_night: Math.round(propertyData.price_vnd / 25000), // Approx conversion for schema compatibility
        latitude: null,
        longitude: null,
        created_at: new Date().toISOString(),
        property_media: images.map((img, idx) => ({
            url: img.url,
            sort_order: idx
        }))
    };

    // 3. Fetch existing properties, append, and save
    const currentProps = await fetchAllProperties();
    const updatedProps = [newProperty, ...currentProps];
    
    await savePropertiesToDrive(updatedProps);

    return newProperty;
}

/**
 * Deletes a property from the Drive JSON database.
 */
export async function deleteProperty(id: string) {
    const currentProps = await fetchAllProperties();
    const updatedProps = currentProps.filter(p => p.id !== id);
    await savePropertiesToDrive(updatedProps);
}

// Re-export for AdminDashboard
export { fetchAllProperties as fetchAllPropertiesAdmin } from './supabase';
