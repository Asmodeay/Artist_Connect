import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const SUBSCRIPTION_PRICES = {
  ARTIST: {
    monthly: 'price_artist_monthly',
    yearly: 'price_artist_yearly'
  },
  CUSTOMER: {
    monthly: 'price_customer_monthly',
    yearly: 'price_customer_yearly'
  }
};