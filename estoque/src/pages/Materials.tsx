import Header from "@/components/layout/Header";

import { Searchbar, Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";

import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

const Materials = () => {
  const materials = useMaterialsStore((state) => state.materials);

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

          <Modal.Content>.</Modal.Content>
        </Modal.Root>
      </div>

      <div>
        {materials.map((material) => (
          <div key={material.id}>
            <h3>{material.name}</h3>
            <p>{material.description}</p>
            <p>{material.unit}</p>
            <p>{material.costPerUnit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
