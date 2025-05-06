import Link from "next/link";

export function AdminNav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link href="/admin" className="text-gray-900 hover:text-gray-600">
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-gray-900 hover:text-gray-600"
            >
              Produits
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-900 hover:text-gray-600"
            >
              Commandes
            </Link>
            <Link
              href="/admin/users"
              className="text-gray-900 hover:text-gray-600"
            >
              Utilisateurs
            </Link>
            <Link
              href="/admin/reports"
              className="text-gray-900 hover:text-gray-600"
            >
              Rapports
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
