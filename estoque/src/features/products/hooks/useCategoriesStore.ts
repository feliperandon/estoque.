import { create } from "zustand";

const initialCategories: string[] = ["Moda", "Eletrônicos", "Casa"];

type CategoryState = {
  categories: string[];
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
};

export const useCategoriesStore = create<CategoryState>((set) => {
  return {
    categories: initialCategories,
    addCategory: (name: string) =>
      set((state) => ({
        categories: [...state.categories, name],
      })),
    removeCategory: (name: string) =>
      set((state) => ({
        categories: state.categories.filter((category) => category !== name),
      })),
  };
});
