type BadgeProps = {
  children: React.ReactNode;
  color: string;
};

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className="text-sm px-2 py-1 rounded-3xl text-white font-medium"
    >
      {children}
    </span>
  );
};

export default Badge;
