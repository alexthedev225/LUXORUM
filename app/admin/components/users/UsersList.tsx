import { Role } from "@prisma/client";

interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  createdAt: string;
}

export function UsersList({ users }: { users: User[] }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des Utilisateurs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Utilisateur</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Rôle</th>
                <th className="text-left p-4">Date création</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        /* TODO */
                      }}
                    >
                      Modifier rôle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
