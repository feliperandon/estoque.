import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-20 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
