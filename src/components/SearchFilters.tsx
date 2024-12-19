import React from 'react';
import { Sliders } from 'lucide-react';

export function SearchFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Sliders className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Type
          </label>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
              Tattoo Artists
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              Nail Technicians
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Style
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Styles</option>
            <option>Traditional</option>
            <option>Modern</option>
            <option>Minimalist</option>
            <option>Abstract</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Any Experience</option>
            <option>1+ years</option>
            <option>3+ years</option>
            <option>5+ years</option>
            <option>10+ years</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city or zip code"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}