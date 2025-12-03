import { Select as SelectPrimitive } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: Option[];
};

const Select = ({ value, onChange, placeholder, options }: SelectProps) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger className="h-10 w-28 pl-3 border border-gray-300 flex items-center justify-between rounded-md bg-white focus:ring-2 focus:ring-blue-500/20 text-sm text-gray-800">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        position="popper"
        className="border border-gray-200 min-w-(--radix-select-trigger-width) shadow-md overflow-hidden bg-white rounded-md z-50 animate-in fade-in zoom-in-95"
      >
        <SelectPrimitive.Viewport className="p-1">
          {options.map((item) => (
            <SelectPrimitive.Item
              value={item.value}
              className="px-3 py-2 w-full flex items-center gap-2 bg-gray-100 text-sm text-gray-800 rounded-sm cursor-pointer hover:bg-gray-200 outline-none"
            >
              <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
              </SelectPrimitive.ItemIndicator>
              <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;
