import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// Assurez-vous que cette variable est définie dans vos variables d'environnement
const SECRET = process.env.JWT_SECRET!;

function setSecurityHeaders(res: NextResponse) {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://js.stripe.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    connect-src 'self' https://api.stripe.com;
    font-src 'self';
    frame-src https://js.stripe.com;
  `.replace(/\n/g, "");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname, protocol } = req.nextUrl;

  // Forcer HTTPS uniquement en production
  if (
    process.env.NODE_ENV === "production" &&
    req.headers.get("x-forwarded-proto") === "http"
  ) {
    const httpsUrl = new URL(req.url);
    httpsUrl.protocol = "https:";
    return setSecurityHeaders(NextResponse.redirect(httpsUrl, 301));
  }

  console.log("Middleware exécuté pour le chemin:", pathname);

  // Protéger uniquement les routes admin
  if (pathname.startsWith("/admin") || pathname === "/mon-compte") {
    const token = req.cookies.get("token")?.value;

    console.log("Token trouvé:", token ? "Oui" : "Non");

    if (!token) {
      console.log("Aucun token trouvé, redirection vers login");
      return setSecurityHeaders(
        NextResponse.redirect(new URL("/auth/login", req.url))
      );
    }

    try {
      console.log("Tentative de vérification du token avec jose");

      // Utilisation de jose pour vérifier le token
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(SECRET)
      );

      console.log("Token décodé:", JSON.stringify(payload, null, 2));

      // TypeScript ne reconnaît pas automatiquement les propriétés du payload
      const userRole = payload.role as string;
      console.log("Rôle trouvé:", userRole);

      if (userRole !== "ADMIN") {
        console.log("Accès refusé: rôle non-admin détecté:", userRole);
        return setSecurityHeaders(NextResponse.redirect(new URL("/", req.url)));
      }

      console.log("Accès autorisé pour l'admin");
      // ✅ Accès autorisé
      return setSecurityHeaders(NextResponse.next());
    } catch (err) {
      // Token invalide ou expiré
      console.error("Erreur lors de la vérification du token:", err);
      return setSecurityHeaders(
        NextResponse.redirect(new URL("/auth/login", req.url))
      );
    }
  }

  // ✅ Pour toutes les autres routes
  return setSecurityHeaders(NextResponse.next());
}
export const config = {
  matcher: ["/admin/:path*", "/mon-compte"],
};
