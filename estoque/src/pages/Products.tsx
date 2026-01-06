import { useState } from "react";

import Header from "@/components/layout/Header";

import { Button, Searchbar } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";

import ProductCard from "@/features/products/components/ProductCard";
import ProductForm from "@/features/products/components/ProductForm";

import { useProductsStore } from "@/features/products/hooks/useProductsStore";
import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

import type { Product } from "@/features/products/types/product";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const removeProduct = useProductsStore((state) => state.removeProduct);

  const restoreStock = useMaterialsStore((state) => state.restoreStock);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const handleRemoveProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);

    if (product?.materials && product.materials.length > 0) {
      restoreStock(product.materials);
    }
    removeProduct(productId);
  };

  const handleModalChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#474747] min-h-screen">
      <Header title="Produtos" description="Gerencie seus produtos." />
      <div className="h-px w-full bg-white/20 mb-6"></div>
      <div className="flex justify-between mt-4 mb-4">
        <Searchbar
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Modal.Root open={isOpen} onOpenChange={handleModalChange}>
          <Modal.Trigger>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setIsOpen(true);
              }}
            >
              Novo Produto
            </Button>
          </Modal.Trigger>

          <Modal.Content
            title={editingProduct ? "Editar Produto" : "Novo Produto"}
          >
            <ProductForm
              onSubmitSuccess={() => setIsOpen(false)}
              initialData={editingProduct}
            />
          </Modal.Content>
        </Modal.Root>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onRemove={handleRemoveProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
