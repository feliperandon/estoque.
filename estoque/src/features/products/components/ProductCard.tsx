import Card from "@/components/ui/Card";

import type { Product } from "../types/product";

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card>
      <h1>{product.name}</h1>
      <p>Quantidade: {product.quantity}</p>
    </Card>
  );
};

export default ProductCard;
