import { create } from 'zustand';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from './authStore';
import { stripePromise, SUBSCRIPTION_PRICES } from '../lib/stripe';

interface SubscriptionState {
  isLoading: boolean;
  error: string | null;
  subscribeToPlan: (priceId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  clearError: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isLoading: false,
  error: null,

  subscribeToPlan: async (priceId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ error: 'User must be logged in to subscribe' });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create checkout session on your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  cancelSubscription: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ error: 'User must be logged in to cancel subscription' });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      
      // Call your backend to cancel the subscription
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      // Update user document
      await updateDoc(doc(db, 'users', user.id), {
        subscriptionStatus: 'free'
      });

      // Update auth store
      useAuthStore.setState({
        user: { ...user, subscriptionStatus: 'free' }
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null })
}));