import { useState, useEffect } from "react";

import { Trash } from "lucide-react";

import { Drawer } from "@/components/ui/Drawer";

import { useCategoriesStore } from "../hooks/useCategoriesStore";

type CategoryDrawerProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const CategoryDrawer = ({ value, onChange }: CategoryDrawerProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const categories = useCategoriesStore((state) => state.categories);
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const removeCategory = useCategoriesStore((state) => state.removeCategory);

  const selectedCategories = localValue;
  const availableCategories = categories.filter(
    (cat) => !localValue.includes(cat)
  );

  const handleCreate = () => {
    if (!newCategory.trim()) return;
    addCategory(newCategory);
    setLocalValue([...localValue, newCategory]);
    setNewCategory("");
    setIsCreating(false);
  };

  const handleAdd = (category: string) => {
    setLocalValue([...localValue, category]);
  };

  const handleRemove = (category: string) => {
    setLocalValue(localValue.filter((c) => c !== category));
  };

  const handleDelete = (category: string) => {
    removeCategory(category);
    setLocalValue(localValue.filter((c) => c !== category));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold">
            Selecionar Categorias
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Escolha as categorias deste produto.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
            Categorias Selecionadas ({selectedCategories.length})
          </p>

          {selectedCategories.map((category) => (
            <div
              key={category}
              className="bg-[#3d3d3d] rounded-lg p-3 mb-2 border border-white/5 flex justify-between items-center"
            >
              <span className="text-white text-sm">{category}</span>
              <button
                onClick={() => handleRemove(category)}
                className="p-1 rounded hover:bg-red-500/10 cursor-pointer"
              >
                <Trash size={14} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
            Categorias Disponíveis ({availableCategories.length})
          </p>

          <div className="grid grid-cols-2 gap-3">
            {availableCategories.map((category) => (
              <div
                key={category}
                className="bg-[#3d3d3d] rounded-xl p-4 border border-white/5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">
                    {category}
                  </span>
                  <button
                    onClick={() => handleDelete(category)}
                    className="p-1 rounded hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash size={14} className="text-red-500" />
                  </button>
                </div>

                <button
                  className="w-full py-2 text-blue-400 text-sm bg-blue-400/10 rounded-lg hover:bg-blue-400/20 mt-3 cursor-pointer"
                  onClick={() => handleAdd(category)}
                >
                  + Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer"
            >
              + Criar nova categoria
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Nome da categoria"
                className="w-full h-10 px-3 rounded-md bg-[#3d3d3d] text-sm text-white border border-white/10"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewCategory("");
                  }}
                  className="flex-1 py-2 bg-[#3d3d3d] text-white text-sm rounded-lg cursor-pointer hover:bg-[#4a4a4a]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <Drawer.Close asChild>
          <button
            className="w-full py-3 bg-white text-black rounded-lg font-medium cursor-pointer hover:bg-gray-100"
            onClick={() => onChange(localValue)}
          >
            Confirmar Categorias
          </button>
        </Drawer.Close>
        <Drawer.Close asChild>
          <button className="w-full py-3 bg-transparent border border-white/20 text-white rounded-lg cursor-pointer">
            Cancelar
          </button>
        </Drawer.Close>
      </div>
    </div>
  );
};

export default CategoryDrawer;
