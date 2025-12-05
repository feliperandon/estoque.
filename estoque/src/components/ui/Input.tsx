import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  const base =
    "h-10 px-3 rounded-md border border-gray-300 bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500/20 " +
    "focus:border-blue-500 text-sm placeholder:text-gray-400 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";
  return <input className={cn(base, className)} {...props} />;
};

export default Input;
