import { Pen, Trash } from "lucide-react";
import type { Product } from "../types/product";

import { formatCurrency } from "@/lib/formatCurrency";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onRemove: (productId: string) => void;
};

const ProductCard = ({ product, onEdit, onRemove }: ProductCardProps) => {
  return (
    <div className="bg-[#2F2F2F] relative group rounded-xl p-4 flex flex-col gap-3 w-full shadow-md border border-[#3A3A3A]">
      <div
        className="
           absolute inset-0 
    bg-black/40 
    opacity-0 
    group-hover:opacity-100 
    transition-opacity 
    duration-200
    flex items-center justify-center
    gap-4
        "
      >
        <button
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition backdrop-blur-sm cursor-pointer"
          onClick={() => onEdit(product)}
        >
          <Pen />
        </button>
        <button
          className="bg-white/10 hover:bg-white/20 text-red-700 p-3 rounded-lg transition backdrop-blur-sm cursor-pointer"
          onClick={() => onRemove(product.id)}
        >
          <Trash />
        </button>
      </div>
      <div className="w-full h-[220px] bg-[#3A3A3A] rounded-lg overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            <div className="w-20 h-20 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
              📷
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 text-white">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        {product.description && (
          <p className="text-sm text-gray-300 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>

      {product.categories && product.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {product.categories.map((cat) => (
            <span
              key={cat}
              className="
                px-3 py-1
                text-xs
                rounded-lg
                bg-[#3A3A3A]
                text-gray-200
              "
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      <div className="h-px w-full bg-white/20 mb-6"></div>

      <div className="flex items-center justify-between text-xs text-gray-300">
        <div className="flex flex-col gap-2">
          <span>⏱ {product.timeSpent ?? 0}h</span>
          <span>Em estoque: {product.quantity} un</span>
        </div>

        <div className="flex flex-col text-right gap-2">
          <span>Custo: {formatCurrency(product.price ?? 0)}</span>
          <span className="text-white font-bold text-2xl">
            {formatCurrency(product.price ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
