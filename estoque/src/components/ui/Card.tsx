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
    "rounded-xl bg-[#2F2F2F] border border-[#3A3A3A] text-white";

  const variantClasses = {
    default: "shadow-sm",
    shadow: "shadow-lg",
    outline: "border border-[#4A4A4A]",
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
