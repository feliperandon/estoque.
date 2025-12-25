import { Pen, Trash } from "lucide-react";

import type { Material } from "../types/materials";
import type { MaterialCategory } from "../types/materialCategory";

import { formatCurrency } from "@/lib/formatCurrency";

import { UNIT_TYPE_CONFIG } from "../config/unitTypeConfig";

import Badge from "@/components/ui/Badge";

type MaterialTableProps = {
  materials: Material[];
  onEdit: (material: Material) => void;
  onRemove: (materialId: string) => void;
  categories: MaterialCategory[];
};

const MaterialTable = ({
  materials,
  onEdit,
  onRemove,
  categories,
}: MaterialTableProps) => {
  const thClass = "py-5 px-6 text-white text-md font-medium";
  const tdClass = "py-4 px-6 text-gray-200 text-sm";
  return (
    <table className="w-full bg-[#3a3a3a] rounded-2xl text-left table-fixed">
      <thead className="">
        <tr>
          <th scope="col" className={`${thClass} w-[25%]`}>
            Material
          </th>
          <th scope="col" className={`${thClass} w-[15%]`}>
            Categoria
          </th>
          <th scope="col" className={`${thClass} w-[10%]`}>
            Qtd
          </th>
          <th scope="col" className={`${thClass} w-[15%]`}>
            Valor Unit.
          </th>
          <th scope="col" className={`${thClass} w-[15%]`}>
            Total
          </th>
          <th scope="col" className={`${thClass} w-[10%]`}>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => {
          const category = categories?.find(
            (cat) => cat.id === material.categoryId
          );
          const suffix = category
            ? UNIT_TYPE_CONFIG[category.unitType].suffix
            : "";

          const color = category
            ? UNIT_TYPE_CONFIG[category.unitType].color
            : "";

          return (
            <tr
              key={material.id}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <td className={tdClass}>{material.name}</td>
              <td className={tdClass}>
                <Badge color={color}>{category?.name}</Badge>
              </td>
              <td className={tdClass}>
                {material.quantity} {suffix}
              </td>

              <td className={tdClass}>
                {formatCurrency(material.costPerUnit)}
              </td>
              <td className={tdClass}>
                {formatCurrency(material.quantity * material.costPerUnit)}
              </td>
              <td className={tdClass}>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(material)}>
                    <Pen
                      size={18}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    />
                  </button>
                  <button onClick={() => onRemove(material.id)}>
                    <Trash
                      size={18}
                      className="text-red-700 hover:text-red-400 cursor-pointer"
                    />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MaterialTable;
