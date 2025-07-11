// AboutPage.tsx
"use client";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { Philosophy } from "@/components/sections/about/Philosophy";
import { Commitments } from "@/components/sections/about/Commitments";
import { Testimonials } from "@/components/sections/about/Testimonials";
import { ContactCTA } from "@/components/sections/about/ContactCTA";

// Import des icônes Lucide React
import { Leaf, Hammer, Diamond, FlaskRound } from "lucide-react";

const commitments = [
  {
    title: "Éthique & Responsabilité",
    description:
      "Nous sélectionnons exclusivement des matériaux issus de sources éthiques et traçables, dans le respect des normes internationales les plus strictes.",
    icon: <Leaf className="text-amber-400 w-10 h-10" />,
  },
  {
    title: "Artisanat d'Excellence",
    description:
      "Chaque pièce est façonnée par nos maîtres artisans, perpétuant un savoir-faire joaillier d'exception transmis de génération en génération.",
    icon: <Hammer className="text-amber-400 w-10 h-10" />,
  },
  {
    title: "Qualité Premium",
    description:
      "Nos créations sont soumises à des contrôles rigoureux pour garantir une qualité irréprochable et une durabilité exceptionnelle.",
    icon: <Diamond className="text-amber-400 w-10 h-10" />,
  },
  {
    title: "Innovation & Tradition",
    description:
      "Nous allions techniques traditionnelles et innovations modernes pour créer des pièces uniques qui redéfinissent l'élégance masculine.",
    icon: <FlaskRound className="text-amber-400 w-10 h-10" />,
  },
];

const testimonials = [
  {
    quote:
      "Les bijoux LUXORUM sont d'une qualité exceptionnelle et ajoutent une touche de raffinement incomparable à ma collection personnelle.",
    author: "Alexandre D.",
    title: "Entrepreneur",
    rating: 5,
  },
  {
    quote:
      "Un savoir-faire unique et une élégance intemporelle. Chaque pièce LUXORUM est un véritable chef-d'œuvre qui raconte une histoire.",
    author: "Marc-Antoine B.",
    title: "Directeur Artistique",
    rating: 5,
  },
  {
    quote:
      "Le service est à la hauteur des créations : excellent, personnalisé et professionnel. Une expérience client remarquable.",
    author: "Richard M.",
    title: "Collectionneur",
    rating: 5,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden space-y-2">
      <AboutHero />
      <Philosophy />
      <Commitments commitments={commitments} />
      <Testimonials testimonials={testimonials} />
      <ContactCTA />
    </div>
  );
}
