import React from 'react';
import { Star, MapPin, Lock } from 'lucide-react';
import type { Artist } from '../types';

interface ArtistCardProps {
  artist: Artist;
  isPremiumUser: boolean;
}

export function ArtistCard({ artist, isPremiumUser }: ArtistCardProps) {
  const featuredWork = artist.portfolio[0];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={featuredWork?.imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'}
          alt={featuredWork?.title || 'Artist work'}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{artist.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">4.9</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{artist.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {artist.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        {!isPremiumUser ? (
          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg text-sm text-gray-500">
            <Lock className="w-4 h-4 mr-1" />
            <span>Upgrade to view contact info</span>
          </div>
        ) : (
          <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Contact Artist
          </button>
        )}
      </div>
    </div>
  );
}