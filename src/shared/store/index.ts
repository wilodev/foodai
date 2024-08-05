import { create } from "zustand";
import { IStoreState } from "../types/global";

const useStore = create<IStoreState>((set) => ({
	dishes: [],
	isLoading: false,
	setDishes: (dishes) => set({ dishes }),
	setLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;
