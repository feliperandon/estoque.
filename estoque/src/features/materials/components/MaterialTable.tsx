import { Pen, Trash } from "lucide-react";
import type { Material } from "../types/materials";

import { formatCurrency } from "@/lib/formatCurrency";
import type { MaterialCategory } from "../types/materialCategory";

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
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Material</th>
          <th scope="col">Categoria</th>
          <th scope="col">Qtd</th>
          <th scope="col">Valor Unit.</th>
          <th scope="col">Total</th>
          <th scope="col">Ações</th>
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
            <tr key={material.id}>
              <td>{material.name}</td>
              <td>
                <Badge color={color}>{category?.name}</Badge>
              </td>
              <td>
                {material.quantity} {suffix}
              </td>

              <td>{formatCurrency(material.costPerUnit)}</td>
              <td>
                {formatCurrency(material.quantity * material.costPerUnit)}
              </td>
              <td>
                <div>
                  <button>
                    <Pen onClick={() => onEdit(material)} />
                  </button>
                  <button>
                    <Trash onClick={() => onRemove(material.id)} />
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
