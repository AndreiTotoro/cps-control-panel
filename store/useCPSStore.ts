import { create } from "zustand";

// Define the types for the states
interface StoreState {
  isMaster: boolean;
  setIsMaster: (isMaster: boolean) => void;
}

// Create the store
const useCPSStore = create<StoreState>((set) => ({
  isMaster: false,
  setIsMaster: (isMaster: boolean) =>
    set((state) => ({
      isMaster: isMaster,
    })),
  // Actions to update the states
}));

export default useCPSStore;
