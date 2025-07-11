// app/mon-compte/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToDefaultSection() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mon-compte/profile");
  }, [router]);

  return null;
}
