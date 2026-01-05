# Products

## Visão Geral

A feature Products gerencia o cadastro de produtos e sua associação com materiais cadastrados no estoque.

Principais Funcionalidades:

- CRUD de produtos
- Upload de imagem
- Associação de categorias (ex. moda, necessaire, bolsa, etc)
- Associação com materiais (com controle de estoque)
- Cálculo de custo baseado em materiais

## Estrutura de Arquivos

src/features/products

    components/
        ProductCard.tsx # Card de exibição do produto
        ProductForm.tsx # Formulário de criar/editar
        MaterialsDrawer.tsx # Drawer lateral para associar materiais
        CategorySelect.tsx # Select de categorias do produto
        ImageUpload.tsx # Upload de imagem do produto

    hooks/
        useProductStore.ts # Store de produtos (Zustand)
        useCategoryStore.ts # Store de categorais de produtos

    types/
        product.ts # Tipos e interfaces

    pages/
        Products.tsx # Página principal da listagem

## Tipos

```typescript
type Product = {
  id: string; // Identificador único (UUID)
  name: string; // Nome do produto
  quantity: number; // Quantidade em estoque
  price?: number; // Preço em venda
  description?: string; // Descrição do produto
  imageUrl?: string; // URL da imagem (blob local)
  timeSpent?: number; // Horas gastas na produção
  categories?: string[]; // ID das categorias associadas
  materials?: {
    materialId: string; // ID do material
    quantityUsed: number; // Quantidade consumida por unidade
  }[];
};
```

### Observações

- `materials` representa a receita do produto / Quais materiais e quantidades são necessários
- `categories` são categorias do produto (ex. "Necessaire", "Bolsas"), diferente das categorias dos materiais
- `imageUrl` usa `URL.createObjectURL()` para preview local (não persiste após refresh)

## Store (useProductStore)

Gerencia o estado global dos produtos usando Zustand

### Estado

```typescript
products: Product[] // Lista de todos os produtos
```

### Ações

Ação | Parâmetros | O que faz

- `addProduct` | `Product` | Adiciona um novo produto à lista
- `upadateProduct` | `id`, `Partial<Product>` | Atualiza campos de um produto existente
- `removeProduct` | `id` | Remove um produto da lista

### Exemplo de uso

```typescript
// Ler produto
const products = useProductsStore((state) => state.products);

// Adicionar
const addProduct = useProductsStore((state) => state.addProduct);
addProduct({ id: "123", name: "Camiseta", quantity: 10 });

// Atualizar
const updateProduct = useProductsStore((state) => state.updateProduct);
updateProduct("123", { price: 49.9 });

// Remover
const removeProduct = useProductsStore((state) => state.removeProduct);
removeProduct("123");
```

### Observações

- A store não gerencia consumo de estoque de materiais. Isso é feito no `useMaterialsStore`
- `updateProduct` usa `Partial<Product>`, permitindo atualizar apenas alguns campos
- Dados são perdidos ao atualizar a página (sem persistência ainda)

### Store (useCategoriesStore)

Gerencia as categorias de produtos (ex: "Necessaire", "Bolsas").

**Nota:** Diferente das categorias de materiais (`useMaterialCategoryStore`), estas são apenas para strings simples usadas para organizar produtos.

### Estado

```typescript
categories: string[] // Lista de nomes das categorias
```

### Ações

Ação | Parâmetros | O que faz

- `addCategory` | `name: string` | Adiciona uma nova categoria
- `removeCategory` | `name: string` | Remove uma categoria pelo nome

### Exemplo de uso

```typescript
// Ler categorias
const categorias = useCategoriesStore((state) => state.categories);

// Adicionar
const addCategory = useCategoriesStore((state) => state.addCategory);
addCategory("Acessórios");

// Remover
const removeCategory = useCategoriesStore((state) => state.removeCategory);
removeCategory("Eletrônicos");
```

### Observações

- Categorias são strings simples, sem ID ou metadados
- Não há `updateCategory` para renomear. Seria necessário remover e adicionar
- Diferente de `MaterialCategory`, que tem `id`, `color`, `unitType`

## Componentes

### MaterialDrawer

Drawer lateral para associar materiais ao produto.

**Props:**

```typescript
type MaterialDrawerProps = {
  value: { materialId: string; quantityUsed: number }[]; // Materiais selecionados
  onChange: (value) => void; // Callback ao confirmar
  originalMaterials?: { materialId: string; quantityUsed: number }[]; // Materiais originais (só que para edição)
};
```

**Estado Local:**

- `localValue` - cópia local dos materiais para edição "rascunho"
- Só salva no pai ao clicar "Confirmar materiais"
- Cancelar ou clicar fora descarta mudanças

**Handlers:**

Handler | O que faz

- `handleQuantityChange` | Atualiza quantidade (+, -, input)
- `handleAdd` | Adiciona material da lista
- `handleRemove` | Remove material da lista

**Função Auxiliar:**

- `getAvailableQuantity` | Calcula estoque disponível considerando o que o produto já usa

**Validações:**

- `overLimit` - verifica se algum material excede o estoque. Desabilita o botão
- `isOverLimit` - verifica por material individual. Card individual fica vermelho
- Botão de confirmar desabilita caso não houver material suficiente no estoque
- Quantidade arredondada para inteiro caso o `allowsDecimal: false`
