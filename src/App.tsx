import React from 'react';
import { Navigation } from './components/Navigation';
import { SearchFilters } from './components/SearchFilters';
import { ArtistCard } from './components/ArtistCard';

const MOCK_ARTIST = {
  id: '1',
  name: 'Sarah Anderson',
  email: 'sarah@example.com',
  role: 'artist' as const,
  type: ['tattoo'],
  bio: 'Specializing in minimalist and geometric tattoo designs',
  location: 'Brooklyn, NY',
  portfolio: [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
      title: 'Geometric Wolf',
      description: 'Minimalist geometric wolf design',
      tags: ['geometric', 'minimalist', 'animals'],
      createdAt: '2024-03-15'
    }
  ],
  specialties: ['Geometric', 'Minimalist', 'Fine Line'],
  yearsOfExperience: 5,
  contactInfo: {
    phone: '+1234567890',
    instagram: '@sarah.ink',
    website: 'www.sarahink.com'
  },
  subscriptionStatus: 'premium' as const
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-80">
            <SearchFilters />
          </aside>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[MOCK_ARTIST, MOCK_ARTIST, MOCK_ARTIST].map((artist, index) => (
                <ArtistCard
                  key={index}
                  artist={artist}
                  isPremiumUser={false}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;