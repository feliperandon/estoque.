import type { UnitType } from "../constants/UnitType";

export type MaterialCategory = {
  id: string;
  name: string;
  unitType: UnitType;
  color: string;
};
