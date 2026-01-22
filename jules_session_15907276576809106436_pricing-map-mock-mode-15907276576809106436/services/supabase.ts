// Replaced Supabase with Google Drive API Service
// @ts-nocheck - To avoid strict type issues with window.gapi/google without full type defs

export interface DatabaseProperty {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  price_per_night: number;
  price_vnd?: number;
  address: string;
  district: string;
  category?: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  property_media: { url: string; sort_order: number }[];
}

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE'; 
const API_KEY = process.env.API_KEY || ''; // Provided via environment
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DB_FILENAME = 'enspired_db.json';

// Global state trackers
let tokenClient: any;
let gapiInited = false;
let gisInited = false;
let initPromise: Promise<void> | null = null;

// Initialize GIS and GAPI
export const initGoogleServices = (): Promise<void> => {
    if (initPromise) return initPromise;

    initPromise = new Promise((resolve) => {
        const checkReady = () => {
            if (gapiInited && gisInited) resolve();
        };

        // Load GAPI
        const script1 = document.createElement('script');
        script1.src = 'https://apis.google.com/js/api.js';
        script1.onload = () => {
            window.gapi.load('client', async () => {
                await window.gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: DISCOVERY_DOCS,
                });
                gapiInited = true;
                checkReady();
            });
        };
        document.body.appendChild(script1);

        // Load GIS
        const script2 = document.createElement('script');
        script2.src = 'https://accounts.google.com/gsi/client';
        script2.onload = () => {
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined at request time
            });
            gisInited = true;
            checkReady();
        };
        document.body.appendChild(script2);
    });

    return initPromise;
};

export const signInWithGoogle = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!tokenClient) return reject('GIS not initialized');
        tokenClient.callback = (resp: any) => {
            if (resp.error) reject(resp);
            resolve(resp.access_token);
        };
        tokenClient.requestAccessToken({ prompt: 'consent' });
    });
};

export const getAccessToken = () => {
    return window.gapi?.client?.getToken()?.access_token;
};

export const signOut = () => {
    const token = getAccessToken();
    if (token) {
        window.google.accounts.oauth2.revoke(token, () => {});
        window.gapi.client.setToken(null);
    }
};

export const getUser = async () => {
    if (!getAccessToken()) return null;
    try {
        const response = await window.gapi.client.drive.about.get({ fields: 'user' });
        return { 
            email: response.result.user.emailAddress, 
            id: response.result.user.permissionId 
        };
    } catch (e) {
        console.error("Failed to get user info", e);
        return null;
    }
};

// --- Drive CMS Logic ---

// Find the database file
const findDbFile = async () => {
    try {
        const response = await window.gapi.client.drive.files.list({
            q: `name = '${DB_FILENAME}' and mimeType = 'application/json' and trashed = false`,
            fields: 'files(id, name)',
        });
        return response.result.files?.[0];
    } catch (e) {
        return null;
    }
};

// Fetch properties filtered by district
export async function getPropertiesByDistrict(district: string) {
    if (!getAccessToken()) return []; // Return empty if not authenticated
    
    try {
        const file = await findDbFile();
        if (!file) return [];

        const response = await window.gapi.client.drive.files.get({
            fileId: file.id,
            alt: 'media',
        });
        
        // Handle case where file is empty or response.result is string
        let allProps: DatabaseProperty[] = [];
        if (typeof response.result === 'string') {
             try { allProps = JSON.parse(response.result); } catch(e) {}
        } else {
             allProps = response.result || [];
        }

        if (!Array.isArray(allProps)) return [];

        if (district) {
            return allProps.filter(p => p.district === district);
        }
        return allProps;
    } catch (error) {
        console.error('Error fetching properties from Drive:', error);
        return [];
    }
}

// Fetch all properties (for Admin)
export async function fetchAllProperties() {
    return getPropertiesByDistrict(''); // Reuse logic
}

// Save properties list to Drive
export async function savePropertiesToDrive(properties: DatabaseProperty[]) {
    const file = await findDbFile();
    const fileContent = JSON.stringify(properties);
    
    const metadata = {
        name: DB_FILENAME,
        mimeType: 'application/json',
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([fileContent], { type: 'application/json' }));

    const token = getAccessToken();

    if (file) {
        // Update existing file
        await fetch(`https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=multipart`, {
            method: 'PATCH',
            headers: new Headers({ 'Authorization': 'Bearer ' + token }),
            body: form
        });
    } else {
        // Create new file
        await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + token }),
            body: form
        });
    }
}

// Deprecated Supabase Mock (to prevent crashes in imports we haven't touched if any)
export const supabase = {
    auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: () => Promise.resolve({ error: { message: "Use Google Sign In" } }),
        signInWithPassword: () => Promise.resolve({ error: { message: "Use Google Sign In" } }),
    }
};
