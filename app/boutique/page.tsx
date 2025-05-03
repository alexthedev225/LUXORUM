import { HeroBoutiqueSection } from "@/components/sections/boutique/HeroBoutiqueSection";
import { ProductGrid } from "@/components/sections/boutique/ProductGrid";

export default function BoutiquePage() {
  return (
    <div className="space-y-16 pb-16">
      <HeroBoutiqueSection />
      <ProductGrid />
    </div>
  );
}
