import { Button, FormField, Input, Select } from "@/components/ui/";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";

const Products = () => {
  const [categoria, setCategoria] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

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
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <Button variant="primary">Adicionar Produto</Button>
        </Modal.Trigger>

        <Modal.Content
          title="Adicionar Produto"
          description="Crie um novo produto"
        >
          <div className="text-black">Conteúdo do formulário vai aqui</div>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default Products;
