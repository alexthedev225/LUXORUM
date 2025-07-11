import { HeroBoutiqueSection } from "@/components/sections/boutique/HeroBoutiqueSection";
import ProductGridWrapper from "@/components/sections/boutique/ProductGridWrapper";

export default function BoutiquePage() {
  return (
    <div className="space-y-2 mb-2">
      <HeroBoutiqueSection />
      <ProductGridWrapper />
    </div>
  );
}
