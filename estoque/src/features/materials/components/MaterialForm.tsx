import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Material } from "../types/materials";

import { useEffect } from "react";

import { useMaterialsStore } from "../hooks/useMaterialsStore";

import { Button, FormField, Input, Textarea } from "@/components/ui";

import { useMaterialCategoryStore } from "../hooks/useMaterialCategoryStore";
import { UNIT_TYPE_CONFIG } from "../config/unitTypeConfig";

import { formatCurrency } from "@/lib/formatCurrency";
import { moneySchema } from "@/lib/moneySchema";

type MaterialFormProps = {
  onSubmitSuccess: () => void;
  initialData?: Material | null;
};

const MaterialForm = ({ onSubmitSuccess, initialData }: MaterialFormProps) => {
  const categories = useMaterialCategoryStore(
    (state) => state.materialCategories
  );

  const materialSchema = z
    .object({
      name: z.string().min(1, "O nome é obrigatório"),
      categoryId: z.string().min(1, "Selecione uma categoria"),
      costPerUnit: moneySchema,
      quantity: z.coerce.number(),
      description: z.string().optional(),
    })
    .refine(
      (data) => {
        const category = categories.find((cat) => cat.id === data.categoryId);

        if (!category) return true;

        const unitType = category.unitType;

        const config = UNIT_TYPE_CONFIG[unitType];

        if (!config.allowsDecimal) {
          return Number.isInteger(data.quantity);
        }

        return true;
      },
      {
        message:
          "A quantidade precisa ser um número inteiro para essa categoria",
        path: ["quantity"],
      }
    );

  const defaultValues: z.infer<typeof materialSchema> = {
    name: "",
    categoryId: "",
    costPerUnit: 0,
    quantity: 0,
    description: "",
  };

  const form = useForm({
    resolver: zodResolver(materialSchema),
    defaultValues,
  });

  useEffect(() => {
    initialData ? form.reset(initialData) : form.reset(defaultValues);
  }, [initialData, form]);

  const addMaterial = useMaterialsStore((state) => state.addMaterial);
  const updateMaterial = useMaterialsStore((state) => state.updateMaterial);

  const onSubmit = (data: z.infer<typeof materialSchema>) => {
    const material: Material = {
      id: initialData?.id ?? crypto.randomUUID(),
      name: data.name,
      categoryId: data.categoryId,
      costPerUnit: data.costPerUnit,
      quantity: data.quantity,
      description: data.description,
    };

    initialData ? updateMaterial(material.id, material) : addMaterial(material);

    onSubmitSuccess();
  };

  const quantity = form.watch("quantity") || 0;
  const costPerUnit = form.watch("costPerUnit") || 0;

  const parsedCost =
    typeof costPerUnit === "string"
      ? Number(costPerUnit.replace(",", "."))
      : Number(costPerUnit);

  const total = Number(quantity) * (isNaN(parsedCost) ? 0 : parsedCost);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FormField label="Nome" error={form.formState.errors.name?.message}>
        <Input {...form.register("name")} />
      </FormField>

      <FormField
        label="Categoria"
        error={form.formState.errors.categoryId?.message}
      >
        <select
          id="categoryId"
          {...form.register("categoryId")}
          className="h-10 rounded-md bg-[#3d3d3d] px-3 text-white w-full"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Quantidade"
          error={form.formState.errors.quantity?.message}
        >
          <Input type="number" step="0.01" {...form.register("quantity")} />
        </FormField>

        <FormField
          label="Custo por unidade"
          error={form.formState.errors.costPerUnit?.message}
        >
          <Input type="text" {...form.register("costPerUnit")} />
        </FormField>
      </div>

      <div className="border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <span className="text-gray-400">Valor total em estoque: </span>
        <span className="text-white font-medium">{formatCurrency(total)}</span>
      </div>
      <FormField
        label="Descrição"
        error={form.formState.errors.description?.message}
      >
        <Textarea rows={4} {...form.register("description")} />
      </FormField>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="cancel" onClick={onSubmitSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default MaterialForm;
