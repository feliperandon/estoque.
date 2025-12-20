import { z } from "zod";

export const moneySchema = z.preprocess((value) => {
  if (typeof value === "string") {
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    return isNaN(parsed) ? undefined : parsed;
  }
  if (typeof value === "number") {
    return value;
  }

  return undefined;
}, z.number().min(0, "O valor deve ser maior ou igual a 0"));
