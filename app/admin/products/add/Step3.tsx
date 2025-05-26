type Step3Props = {
  formData: {
    images: FileList | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      images: FileList | null;
    }>
  >;
};

export default function Step3({ formData, setFormData }: Step3Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <label htmlFor="images" className="text-white font-semibold mb-2">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
              ...prev,
              images: e.target.files,
            }));
          }}
          className="..."
        />
      </div>
    </div>
  );
}
