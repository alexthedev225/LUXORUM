"use client";
import { usePathname } from "next/navigation";

export const useIsAuthOrAdminPage = () => {
  const pathname = usePathname();
  return pathname.startsWith("/auth") || pathname.startsWith("/admin");
};
