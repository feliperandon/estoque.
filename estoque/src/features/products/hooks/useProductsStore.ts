import { create } from "zustand";
import type { Product } from "../types/product";

const initialProducts = [
  { id: "1", name: "Camiseta Azul", quantity: 10 },
  { id: "2", name: "Pulseira Rosa", quantity: 5 },
  { id: "4", name: "Bolsa Preta", quantity: 3 },
  { id: "5", name: "Bolsa Preta", quantity: 3 },
  { id: "6", name: "Bolsa Preta", quantity: 3 },
];

type ProductState = {
  products: Product[];
  addProduct: (item: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  removeProduct: (id: string) => void;
};

export const useProductsStore = create<ProductState>((set) => {
  return {
    products: initialProducts,
    addProduct: (item) =>
      set((state) => ({ products: [...state.products, item] })),
    updateProduct: (id, data) =>
      set((state) => ({
        products: state.products.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      })),
    removeProduct: (id) =>
      set((state) => ({
        products: state.products.filter((item) => item.id !== id),
      })),
  };
});
