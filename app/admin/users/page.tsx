import { cookies } from "next/headers";
import { UsersList } from "../components/users/UsersList";
import { RoleManagement } from "../components/users/RoleManagement";
import UsersAdmin from "@/components/admin/UsersAdmin";

export default async function UsersManagement() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Ton fetch avec le token dans Authorization
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
  console.log("Data fetched:", data.users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>
      <div className="grid gap-6">
        <UsersAdmin
          users={data.users}
          total={data.total}
          page={data.page}
          limit={data.limit}
        />
      </div>
    </div>
  );
}

