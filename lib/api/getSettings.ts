export async function getSettings() {
  const res = await fetch(`${process.env.BASE_URL}/api/settings`, {
    cache: "no-store", // pour forcer la récupération à chaque fois (optionnel)
  });

  if (!res.ok) throw new Error("Failed to fetch settings");

  return res.json();
}
