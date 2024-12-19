import { create } from 'zustand';
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
  where,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from './authStore';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

interface MessageState {
  messages: Message[];
  activeChat: string | null;
  loading: boolean;
  error: string | null;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  setActiveChat: (userId: string) => void;
  markAsRead: (messageId: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  activeChat: null,
  loading: false,
  error: null,

  sendMessage: async (receiverId: string, content: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ error: 'Must be logged in to send messages' });
      return;
    }

    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'messages'), {
        senderId: user.id,
        receiverId,
        content,
        createdAt: serverTimestamp(),
        read: false
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  setActiveChat: (userId: string) => {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) return;

    set({ activeChat: userId, loading: true });

    // Set up real-time listener for messages
    const q = query(
      collection(db, 'messages'),
      where('senderId', 'in', [currentUser.id, userId]),
      where('receiverId', 'in', [currentUser.id, userId]),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Message);
      });
      set({ messages, loading: false });
    });

    // Clean up listener when changing active chat
    return () => unsubscribe();
  },

  markAsRead: async (messageId: string) => {
    try {
      // Update message read status in Firestore
      // Implementation depends on your data structure
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));