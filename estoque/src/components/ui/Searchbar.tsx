import { Search } from "lucide-react";

import Input from "./Input";

import { cn } from "@/lib/cn";

type SearchBarProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
};

const Searchbar = ({
  value,
  onChange,
  placeholder = "Buscar produtos...",
  className,
}: SearchBarProps) => {
  return (
    <div className={cn("relative w-[380px]", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 bg-[#3A3A3A] border-[#505050] text-gray-100 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Searchbar;
