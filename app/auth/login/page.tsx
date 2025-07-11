// app/auth/login/page.tsx
import LoginClient from "./LoginClient";

export const metadata = {
  title: "Connexion | Luxorum",
  description: "Créez votre compte",
};

export default function RegisterPage() {
  return <LoginClient />;
}
