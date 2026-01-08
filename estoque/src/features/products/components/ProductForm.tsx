import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProductsStore } from "../hooks/useProductsStore";
import { useCategoriesStore } from "../hooks/useCategoriesStore";

import { useMaterialsStore } from "@/features/materials/hooks/useMaterialsStore";

import { Input, Button, FormField, Textarea } from "@/components/ui";
import { Drawer } from "@/components/ui/Drawer";

import ImageUpload from "./ImageUpload";
import MaterialsDrawer from "./MaterialsDrawer";
import CategoryDrawer from "./CategoryDrawer";

import type { Product } from "../types/product";

import { moneySchema } from "@/lib/moneySchema";

import { useEffect } from "react";

import { Package } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  quantity: z.coerce.number().min(1, "A quantidade mínima é 1"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: moneySchema,
  timeSpent: z.coerce.number().min(0).optional(),
  categories: z.array(z.string()).optional(),
  materials: z
    .array(z.object({ materialId: z.string(), quantityUsed: z.number() }))
    .optional(),
});

type ProductFormProps = {
  onSubmitSuccess: () => void;
  initialData?: Product | null;
};

const defaultValues: z.infer<typeof productSchema> = {
  name: "",
  quantity: 1,
  imageUrl: "",
  description: "",
  price: 0,
  timeSpent: 0,
  categories: [],
  materials: [],
};

const ProductForm = ({ onSubmitSuccess, initialData }: ProductFormProps) => {
  const consumeStock = useMaterialsStore((state) => state.consumeStock);
  const restoreStock = useMaterialsStore((state) => state.restoreStock);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!initialData) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      ...initialData,
      categories: initialData.categories ?? [],
      materials: initialData.materials ?? [],
    });
  }, [initialData, form]);

  const { setValue } = form;

  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);

  const calculateCost = (
    materials: { materialId: string; quantityUsed: number }[]
  ) => {
    const allMaterials = useMaterialsStore.getState().materials;

    return materials.reduce((total, item) => {
      const material = allMaterials.find((m) => m.id === item.materialId);
      if (!material) return total;
      return total + item.quantityUsed * material.costPerUnit;
    }, 0);
  };

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    if (initialData) {
      if (initialData.materials && initialData.materials.length > 0) {
        restoreStock(initialData.materials);
      }
      if (data.materials && data.materials.length > 0) {
        consumeStock(data.materials);
      }
      updateProduct(initialData.id, {
        ...data,
        cost: calculateCost(data.materials || []),
      });
    } else {
      addProduct({
        id: crypto.randomUUID(),
        name: data.name,
        quantity: data.quantity,
        imageUrl: data.imageUrl,
        price: data.price,
        cost: calculateCost(data.materials || []),
        timeSpent: data.timeSpent,
        description: data.description,
        categories: data.categories || [],
        materials: data.materials || [],
      });

      if (data.materials && data.materials.length > 0) {
        consumeStock(data.materials);
      }
    }

    onSubmitSuccess();
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_auto_1fr] gap-3">
          <div className="flex flex-col gap-4">
            <FormField>
              <ImageUpload
                onChangeFile={(file) => {
                  if (!file) {
                    setValue("imageUrl", "");
                    return;
                  }

                  const url = URL.createObjectURL(file);
                  setValue("imageUrl", url);
                }}
                value={form.watch("imageUrl")}
              />
            </FormField>

            <FormField
              label="Título"
              error={form.formState.errors.name?.message}
            >
              <Input {...form.register("name")} />
            </FormField>

            <FormField
              label="Descrição"
              error={form.formState.errors.description?.message}
            >
              <Textarea
                rows={8}
                className="resize-none"
                {...form.register("description")}
              />
            </FormField>
          </div>

          <div className="hidden md:flex items-stretch px-1">
            <div className="w-px bg-white/10 h-full" />
          </div>

          <div className="flex flex-col gap-4 pr-2 min-w-0">
            <FormField
              label="Quantidade"
              error={form.formState.errors.quantity?.message}
            >
              <Input type="number" {...form.register("quantity")} />
            </FormField>

            <FormField label="Categorias">
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <button className="w-full max-w-full h-10 px-3 rounded-md bg-[#3d3d3d] text-sm text-white/70 flex items-center gap-2 hover:bg-[#4a4a4a]">
                    <span className="truncate">
                      {(form.watch("categories") || []).length === 0
                        ? "Selecionar Categorias"
                        : (form.watch("categories") || []).join(", ")}
                    </span>
                  </button>
                </Drawer.Trigger>
                <Drawer.Content>
                  <CategoryDrawer
                    value={form.watch("categories") || []}
                    onChange={(newValue) => setValue("categories", newValue)}
                  />
                </Drawer.Content>
              </Drawer.Root>
            </FormField>
            <FormField label="Materiais">
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <button className="w-full h-10 px-3 rounded-md bg-[#3d3d3d] text-sm text-white/70 flex items-center gap-2 hover:bg-[#4a4a4a]">
                    <Package size={16} />
                    Gerenciar Materiais
                  </button>
                </Drawer.Trigger>
                <Drawer.Content>
                  <MaterialsDrawer
                    value={form.watch("materials") || []}
                    onChange={(newValue) => setValue("materials", newValue)}
                    originalMaterials={initialData?.materials || []}
                  />
                </Drawer.Content>
              </Drawer.Root>
            </FormField>

            <FormField
              label="Horas gastas"
              error={form.formState.errors.timeSpent?.message}
            >
              <Input type="number" {...form.register("timeSpent")} />
            </FormField>

            <FormField
              label="Preço"
              error={form.formState.errors.price?.message}
            >
              <Input type="text" {...form.register("price")} />
            </FormField>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-white/10">
          <Button type="button" variant="cancel" onClick={onSubmitSuccess}>
            Cancelar
          </Button>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
