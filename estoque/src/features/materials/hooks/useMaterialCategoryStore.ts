import { create } from "zustand";

import type { MaterialCategory } from "../types/materialCategory";

const initialMaterialsCategories: MaterialCategory[] = [
  {
    id: "cat-1",
    name: "Tecido",
    unitType: "metro",
    color: "#22c55e",
  },
  {
    id: "cat-12",
    name: "Tecido 2",
    unitType: "metro",
    color: "#272827",
  },
  {
    id: "cat-2",
    name: "Linha",
    unitType: "metro",
    color: "#ec4899",
  },
  {
    id: "cat-3",
    name: "Etiqueta",
    unitType: "unidade",
    color: "#a855f7",
  },
  {
    id: "cat-4",
    name: "Botão",
    unitType: "unidade",
    color: "#3b82f6",
  },
  {
    id: "cat-5",
    name: "Zíper",
    unitType: "unidade",
    color: "#f97316",
  },
];

type MaterialCategoryState = {
  materialCategories: MaterialCategory[];
  addMaterialCategory: (item: MaterialCategory) => void;
  updateMaterialCategory: (id: string, data: Partial<MaterialCategory>) => void;
  removeMaterialCategory: (id: string) => void;
};

export const useMaterialCategoryStore = create<MaterialCategoryState>((set) => {
  return {
    materialCategories: initialMaterialsCategories,
    addMaterialCategory: (item) =>
      set((state) => ({
        materialCategories: [...state.materialCategories, item],
      })),
    updateMaterialCategory: (id, data) =>
      set((state) => ({
        materialCategories: state.materialCategories.map((category) =>
          category.id === id ? { ...category, ...data } : category
        ),
      })),
    removeMaterialCategory: (id) =>
      set((state) => ({
        materialCategories: state.materialCategories.filter(
          (category) => category.id !== id
        ),
      })),
  };
});
