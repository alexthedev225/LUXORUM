import SpecificationsInput from "./SpecificationsInput";
import { FloatingTextarea } from "./formControls";

type Step2Props = {
  formData: {
    description: string;
    detailedDescription: string;
    specifications: string;
  };
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onSpecsChange: (json: string) => void;
};


export default function Step2({
  formData,
  onChange,
  onSpecsChange,
}: Step2Props) {
  return (
    <div className="space-y-8">
      <FloatingTextarea
        id="description"
        label="Description courte"
        name="description"
        value={formData.description}
        onChange={onChange}
        required
        placeholder=" "
        rows={3}
      />
      <FloatingTextarea
        id="detailedDescription"
        label="Description détaillée"
        name="detailedDescription"
        value={formData.detailedDescription}
        onChange={onChange}
        placeholder=" "
        rows={5}
      />
      <SpecificationsInput onChange={onSpecsChange} />
    </div>
  );
}
