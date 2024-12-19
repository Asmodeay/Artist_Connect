import React from 'react';
import { Check } from 'lucide-react';
import { useSubscriptionStore } from '../../stores/subscriptionStore';
import { useAuthStore } from '../../stores/authStore';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  priceId: string;
  interval: 'monthly' | 'yearly';
}

export function PricingCard({ title, price, features, priceId, interval }: PricingCardProps) {
  const { subscribeToPlan, isLoading } = useSubscriptionStore();
  const { user } = useAuthStore();

  const handleSubscribe = () => {
    subscribeToPlan(priceId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold tracking-tight text-gray-900">
          ${price}
        </span>
        <span className="ml-1 text-xl font-semibold text-gray-500">
          /{interval}
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-indigo-500 shrink-0" />
            <span className="ml-3 text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isLoading || !user}
        className="mt-8 w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}