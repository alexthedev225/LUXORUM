// app/admin/categories/page.tsx (ou .jsx selon structure)
import CategoriesClient from "./components/CategoriesClient";

export const revalidate = 0; // pour forcer le rechargement à chaque fois (optionnel)

async function fetchCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function AdminCategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Overlay décoratif subtil */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <main className="relative z-10 p-6 md:p-10">
        <CategoriesClient initialCategories={categories} />
      </main>
    </div>
  );
}
