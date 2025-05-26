"use client";
import { useState } from "react";
import { Role } from "@prisma/client";

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<Role>("USER");
  const [userId, setUserId] = useState("");

  const handleUpdateRole = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du rôle");
      }

      // Recharger la page pour voir les changements
      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gestion des Rôles</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rôle
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as Role)}
            className="w-full border rounded-md p-2"
          >
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <p className="text-sm text-gray-600">
            {selectedRole === "ADMIN"
              ? "Accès complet au panel administrateur et à toutes les fonctionnalités"
              : "Accès limité aux fonctionnalités utilisateur standard"}
          </p>
        </div>
      </div>
    </div>
  );
}
