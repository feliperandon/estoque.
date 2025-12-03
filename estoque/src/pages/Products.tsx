import { FormField } from "@/components/ui/FormField";
import Input from "@/components/ui/Input";

const Products = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <p className="text-sm text-gray-600">Gerencie seus produtos.</p>
      <FormField label="Nome">
        <Input placeholder="Digite algo..." />
      </FormField>
    </div>
  );
};

export default Products;
