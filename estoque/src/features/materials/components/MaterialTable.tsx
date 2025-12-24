import { Pen, Trash } from "lucide-react";
import type { Material } from "../types/materials";

import { formatCurrency } from "@/lib/formatCurrency";
import type { MaterialCategory } from "../types/materialCategory";

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
          <th scope="col">Unidade</th>
          <th scope="col">Valor unitário</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => {
          const category = categories?.find(
            (cat) => cat.id === material.categoryId
          );

          return (
            <tr key={material.id}>
              <td>{material.name}</td>
              <td>{category?.unitType}</td>
              <td>{formatCurrency(material.costPerUnit)}</td>
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
