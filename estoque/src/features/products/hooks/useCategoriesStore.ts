import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialCategories: string[] = ["Moda", "Eletrônicos", "Casa"];

type CategoryState = {
  categories: string[];
  addCategory: (name: string) => void;
  removeCategory: (name: string) => void;
};

export const useCategoriesStore = create<CategoryState>()(
  persist(
    (set) => {
      return {
        categories: initialCategories,
        addCategory: (name: string) =>
          set((state) => ({
            categories: [...state.categories, name],
          })),
        removeCategory: (name: string) =>
          set((state) => ({
            categories: state.categories.filter(
              (category) => category !== name
            ),
          })),
      };
    },
    {
      name: "categories-storage",
    }
  )
);
