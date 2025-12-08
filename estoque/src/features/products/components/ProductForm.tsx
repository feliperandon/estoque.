import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProductsStore } from "../hooks/useProductsStore";

import { Input, Button, FormField, Textarea } from "@/components/ui";

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  quantity: z.coerce.number().min(1, "A quantidade mínima é 1"),
  description: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  timeSpent: z.coerce.number().min(0).optional(),
});

type ProductFormProps = {
  onSubmitSuccess: () => void;
};

const ProductForm = ({ onSubmitSuccess }: ProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      description: "",
      price: 0,
      timeSpent: 0,
    },
  });

  const addProduct = useProductsStore((state) => state.addProduct);

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    addProduct({
      id: crypto.randomUUID(),
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      timeSpent: data.timeSpent,
      description: data.description,
    });
    onSubmitSuccess();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Nome" error={form.formState.errors.name?.message}>
        <Input {...form.register("name")} />
      </FormField>
      <FormField
        label="Descrição"
        error={form.formState.errors.description?.message}
      >
        <Textarea rows={4} {...form.register("description")} />
      </FormField>

      <FormField
        label="Quantidade"
        error={form.formState.errors.quantity?.message}
      >
        <Input type="number" {...form.register("quantity")} />
      </FormField>
      <FormField label="Preço" error={form.formState.errors.price?.message}>
        <Input {...form.register("price")} />
      </FormField>
      <FormField
        label="Horas gastas"
        error={form.formState.errors.timeSpent?.message}
      >
        <Input type="number" {...form.register("timeSpent")} />
      </FormField>

      <Button type="submit">Salvar</Button>
    </form>
  );
};

export default ProductForm;
