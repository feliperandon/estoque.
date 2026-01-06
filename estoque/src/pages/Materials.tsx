import Header from "@/components/layout/Header";

import { Searchbar, Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";

import { Plus, Tag } from "lucide-react";

import MaterialForm from "@/features/materials/components/MaterialForm";
import MaterialTable from "@/features/materials/components/MaterialTable";

import { useMaterialCategoryStore } from "@/features/materials/hooks/useMaterialCategoryStore";
import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

import type { Material } from "@/features/materials/types/materials";

import { useState } from "react";
import CategoryModal from "@/features/materials/components/CategoryModal";

const Materials = () => {
  const materials = useMaterialsStore((state) => state.materials);
  const removeMaterial = useMaterialsStore((state) => state.removeMaterial);

  const categories = useMaterialCategoryStore(
    (state) => state.materialCategories
  );

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [search, setSearch] = useState("");

  const handleCreateMaterial = () => {
    setEditingMaterial(null);
    setIsOpen(true);
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setIsOpen(true);
  };

  const handleRemoveMaterial = (materialId: string) => {
    removeMaterial(materialId);
  };

  const handleModalChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingMaterial(null);
    }
  };

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#474747] min-h-screen">
      <Header title="Materiais" description="Gerencie seus materiais." />
      <div className="h-px w-full bg-white/20 mb-6"></div>
      <div className="flex justify-between mt-4 mb-4">
        <Searchbar
          placeholder="Buscar materiais..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            className="flex gap-2 items-center"
            variant="outline"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <Tag size={18} />
            Categorias
          </Button>
          <Button
            onClick={handleCreateMaterial}
            className="flex gap-2 items-center"
          >
            <Plus size={18} />
            Novo Material
          </Button>
        </div>
      </div>

      <div>
        <MaterialTable
          materials={filteredMaterials}
          onEdit={handleEditMaterial}
          onRemove={handleRemoveMaterial}
          categories={categories}
        />
      </div>
      <Modal.Root open={isOpen} onOpenChange={handleModalChange}>
        <Modal.Content
          title={editingMaterial ? "Editar Material" : "Novo Material"}
        >
          <MaterialForm
            onSubmitSuccess={() => setIsOpen(false)}
            initialData={editingMaterial}
          />
        </Modal.Content>
      </Modal.Root>
      <CategoryModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
      />
    </div>
  );
};

export default Materials;
