import Header from "@/components/layout/Header";
import ProductCard from "@/features/products/components/ProductCard";
import { useProductsStore } from "@/features/products/hooks/useProductsStore";

const Products = () => {
  const products = useProductsStore((state) => state.products);

  return (
    <div>
      <Header title="Produtos" description="Gerencie seus produtos." />
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
