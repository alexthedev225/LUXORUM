import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="space-y-4 pb-4">
      <ContactHero />
      <div className="container mx-auto p-10 bg-black rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
