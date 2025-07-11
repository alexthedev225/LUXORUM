import ProfileSection from "../ProfileSection";
import { cookies } from "next/headers";
import { User } from "lucide-react";

// Types
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

async function fetchUserProfile(token: string): Promise<UserData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Erreur fetch profile");
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
            {/* Icône verrou */}
            <svg
              className="w-8 h-8 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Accès restreint
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Vous devez être connecté pour consulter votre profil
            </p>
          </div>
        </div>
      </div>
    );
  }

  const userData = await fetchUserProfile(token);

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            {/* Icône erreur */}
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-light text-white tracking-wide">
              Erreur de chargement
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Impossible de charger votre profil pour le moment
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-black">
      <div className="container mx-auto px-0 py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="border-b border-zinc-800/60 pb-8">
            <div className="flex items-center justify-between">
              <div className="px-8">
                <h1 className="text-4xl font-light text-white tracking-wide mb-2">
                  Mon profil
                </h1>
                <p className="text-zinc-400 text-sm tracking-wider">
                  Données personnelles et coordonnées
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800/50 to-transparent"></div>

          <ProfileSection userData={userData} />
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/40">
          <div className="flex items-center justify-center space-x-8 text-xs text-zinc-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
              <span className="tracking-wider">Données sécurisées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
              <span className="tracking-wider">Consultation privée</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
