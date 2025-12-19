import { Pen, Trash } from "lucide-react";
import type { Material } from "../types/materials";

type MaterialTableProps = {
  materials: Material[];
  onEdit: (material: Material) => void;
  onRemove: (materialId: string) => void;
};

const MaterialTable = ({ materials, onEdit, onRemove }: MaterialTableProps) => {
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
        {materials.map((material) => (
          <tr key={material.id}>
            <td>{material.name}</td>
            <td>{material.unit}</td>
            <td>{material.costPerUnit}</td>
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
        ))}
      </tbody>
    </table>
  );
};

export default MaterialTable;
