import { cn } from "@/lib/cn";

type HeaderProps = {
  title: string;
  description: string;
  className?: string;
};

const Header = ({ title, description, className }: HeaderProps) => {
  return (
    <div className={cn("flex flex-col mb-6 py-6 pl-6 gap-1", className)}>
      <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default Header;
