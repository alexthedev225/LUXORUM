"use client";

export function ExportButton() {
  const handleExport = async () => {
    try {
      const response = await fetch("/api/admin/reports/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rapport-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
    >
      Exporter en Excel
    </button>
  );
}
