type Permission =
  | "read:products"
  | "write:products"
  | "delete:products"
  | "manage:users"
  | "read:orders"
  | "update:orders"
  | "view:statistics"
  | "manage:inventory";

const rolePermissions: Record<string, Permission[]> = {
  USER: ["read:products"],
  ADMIN: [
    "read:products",
    "write:products",
    "delete:products",
    "manage:users",
    "read:orders",
    "update:orders",
    "view:statistics",
    "manage:inventory",
  ],
  MANAGER: [
    "read:products",
    "write:products",
    "read:orders",
    "update:orders",
    "view:statistics",
    "manage:inventory",
  ],
};

export function hasPermission(
  userRole: string,
  requiredPermission: Permission
): boolean {
  const permissions = rolePermissions[userRole] || [];
  return permissions.includes(requiredPermission);
}

export function checkPermissions(
  userRole: string,
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) =>
    hasPermission(userRole, permission)
  );
}
