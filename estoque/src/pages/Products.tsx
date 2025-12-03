import { FormField, Input, Select } from "@/components/ui/";
import { useState } from "react";

const Products = () => {
  const [categoria, setCategoria] = useState<string | undefined>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <p className="text-sm text-gray-600">Gerencie seus produtos.</p>
      <FormField>
        <Input placeholder="Digite algo..." />
      </FormField>
      <FormField label="Categoria">
        <Select
          value={categoria}
          onChange={setCategoria}
          placeholder="Categoria"
          options={[
            { value: "tecido", label: "Tecido" },
            { value: "linha", label: "Linha" },
            { value: "botao", label: "Botao" },
          ]}
        />
      </FormField>
    </div>
  );
};

export default Products;
