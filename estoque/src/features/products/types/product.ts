export type Product = {
  id: string;
  name: string;
  quantity: number;
  price?: number;
  description?: string;
  imageUrl?: string;
  timeSpent?: number;
  categories?: string[];

  materials?: {
    materialId: string;
    quantity: number;
  }[];
};
