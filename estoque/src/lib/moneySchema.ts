import { z } from "zod";

export const moneySchema = z.preprocess(
  (value) => {
    if (typeof value === "string") {
      const normalized = value.replace(/\./g, "").replace(",", ".");
      const parsed = Number(normalized);
      return parsed;
    }

    if (typeof value === "number") {
      return value;
    }

    return NaN;
  },
  z
    .number({
      error: "Informe um valor válido",
    })
    .refine((value) => !isNaN(value), {
      message: "Informe um valor válido",
    })
    .min(0, "O valor deve ser maior ou igual a 0")
);
