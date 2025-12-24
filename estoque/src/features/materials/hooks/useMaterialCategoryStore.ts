import { create } from "zustand";

import type { MaterialCategory } from "../types/materialCategory";

const initialMaterialsCategories: MaterialCategory[] = [
  {
    id: "cat-1",
    name: "Tecido",
    unitType: "metro",
  },
  {
    id: "cat-12",
    name: "Tecido 2",
    unitType: "metro",
  },
  {
    id: "cat-2",
    name: "Linha",
    unitType: "metro",
  },
  {
    id: "cat-3",
    name: "Etiqueta",
    unitType: "unidade",
  },
  {
    id: "cat-4",
    name: "Botão",
    unitType: "unidade",
  },
  {
    id: "cat-5",
    name: "Zíper",
    unitType: "unidade",
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
