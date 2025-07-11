// app/mon-compte/payment-methods/page.tsx
import PaymentMethodsSection from "../PaymentMethodsSection";
import { cookies } from "next/headers";
import { CreditCard } from "lucide-react";

interface StripePaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details: {
    name?: string;
  };
}

async function fetchPaymentMethods(
  token: string
): Promise<StripePaymentMethod[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/payment-methods`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return null;
  }
}

export default async function PaymentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-zinc-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Accès restreint
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Vous devez être connecté pour voir vos moyens de paiement
            </p>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethods = await fetchPaymentMethods(token);

  if (!paymentMethods) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-red-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Erreur de chargement
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Impossible de charger vos moyens de paiement
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethods.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-8 py-12 max-w-6xl">
          <header className="mb-12">
            <div className="border-b border-zinc-800/60 pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                    Mes moyens de paiement
                  </h1>
                  <p className="text-zinc-400 text-sm tracking-wider">
                    Cartes enregistrées dans votre compte
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-8 max-w-lg">
              <div className="w-24 h-24 mx-auto rounded-full bg-zinc-800/30 border border-zinc-700/30 flex items-center justify-center">
                <CreditCard className="w-12 h-12 text-zinc-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-white tracking-wide">
                  Aucune carte enregistrée
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Vous n&apos;avez ajouté aucune carte pour le moment.
                  <br />
                  Enregistrez un moyen de paiement pour faciliter vos futurs
                  achats.
                </p>
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-400/10 border border-amber-400/20 rounded-md text-amber-300 hover:bg-amber-400/20 transition-colors duration-300">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm font-medium tracking-wide">
                    Ajouter une carte
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto  py-12 max-w-6xl">
        <header className="mb-12">
          <div className="border-b border-zinc-800/60 pb-8">
            <div className="flex items-center justify-between">
              <div >
                <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                  Mes moyens de paiement
                </h1>
                <p className="text-zinc-400 text-sm tracking-wider">
                  {paymentMethods.length} carte
                  {paymentMethods.length > 1 ? "s" : ""} enregistrée
                  {paymentMethods.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px  to-transparent"></div>
          
            <PaymentMethodsSection paymentMethods={paymentMethods} />
         
        </section>

        <footer className="mt-16 pt-8 border-t border-zinc-800/40">
          <div className="flex items-center justify-center space-x-8 text-xs text-zinc-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
              <span className="tracking-wider">Données cryptées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
              <span className="tracking-wider">Connexion sécurisée</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}