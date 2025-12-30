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
      <div className="mb-6">
        <h2 className="text-white text-xl font-semibold">
          Selecionar Materiais
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Adicione os materiais utilizados neste produto.
        </p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
          Materiais Selecionados ({value.length})
        </p>

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
              className="bg-[#3d3d3d] rounded-xl p-4 mb-3 border border-white/5"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  />
                  <span className="text-white font-medium">
                    {material.name}
                  </span>
                  <span className="text-white font-semibold">
                    {formatCurrency(cost)}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3 ml-5">
                {formatCurrency(material.costPerUnit)} / {config?.suffix} •{" "}
                {material.quantity} {config?.suffix} disponíveis
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    className="w-8 h-8 rounded-lg bg-[#2f2f2f] text-white flex items-center justify-center hover:bg-white/10"
                    onClick={() => {
                      if (item.quantityUsed > 0) {
                        onChange(
                          value.map((v) =>
                            v.materialId === item.materialId
                              ? { ...v, quantityUsed: v.quantityUsed - 1 }
                              : v
                          )
                        );
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantityUsed}
                    max={material.quantity}
                    min={0}
                    className={`w-16 h-8 px-2 rounded-lg text-white text-center ${
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
                  <button
                    className="w-8 h-8 rounded-lg bg-[#2f2f2f] text-white flex items-center justify-center hover:bg-white/10"
                    onClick={() => {
                      onChange(
                        value.map((v) =>
                          v.materialId === item.materialId
                            ? { ...v, quantityUsed: v.quantityUsed + 1 }
                            : v
                        )
                      );
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onChange(
                      value.filter((v) => v.materialId !== item.materialId)
                    );
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10"
                >
                  <Trash size={18} className="text-red-500" />
                </button>
              </div>
              {isOverLimit && (
                <p className="text-red-500 text-xs mt-2">
                  Estoque insuficiente
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-[#2a2a2a] rounded-xl p-4 flex justify-between items-center my-6">
        <p className="text-gray-400 font-medium">Custo Total dos Materiais:</p>
        <p className="text-white font-bold text-xl">
          {formatCurrency(totalCost)}
        </p>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
          Materiais disponíveis ({availableMaterials.length})
        </p>

        <div className="grid grid-cols-2 gap-3">
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
                className="bg-[#3d3d3d] rounded-xl p-4 border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  />
                  <span className="text-white text-sm font-medium">
                    {material.name}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-1">
                  {formatCurrency(material.costPerUnit)} / {config?.suffix}
                </p>
                <p className="text-gray-400 text-xs mb-3">
                  {material.quantity} {config?.suffix} disponíveis
                </p>

                <button
                  className="w-full py-2 text-blue-400 text-sm bg-blue-400/10 rounded-lg hover:bg-blue-400/20"
                  onClick={() => {
                    onChange([
                      ...value,
                      { materialId: material.id, quantityUsed: 1 },
                    ]);
                  }}
                >
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
