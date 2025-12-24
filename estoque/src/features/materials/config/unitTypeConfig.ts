import type { UnitType } from "../constants/UnitType";

export const UNIT_TYPE_CONFIG: Record<
  UnitType,
  {
    label: string;
    suffix: string;
    allowsDecimal: boolean;
  }
> = {
  metro: {
    label: "Metro",
    suffix: "m",
    allowsDecimal: true,
  },
  unidade: {
    label: "Unidade",
    suffix: "u",
    allowsDecimal: false,
  },
  grama: {
    label: "Grama",
    suffix: "g",
    allowsDecimal: true,
  },
  mililitro: {
    label: "Mililitro",
    suffix: "ml",
    allowsDecimal: true,
  },
};
