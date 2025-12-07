import { create } from "zustand";
import type { Product } from "../types/product";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Azul",
    quantity: 10,
    price: 59.9,

    description: "Produto inicial de exemplo",
    categories: ["Moda"],
  },
  {
    id: "2",
    name: "Camiseta Verde",
    quantity: 10,
    price: 59.9,
    description: "Produto inicial de exemplo",
    categories: ["Moda"],
  },
  {
    id: "3",
    name: "Camiseta Rosa",
    quantity: 10,
    price: 59.9,
    description: "Produto inicial de exemplo",
    categories: ["Moda"],
  },
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
