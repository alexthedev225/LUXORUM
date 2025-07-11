import { IAddress } from "@/models/Address";

const BASE_URL = "/api/addresses";

// POST: Add a new address
export async function addAddress(data: Partial<IAddress>): Promise<IAddress> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de l'adresse.");
  return res.json();
}

// PUT: Update an address by ID
export async function updateAddress(
  id: string,
  data: Partial<IAddress>
): Promise<IAddress> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de l'adresse.");
  return res.json();
}

// DELETE: Delete an address by ID
export async function deleteAddress(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'adresse.");
  return res.json();
}
