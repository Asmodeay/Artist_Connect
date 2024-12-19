export type UserRole = 'artist' | 'customer';

export type ArtistType = 'tattoo' | 'nails';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionStatus: 'free' | 'premium';
}

export interface Artist extends User {
  type: ArtistType[];
  bio: string;
  location: string;
  portfolio: PortfolioItem[];
  specialties: string[];
  yearsOfExperience: number;
  contactInfo: {
    phone?: string;
    instagram?: string;
    website?: string;
  };
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
}