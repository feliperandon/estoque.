import Header from "@/components/layout/Header";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import ProductCard from "@/features/products/components/ProductCard";
import ProductForm from "@/features/products/components/ProductForm";

import { useProductsStore } from "@/features/products/hooks/useProductsStore";

import { useState } from "react";

const Products = () => {
  const products = useProductsStore((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header title="Produtos" description="Gerencie seus produtos." />
      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Trigger>
          <Button>Novo Produto</Button>
        </Modal.Trigger>

        <Modal.Content title="Adicionar produto">
          <ProductForm onSubmitSuccess={() => setIsOpen(false)} />
        </Modal.Content>
      </Modal.Root>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
