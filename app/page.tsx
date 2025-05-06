import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main className="space-y-2">
      <div className="flex flex-col gap-2 mb-2">
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <AboutSection />
        <PromoBanner />
      </div>
    </main>
  );
}
