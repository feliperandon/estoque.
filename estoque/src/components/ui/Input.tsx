import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full h-10 px-3 rounded-md bg-[#3d3d3d] text-sm placeholder:text-white/70 text-white/70 outline-none focus:ring-1",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
