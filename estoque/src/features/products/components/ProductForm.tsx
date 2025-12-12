import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProductsStore } from "../hooks/useProductsStore";
import { useCategoriesStore } from "../hooks/useCategoriesStore";

import {
  Input,
  Button,
  FormField,
  Textarea,
  ImageUpload,
  CategorySelect,
} from "@/components/ui";

import type { Product } from "../types/product";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  quantity: z.coerce.number().min(1, "A quantidade mínima é 1"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  timeSpent: z.coerce.number().min(0).optional(),
  categories: z.array(z.string()).optional(),
});

type ProductFormProps = {
  onSubmitSuccess: () => void;
  initialData?: Product | null;
};

const ProductForm = ({ onSubmitSuccess, initialData }: ProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      imageUrl: "",
      description: "",
      price: 0,
      timeSpent: 0,
      categories: [],
    },
  });

  useEffect(() => {
    initialData
      ? form.reset(initialData)
      : form.reset({
          name: "",
          quantity: 1,
          imageUrl: "",
          description: "",
          price: 0,
          timeSpent: 0,
          categories: [],
        });
  }, [initialData]);

  const { setValue } = form;

  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);

  const categories = useCategoriesStore((state) => state.categories);

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    initialData
      ? updateProduct(initialData.id, data)
      : addProduct({
          id: crypto.randomUUID(),
          name: data.name,
          quantity: data.quantity,
          imageUrl: data.imageUrl,
          price: data.price,
          timeSpent: data.timeSpent,
          description: data.description,
          categories: data.categories || [],
        });
    onSubmitSuccess();
    form.reset({
      name: "",
      quantity: 1,
      imageUrl: "",
      description: "",
      price: 0,
      timeSpent: 0,
      categories: [],
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField>
        <ImageUpload
          onChangeFile={(file) => {
            if (!file) {
              setValue("imageUrl", "");
              return;
            }

            const url = URL.createObjectURL(file);
            setValue("imageUrl", url);
            form.watch("imageUrl");
          }}
        />
      </FormField>

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

      <FormField label="Categorias">
        <CategorySelect
          options={categories}
          value={form.watch("categories") || []}
          onChange={(newValue) => {
            setValue("categories", newValue);
          }}
        />
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
