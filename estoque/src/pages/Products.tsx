import { useState } from "react";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import ProductCard from "@/features/products/components/ProductCard";
import ProductForm from "@/features/products/components/ProductForm";
import { useProductsStore } from "@/features/products/hooks/useProductsStore";
import Searchbar from "@/components/ui/Searchbar";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#474747] min-h-screen">
      <Header title="Produtos" description="Gerencie seus produtos." />
      <div className="h-px w-full bg-white/20 mb-6"></div>
      <div className="flex justify-between mt-4 mb-4">
        <Searchbar />
        <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
          <Modal.Trigger>
            <Button>Novo Produto</Button>
          </Modal.Trigger>

          <Modal.Content title="Adicionar produto">
            <ProductForm onSubmitSuccess={() => setIsOpen(false)} />
          </Modal.Content>
        </Modal.Root>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
