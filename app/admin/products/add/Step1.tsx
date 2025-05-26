import { FloatingInput, FloatingSelect } from "./formControls";

type Step1Props = {
  formData: {
    name: string;
    price: string;
    stock: string;
    categoryId: string;
  };
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  categories: { _id: string; name: string; position?: string }[]; // 👈
};


export default function Step1({ formData, onChange, categories }: Step1Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FloatingInput
        id="name"
        label="Nom"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        placeholder=" "
      />
      <FloatingInput
        id="price"
        label="Prix (€)"
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={onChange}
        required
        placeholder=" "
      />
      <FloatingInput
        id="stock"
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={onChange}
        placeholder=" "
      />
      <FloatingSelect
        id="categoryId"
        label="Catégorie"
        name="categoryId"
        value={formData.categoryId}
        onChange={onChange}
        required
        options={[
          { value: "", label: "Choisir une catégorie" },
          ...categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          })),
        ]}
      />
    </div>
  );
}
