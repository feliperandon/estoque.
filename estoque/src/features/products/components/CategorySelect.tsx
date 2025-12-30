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
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="
           bg-[#2f2f2f] border border-gray-300 rounded-lg 
            shadow-xl p-3 w-64
         text-white/70 z-50

        text-sm
        "
          side="bottom"
          align="start"
          avoidCollisions={false}
        >
          <ul className="flex flex-col gap-2">
            {options.map((option, index) => {
              const checked = value.includes(option);
              const id = `category-${option}-${index}`;

              return (
                <li
                  key={id}
                  className="flex items-center gap-3 px-2 py-1.5
    rounded-md cursor-pointer justify-between hover:bg-white/10 "
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
    px-2 py-1.5  text-sm text-white border my-3
    cursor-pointer hover:bg-white/10 rounded-md
  "
            >
              + Adicionar nova categoria
            </button>
          )}
          {isCreating && (
            <div className="mt-3 flex flex-col gap-2">
              <input
                type="text"
                className="w-full px-2 py-1 rounded border border-gray-300 outline-none"
                value={newCategory}
                onChange={handleInput}
                onKeyDown={(e) => e.key === "Enter" && handleNewCategory()}
                placeholder="Nova categoria"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md cursor-pointer"
                  onClick={handleNewCategory}
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  className="cursor-pointer bg-[#3d3d3d] text-white rounded px-2 py-1"
                  onClick={() => {
                    setNewCategory("");
                    setIsCreating(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CategorySelect;
