import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";

import { CheckIcon, Trash } from "lucide-react";

import { useState } from "react";
import { useCategoriesStore } from "@/features/products/hooks/useCategoriesStore";

type CategorySelectProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  options?: string[];
};

const CategorySelect = ({
  value = [],
  onChange,
  options = [],
}: CategorySelectProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = useCategoriesStore((state) => state.addCategory);
  const removeCategory = useCategoriesStore((state) => state.removeCategory);

  const handleNewCategory = () => {
    if (!newCategory.trim()) return;
    addCategory(newCategory);

    onChange?.([...value, newCategory]);

    setNewCategory("");
    setIsCreating(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="
            w-full h-10 px-3 rounded-md 
            bg-[#3d3d3d]
            text-sm text-white/70
            flex items-center justify-between
            cursor-pointer
          "
        >
          {value.length === 0 ? "Selecione categorias" : value.join(", ")}
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={6}
        className="
           bg-white border border-gray-300 rounded-lg 
            shadow-xl p-3 w-64 
         text-gray-800 z-50
          animate-in fade-in-0 zoom-in-95
          min-w-(--radix-popover-trigger-width) text-sm
        "
      >
        <ul className="flex flex-col gap-2">
          {options.map((option, index) => {
            const checked = value.includes(option);
            const id = `category-${option}-${index}`;

            return (
              <li
                key={id}
                className="flex items-center gap-3 px-2 py-1.5
    rounded-md cursor-pointer justify-between
    hover:bg-gray-100 transition-colors"
              >
                <div className="flex gap-3 items-center">
                  <Checkbox.Root
                    id={id}
                    className=" w-4 h-4 rounded border border-gray-400 
    flex items-center justify-center
    data-[state=checked]:bg-blue-600
    data-[state=checked]:border-blue-600
    transition-colors"
                    checked={checked}
                    onCheckedChange={(state) => {
                      if (!onChange) return;
                      state === true
                        ? onChange([...value, option])
                        : onChange(value.filter((val) => val !== option));
                    }}
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>

                  <label htmlFor={id} className="select-none cursor-pointer">
                    {option}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeCategory(option);
                    onChange?.(value.filter((v) => v !== option));
                  }}
                >
                  <Trash className="h-4 w-4 text-red-700 cursor-pointer" />
                </button>
              </li>
            );
          })}
        </ul>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="
    px-2 py-1.5 mt-2 text-sm text-blue-600
    cursor-pointer hover:bg-gray-100 rounded-md
  "
          >
            + Adicionar nova categoria
          </button>
        )}
        {isCreating && (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              className="bg-white border border-gray-300"
              value={newCategory}
              onChange={handleInput}
              onKeyDown={(e) => e.key === "Enter" && handleNewCategory()}
            />
            <button
              type="button"
              className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md cursor-pointer"
              onClick={handleNewCategory}
            >
              Adicionar
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 rounded px-2 py-1"
              onClick={() => {
                setNewCategory("");
                setIsCreating(false);
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default CategorySelect;
