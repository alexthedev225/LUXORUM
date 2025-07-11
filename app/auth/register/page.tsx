// app/auth/register/page.tsx
import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Inscription | Luxorum",
  description: "Créez votre compte",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
