import { cn } from "@/lib/cn";

type Variant = "primary" | "cancel" | "ghost";

type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
};

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "font-medium rounded-md transition cursor-pointer outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    cancel: "bg-[#3d3d3d] text-white hover:bg-[#3d3d3d]/60",
    ghost: "text-gray-800 hover:bg-gray-100",
  };

  const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
