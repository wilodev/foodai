import { create } from "zustand";
import { IStoreState } from "../types/global";

const useStore = create<IStoreState>((set) => ({
	dishes: [],
	imageBase64: undefined,
	isLoading: false,
	setDishes: (dishes) => set({ dishes }),
	setLoading: (isLoading) => set({ isLoading }),
	setImage: (imageBase64) => set({ imageBase64 }),
}));

export default useStore;
