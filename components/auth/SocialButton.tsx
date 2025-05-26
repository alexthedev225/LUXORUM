import { Instagram, Twitter, Linkedin } from "lucide-react";

interface SocialButtonProps {
  icon: "instagram" | "twitter" | "linkedin";
}

export function SocialButton({ icon }: SocialButtonProps) {
  const icons = {
    instagram: <Instagram className="w-5 h-5 text-amber-200/80" />,
    twitter: <Twitter className="w-5 h-5 text-amber-200/80" />,
    linkedin: <Linkedin className="w-5 h-5 text-amber-200/80" />,
  };

  return (
    <button
      className="auth-social-button w-12 h-12 rounded-full flex items-center justify-center 
                 transition-all duration-300 hover:scale-105 hover:bg-zinc-800/80"
    >
      {icons[icon]}
    </button>
  );
}
