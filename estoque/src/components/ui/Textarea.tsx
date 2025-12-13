import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-20 rounded-md px-3 py-2 text-sm text-white/70 bg-[#3d3d3d] placeholder:text-white/70 outline-none focus:ring-1",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
