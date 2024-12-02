import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  darkMode: boolean;
  notifications: boolean;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      darkMode: false,
      notifications: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
    }),
    {
      name: 'app-storage',
    }
  )
);