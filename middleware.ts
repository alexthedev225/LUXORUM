import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";
import { checkRateLimit } from "./lib/rateLimit";
import { checkPermissions } from "./lib/rbac";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const sessionId = request.cookies.get("sessionId")?.value;

  // CSRF Protection pour les requêtes POST/PUT/PATCH/DELETE
  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    const csrfToken = request.headers.get("x-csrf-token");
    const storedToken = request.cookies.get("csrf-token")?.value;

    if (!csrfToken || !storedToken || csrfToken !== storedToken) {
      return NextResponse.json(
        { error: "Token CSRF invalide" },
        { status: 403 }
      );
    }
  }

  // Rate limiting
  const ip = request.ip || "anonymous";
  const rateLimit = await checkRateLimit(ip);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Trop de requêtes, veuillez réessayer plus tard" },
      { status: 429 }
    );
  }

  // Public routes
  const publicRoutes = ["/login", "/register", "/", "/products"];
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // API routes that don't need auth
  if (path.startsWith("/api/auth/") || path.startsWith("/api/products")) {
    return NextResponse.next();
  }

  // Check auth for all other routes
  if (!token || !sessionId) {
    if (path.startsWith("/api/")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const verifiedToken = await verifyAuth(token);
    const session = await getSession(sessionId);

    if (!session) {
      if (path.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Session invalide" },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Vérification des permissions basée sur le chemin
    const pathPermissions: Record<string, string[]> = {
      "/admin/products": ["write:products"],
      "/admin/users": ["manage:users"],
      "/admin/orders": ["read:orders", "update:orders"],
      "/admin/stats": ["view:statistics"],
      "/admin/inventory": ["manage:inventory"],
    };

    const requiredPermissions = Object.entries(pathPermissions).find(([path]) =>
      request.nextUrl.pathname.startsWith(path)
    )?.[1];

    if (
      requiredPermissions &&
      !checkPermissions(verifiedToken.role, requiredPermissions)
    ) {
      return NextResponse.json(
        { error: "Permission insuffisante" },
        { status: 403 }
      );
    }

    // Admin routes protection
    if (path.startsWith("/admin") && verifiedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add session info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
      "user",
      JSON.stringify({
        id: session.userId,
        role: session.role,
      })
    );

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    if (path.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Token ou session invalide" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // Routes protégées
    "/admin/:path*",
    "/api/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
  ],
};
