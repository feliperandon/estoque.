import Header from "@/components/layout/Header";

import { Searchbar, Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";

import MaterialTable from "@/features/materials/components/MaterialTable";

import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

import type { Material } from "@/features/materials/types/materials";

import { useState } from "react";

const Materials = () => {
  const materials = useMaterialsStore((state) => state.materials);

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
  };

  const handleRemoveMaterial = (materialId: string) => {
    // Implement removal logic here
  };
  return (
    <div className="bg-[#474747] min-h-screen">
      <Header title="Materiais" description="Gerencie seus materiais." />
      <div className="h-px w-full bg-white/20 mb-6"></div>
      <div className="flex justify-between mt-4 mb-4">
        <Searchbar placeholder="Buscar materiais..." />
        <Modal.Root>
          <Modal.Trigger>
            <Button>Novo Material</Button>
          </Modal.Trigger>

          <Modal.Content></Modal.Content>
        </Modal.Root>
      </div>

      <div>
        <MaterialTable
          materials={materials}
          onEdit={handleEditMaterial}
          onRemove={handleRemoveMaterial}
        />
      </div>
    </div>
  );
};

export default Materials;
