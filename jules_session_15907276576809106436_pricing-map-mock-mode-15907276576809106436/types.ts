export interface Property {
    id: string;
    title: string;
    location: string;
    distance?: string;
    rating: number;
    price: number;
    image: string;
    wifi: string;
    amenities: string[];
    reviews?: number;
    desc: string;
    type: string;
    nomadScore?: number;
    latitude?: number;
    longitude?: number;
}