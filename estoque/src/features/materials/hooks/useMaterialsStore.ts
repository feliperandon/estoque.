import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Material } from "../types/materials";

const initialMaterials: Material[] = [
  {
    id: "mat-1",
    name: "Tecido Algodão",
    categoryId: "cat-1",
    quantity: 123,
    costPerUnit: 18.5,
    description: "Tecido de algodão cru para confecção",
  },
  {
    id: "mat-2",
    name: "Linha Branca",
    categoryId: "cat-2",
    quantity: 121,
    costPerUnit: 0.12,
    description: "Linha branca padrão para costura",
  },
  {
    id: "mat-3",
    name: "Etiqueta Personalizada",
    categoryId: "cat-3",
    quantity: 12,
    costPerUnit: 1.2,
    description: "Etiqueta com logo da marca",
  },
  {
    id: "mat-4",
    name: "Botão Plástico",
    categoryId: "cat-4",
    quantity: 1,
    costPerUnit: 0.35,
    description: "Botão plástico branco 12mm",
  },
  {
    id: "mat-5",
    name: "Zíper",
    categoryId: "cat-5",
    quantity: 10,
    costPerUnit: 3.9,
    description: "Zíper reforçado 20cm",
  },
];

type MaterialState = {
  materials: Material[];
  addMaterial: (item: Material) => void;
  updateMaterial: (id: string, data: Partial<Material>) => void;
  removeMaterial: (id: string) => void;
  consumeStock: (items: { materialId: string; quantityUsed: number }[]) => void;
  restoreStock: (items: { materialId: string; quantityUsed: number }[]) => void;
};

export const useMaterialsStore = create<MaterialState>()(
  persist(
    (set) => {
      return {
        materials: initialMaterials,
        addMaterial: (item) =>
          set((state) => ({ materials: [...state.materials, item] })),
        updateMaterial: (id, data) =>
          set((state) => ({
            materials: state.materials.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          })),
        removeMaterial: (id) =>
          set((state) => ({
            materials: state.materials.filter((item) => item.id !== id),
          })),
        consumeStock: (items) =>
          set((state) => ({
            materials: state.materials.map((material) => {
              const used = items.find(
                (item) => item.materialId === material.id
              );
              if (used) {
                return {
                  ...material,
                  quantity:
                    Math.round((material.quantity - used.quantityUsed) * 100) /
                    100,
                };
              }
              return material;
            }),
          })),
        restoreStock: (items) =>
          set((state) => ({
            materials: state.materials.map((material) => {
              const used = items.find(
                (item) => item.materialId === material.id
              );
              if (used) {
                return {
                  ...material,
                  quantity:
                    Math.round((material.quantity + used.quantityUsed) * 100) /
                    100,
                };
              }
              return material;
            }),
          })),
      };
    },
    { name: "materials-storage" }
  )
);
