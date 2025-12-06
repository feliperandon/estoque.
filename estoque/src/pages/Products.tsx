import Header from "@/components/layout/Header";
import ProductCard from "@/features/products/components/ProductCard";

const products = [
  { id: "1", name: "Camiseta Azul", quantity: 10 },
  { id: "2", name: "Pulseira Rosa", quantity: 5 },
  { id: "4", name: "Bolsa Preta", quantity: 3 },
  { id: "5", name: "Bolsa Preta", quantity: 3 },
  { id: "6", name: "Bolsa Preta", quantity: 3 },
];

const Products = () => {
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
