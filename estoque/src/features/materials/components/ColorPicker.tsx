const COLORS = [
  "#22c55e", // verde
  "#3b82f6", // azul
  "#a855f7", // roxo
  "#f97316", // laranja
  "#ef4444", // vermelho
  "#ec4899", // rosa
  "#06b6d4", // ciano
  "#eab308", // amarelo
];

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex gap-1">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`w-6 h-6 rounded-full cursor-pointer ${
            value === color
              ? "ring-2 ring-white ring-offset-2 ring-offset-[#3d3d3d]"
              : ""
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
