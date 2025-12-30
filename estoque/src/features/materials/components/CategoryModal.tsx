import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui";

import ColorPicker from "./ColorPicker";

import { useMaterialCategoryStore } from "../hooks/useMaterialCategoryStore";

import { Pen, Trash } from "lucide-react";

import { UNIT_TYPE_CONFIG } from "../config/unitTypeConfig";
import type { UnitType } from "../constants/UnitType";

import { useState } from "react";
import type { MaterialCategory } from "../types/materialCategory";

type CategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CategoryModal = ({ open, onOpenChange }: CategoryModalProps) => {
  const categories = useMaterialCategoryStore(
    (state) => state.materialCategories
  );

  const addMaterialCategory = useMaterialCategoryStore(
    (state) => state.addMaterialCategory
  );

  const removeMaterialCategory = useMaterialCategoryStore(
    (state) => state.removeMaterialCategory
  );

  const updateMaterialCategory = useMaterialCategoryStore(
    (state) => state.updateMaterialCategory
  );

  const [name, setName] = useState("");
  const [unitType, setUnitType] = useState("");
  const [color, setColor] = useState("#22c55e");

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!name.trim() || !unitType) return;

    if (editingId) {
      updateMaterialCategory(editingId, {
        name: name.trim(),
        unitType: unitType as UnitType,
        color,
      });
      setEditingId(null);
    } else {
      addMaterialCategory({
        id: crypto.randomUUID(),
        name: name.trim(),
        unitType: unitType as UnitType,
        color,
      });
    }

    setName("");
    setColor("#22c55e");
    setUnitType("");
  };

  const handleEditCategory = (category: MaterialCategory) => {
    setEditingId(category.id);
    setName(category.name);
    setUnitType(category.unitType);
    setColor(category.color);
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content title="Categorias">
        <div className="flex gap-2 mb-4 pb-4 border-b border-white/10 items-center">
          <input
            type="text"
            placeholder="Nome da categoria"
            className="flex-1 h-10 px-3 rounded-md bg-[#3d3d3d] text-white placeholder-gray-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="h-10 px-3 rounded-md bg-[#3d3d3d] text-white outline-none"
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
          >
            <option value="">Tipo</option>
            {Object.entries(UNIT_TYPE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
          <ColorPicker value={color} onChange={setColor} />
          <Button onClick={handleAddCategory}>
            {editingId ? "Salvar" : "Adicionar"}
          </Button>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between py-3 border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <span
                style={{ backgroundColor: category.color }}
                className="h-3 w-3 rounded-full"
              ></span>
              <span className="text-white">{category.name}</span>
              <span className="text-gray-400 text-sm">{category.unitType}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEditCategory(category)}>
                <Pen size={16} className="text-gray-400 hover:text-white" />
              </button>
              <button onClick={() => removeMaterialCategory(category.id)}>
                <Trash size={16} className="text-red-500 hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </Modal.Content>
    </Modal.Root>
  );
};

export default CategoryModal;
