import { AboutHero } from "@/components/sections/about/AboutHero";
import { Philosophy } from "@/components/sections/about/Philosophy";
import { Commitments } from "@/components/sections/about/Commitments";
import { Testimonials } from "@/components/sections/about/Testimonials";
import { ContactCTA } from "@/components/sections/about/ContactCTA";

export default function AboutPage() {
  return (
    <div className="space-y-4 pb-4">
      <AboutHero />
      <Philosophy />
      <Commitments />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}
