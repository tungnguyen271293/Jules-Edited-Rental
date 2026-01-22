import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface MapLocation {
    uri: string;
    title: string;
}

/**
 * Uses Gemini 2.5 Flash with Google Maps Grounding to find the real location URI.
 */
export async function getRealMapLocation(query: string): Promise<MapLocation | null> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Find the specific location for: ${query}.`,
            config: {
                tools: [{ googleMaps: {} }],
            }
        });

        // Extract grounding chunks
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
        if (chunks && chunks.length > 0) {
            // Look for a map chunk first
            const mapChunk = chunks.find((c: any) => c.maps?.uri);
            if (mapChunk && mapChunk.maps) {
                return {
                    uri: mapChunk.maps.uri,
                    title: mapChunk.maps.title
                };
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching map location:", error);
        return null;
    }
}