interface HeaderProps {
  total: number;
  page: number;
  totalPages: number;
}

export default function Header({ total, page, totalPages }: HeaderProps) {
  return (
    <div className="mb-12 text-center">
      <div className="relative">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text mb-4 tracking-tight">
          Gestion des Utilisateurs
        </h1>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
      </div>
      <p className="text-zinc-400/90 text-lg font-light tracking-wide mt-6">
        Administration des comptes et privilèges
      </p>

      {/* Stats en haut */}
      <div className="flex justify-center items-center space-x-8 mt-8">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-amber-300/90 tracking-[0.2em] uppercase">
            {total} Utilisateurs
          </span>
        </div>
        <div className="w-px h-4 bg-zinc-800/50"></div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-amber-400/60 rounded-full"></div>
          <span className="text-xs text-amber-300/90 tracking-[0.2em] uppercase">
            Page {page} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
