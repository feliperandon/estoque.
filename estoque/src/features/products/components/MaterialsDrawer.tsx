import { useMaterialCategoryStore } from "@/features/materials/hooks/useMaterialCategoryStore";
import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

import { UNIT_TYPE_CONFIG } from "@/features/materials/config/unitTypeConfig";

import { formatCurrency } from "@/lib/formatCurrency";
import { Trash } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";

type MateriaisDrawerProps = {
  value: { materialId: string; quantityUsed: number }[];
  onChange: (value: { materialId: string; quantityUsed: number }[]) => void;
};

const MaterialsDrawer = ({ value, onChange }: MateriaisDrawerProps) => {
  const materials = useMaterialsStore((state) => state.materials);
  const materialsCategories = useMaterialCategoryStore(
    (state) => state.materialCategories
  );

  const selectedIds = value.map((item) => item.materialId);

  const availableMaterials = materials.filter(
    (material) => !selectedIds.includes(material.id)
  );

  const totalCost = value.reduce((acc, item) => {
    const material = materials.find((m) => m.id === item.materialId);
    if (!material) return acc;
    return acc + item.quantityUsed * material.costPerUnit;
  }, 0);

  return (
    <div>
      <h2 className="text-white text-lg font-medium mb-4">
        Selecionar Materiais
      </h2>
      <div>
        <p className="text-gray-400 text-mb mb-2">Materiais Selecionados</p>

        {value.map((item) => {
          const material = materials.find((m) => m.id === item.materialId);
          if (!material) return null;

          const category = materialsCategories.find(
            (c) => c.id === material.categoryId
          );
          const config = category ? UNIT_TYPE_CONFIG[category.unitType] : null;
          const cost = item.quantityUsed * material.costPerUnit;

          const isOverLimit = item.quantityUsed > material.quantity;

          return (
            <div
              key={item.materialId}
              className="bg-[#3d3d3d] rounded-lg p-3 mb-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">{material.name}</p>
                  <p className="text-gray-400 text-sm">
                    {formatCurrency(material.costPerUnit)} / {config?.suffix}
                    <p className="text-gray-400 text-xs">
                      {material.quantity} {config?.suffix} disponíveis
                    </p>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantityUsed}
                    max={material.quantity}
                    min={0}
                    className={`w-16 h-8 px-2 rounded text-white text-center ${
                      isOverLimit
                        ? "bg-red-900 border border-red-500"
                        : "bg-[#2f2f2f]"
                    }`}
                    onChange={(e) => {
                      const newQuantity = Number(e.target.value);
                      onChange(
                        value.map((v) =>
                          v.materialId === item.materialId
                            ? { ...v, quantityUsed: newQuantity }
                            : v
                        )
                      );
                    }}
                  />
                  {isOverLimit && (
                    <span className="text-red-500 text-xs">
                      Estoque insuficiente
                    </span>
                  )}
                  <span className="text-white">{formatCurrency(cost)}</span>
                  <button
                    onClick={() => {
                      onChange(
                        value.filter((v) => v.materialId !== item.materialId)
                      );
                    }}
                  >
                    <Trash size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center py-3 border-t border-white/10 mt-4">
        <p className="text-gray-400">Custo Total dos Materiais:</p>
        <p className="text-white font-medium text-lg">
          {formatCurrency(totalCost)}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-2">Materiais disponíveis</p>

        <div>
          {availableMaterials.map((material) => {
            const category = materialsCategories.find(
              (c) => c.id === material.categoryId
            );

            const config = category
              ? UNIT_TYPE_CONFIG[category.unitType]
              : null;

            return (
              <div
                key={material.id}
                className="bg-[#3d3d3d] rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-white text-sm">{material.name}</p>
                  <p className="text-gray-400 text-xs">
                    {formatCurrency(material.costPerUnit)} / {config?.suffix}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {material.quantity} {config?.suffix} disponíveis
                  </p>
                </div>
                <button
                  className="text-blue-400 text-sm"
                  onClick={() => {
                    onChange([
                      ...value,
                      { materialId: material.id, quantityUsed: 1 },
                    ]);
                  }}
                >
                  {" "}
                  + Adicionar
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Drawer.Close asChild>
          <button className="w-full py-3 bg-white text-black rounded-lg font-medium cursor-pointer">
            Confirmar Materiais
          </button>
        </Drawer.Close>
        <Drawer.Close asChild>
          <button className="w-full py-3 bg-transparent border border-white/20 text-white rounded-lg cursosr-pointer">
            Cancelar
          </button>
        </Drawer.Close>
      </div>
    </div>
  );
};

export default MaterialsDrawer;
