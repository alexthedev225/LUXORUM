import { cookies } from "next/headers";
import UsersAdmin from "@/components/admin/UsersAdmin";

export default async function UsersManagement() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }

  const data = await res.json();

  return (
    <main className="min-h-screen p-6">
     
      <section className="grid gap-6">
        <UsersAdmin
          users={data.users}
          total={data.pagination.total}
          page={data.pagination.page}
          limit={data.pagination.limit}
        />
      </section>
    </main>
  );
}
