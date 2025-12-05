import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "shadow" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
};

const Card = ({
  children,
  variant = "default",
  padding = "none",
  className,
}: CardProps) => {
  const baseClasses =
    "bg-white rounded-md border border-gray-200 text-gray-900";

  const variantClasses = {
    default: "bg-white border border-gray-200 shadow-sm",
    shadow: "bg-white shadow-md border-0",
    outline: "bg-white border border-gray-300 shadow-none",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
