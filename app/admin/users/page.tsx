import { UsersList } from "../components/users/UsersList";
import { RoleManagement } from "../components/users/RoleManagement";

export default async function UsersManagement() {
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>
      <div className="grid gap-6">
        <UsersList users={users} />
        <RoleManagement />
      </div>
    </div>
  );
}
