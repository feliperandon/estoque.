import type { UnitType } from "../constants/UnitType";

export const UNIT_TYPE_CONFIG: Record<
  UnitType,
  {
    label: string;
    suffix: string;
    allowsDecimal: boolean;
    color: string;
  }
> = {
  metro: {
    label: "Metro",
    suffix: "m",
    allowsDecimal: true,
    color: "#22c55e",
  },
  unidade: {
    label: "Unidade",
    suffix: "un",
    allowsDecimal: false,
    color: "#3b82f6",
  },
  grama: {
    label: "Grama",
    suffix: "g",
    allowsDecimal: true,
    color: "#f97316",
  },
  mililitro: {
    label: "Mililitro",
    suffix: "ml",
    allowsDecimal: true,
    color: "#a855f7",
  },
};
