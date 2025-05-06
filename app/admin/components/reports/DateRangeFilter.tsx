"use client";

export function DateRangeFilter() {
  return (
    <div className="flex gap-4 items-center">
      <select
        className="border rounded-md p-2"
        onChange={(e) => {
          // Mettre à jour la période dans l'URL
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("period", e.target.value);
          window.history.pushState(null, "", `?${searchParams.toString()}`);
        }}
      >
        <option value="week">7 derniers jours</option>
        <option value="month">30 derniers jours</option>
        <option value="quarter">3 derniers mois</option>
        <option value="year">12 derniers mois</option>
      </select>
    </div>
  );
}
