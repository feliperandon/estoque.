type Variant = "primary" | "outline" | "ghost";

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
    "font-medium rounded-md transition outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-800 hover:bg-gray-100",
  };

  const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  const variantClass = variantClasses[variant ?? "primary"];
  const sizeClass = sizeClasses[size ?? "md"];

  const classes = `${baseClasses} ${variantClass} ${sizeClass} ${
    className ?? ""
  }`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
