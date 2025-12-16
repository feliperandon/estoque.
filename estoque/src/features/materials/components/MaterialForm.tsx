import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Material } from "../types/materials";

import { useEffect } from "react";

import { useMaterialsStore } from "../hooks/useMaterialsStore";

import { Button, FormField, Input, Textarea } from "@/components/ui";

const materialSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  unit: z.string().min(1, "A unidade é obrigatória"),
  costPerUnit: z.coerce.number().min(0, "O valor unitário mínimo é 0"),
  description: z.string().optional(),
});

type MaterialFormProps = {
  onSubmitSuccess: () => void;
  initialData?: Material | null;
};

const MaterialForm = ({ onSubmitSuccess, initialData }: MaterialFormProps) => {
  const form = useForm({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: "",
      unit: "",
      costPerUnit: 0,
      description: "",
    },
  });

  useEffect(() => {
    initialData
      ? form.reset(initialData)
      : form.reset({
          name: "",
          unit: "",
          costPerUnit: 0,
          description: "",
        });
  }, [initialData]);

  const addMaterial = useMaterialsStore((state) => state.addMaterial);
  const updateMaterial = useMaterialsStore((state) => state.updateMaterial);

  const onSubmit = (data: z.infer<typeof materialSchema>) => {
    initialData
      ? updateMaterial(initialData.id, data)
      : addMaterial({
          id: crypto.randomUUID(),
          name: data.name,
          unit: data.unit,
          costPerUnit: data.costPerUnit,
          description: data.description,
        });
    onSubmitSuccess();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <FormField label="Título" error={form.formState.errors.name?.message}>
          <Input {...form.register("name")} />
        </FormField>
      </div>

      <div className="flex flex-col gap-4 pr-2">
        <FormField label="Unidade" error={form.formState.errors.unit?.message}>
          <Input type="text" {...form.register("unit")} />
        </FormField>
      </div>
      <div className="flex flex-col gap-4 pr-2">
        <FormField
          label="Custo por unidade"
          error={form.formState.errors.costPerUnit?.message}
        >
          <Input type="number" {...form.register("costPerUnit")} />
        </FormField>
      </div>
      <div className="flex flex-col gap-4 pr-2">
        <FormField
          label="Descrição"
          error={form.formState.errors.description?.message}
        >
          <Textarea rows={4} {...form.register("description")} />
        </FormField>
      </div>
      <Button type="submit" className="mt-4 w-full">
        Salvar
      </Button>
    </form>
  );
};

export default MaterialForm;
