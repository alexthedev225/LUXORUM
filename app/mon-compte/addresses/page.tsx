import AddressesSection from "../AddressesSection";
import { cookies } from "next/headers";
import { Home } from "lucide-react";
import Link from "next/link";

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

async function fetchUserAddresses(token: string): Promise<Address[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/addresses`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Erreur fetch addresses");
    const data = await res.json();
    console.log("Fetched addresses:", data);
    return data;
  } catch {
    return [];
  }
}

export default async function AddressesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
            <Home className="w-8 h-8 text-zinc-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Accès restreint
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Vous devez être connecté pour consulter vos adresses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const addresses = await fetchUserAddresses(token);
  console.log("Addresses:", addresses);


  if (!addresses) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Home className="w-8 h-8 text-red-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Erreur de chargement
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Impossible de charger vos adresses pour le moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-8 py-12 max-w-6xl">
          <header className="mb-12">
            <div className="border-b border-zinc-800/60 pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                    Mes adresses
                  </h1>
                  <p className="text-zinc-400 text-sm tracking-wider">
                    Gérer vos adresses de livraison et de facturation
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                    {/* Exemple d’icône Lucide React Home */}
                    <Home className="w-6 h-6 text-amber-300" />
                    {/* Ou un SVG inline comme pour commandes, à adapter */}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-8 max-w-lg">
              <div className="w-24 h-24 mx-auto rounded-full bg-zinc-800/30 border border-zinc-700/30 flex items-center justify-center">
                <Home className="w-12 h-12 text-zinc-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-white tracking-wide">
                  Aucune adresse enregistrée
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Ajoutez votre première adresse pour faciliter vos commandes à
                  venir.
                </p>
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-400/10 border border-amber-400/20 rounded-md text-amber-300 hover:bg-amber-400/20 transition-colors duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm font-medium tracking-wide">
                    <Link href="/mon-compte/addresses/new">
                    Ajouter une adresse
                    </Link>
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
    <div className=" bg-black">
      <div className="container mx-auto md:px-8 py-12 ">
        <header className="mb-12">
          <div className="border-b border-zinc-800/60 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                  Mes adresses
                </h1>
                <p className="text-zinc-400 text-sm tracking-wider">
                  {addresses.length} adresse{addresses.length > 1 ? "s" : ""}{" "}
                  enregistrée{addresses.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative">
          
         
            <AddressesSection addresses={addresses} />
        
        </section>

        <footer className="mt-16 pt-8 border-t border-zinc-800/40">
          <div className="flex items-center justify-center space-x-8 text-xs text-zinc-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
              <span className="tracking-wider">Données sécurisées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
              <span className="tracking-wider">Modifiables à tout moment</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
