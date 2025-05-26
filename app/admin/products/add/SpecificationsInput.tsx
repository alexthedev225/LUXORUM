import { useState, useEffect } from "react";

type Specification = { key: string; value: string };

type Props = {
  onChange: (jsonValue: string) => void;
};

export default function SpecificationsInput({ onChange }: Props) {
  const [specs, setSpecs] = useState<Specification[]>([{ key: "", value: "" }]);

  // Met à jour le JSON dès que les specs changent
  useEffect(() => {
    const obj: Record<string, string> = {};
    specs.forEach(({ key, value }) => {
      if (key.trim()) obj[key] = value;
    });
    onChange(JSON.stringify(obj));
  }, [specs]);

  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    const updated = specs.filter((_, i) => i !== index);
    setSpecs(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium text-sm text-gray-700">
        Spécifications
      </label>
      {specs.map((spec, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Clé"
            value={spec.key}
            onChange={(e) => handleSpecChange(index, "key", e.target.value)}
            className="flex-1 rounded border px-2 py-1"
          />
          <input
            type="text"
            placeholder="Valeur"
            value={spec.value}
            onChange={(e) => handleSpecChange(index, "value", e.target.value)}
            className="flex-1 rounded border px-2 py-1"
          />
          <button
            type="button"
            onClick={() => removeSpec(index)}
            className="text-red-600 hover:underline"
          >
            Supprimer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSpec}
        className="text-sm text-amber-600 hover:underline"
      >
        + Ajouter une spécification
      </button>
    </div>
  );
}
