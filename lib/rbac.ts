import { User } from "@/types";

export type Role = "STUDENT" | "LIBRARIAN" | "ADMIN" | "SUPER_ADMIN";

export const ROLE_HIERARCHY: Record<Role, number> = {
  STUDENT: 1,
  LIBRARIAN: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

export const PERMISSIONS = {
  // Book permissions
  BOOKS_VIEW: "books:view",
  BOOKS_CREATE: "books:create",
  BOOKS_UPDATE: "books:update",
  BOOKS_DELETE: "books:delete",
  
  // User permissions
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",
  
  // Borrowing permissions
  BORROW_CREATE: "borrow:create",
  BORROW_VIEW_OWN: "borrow:view_own",
  BORROW_VIEW_ALL: "borrow:view_all",
  BORROW_UPDATE: "borrow:update",
  BORROW_DELETE: "borrow:delete",
  
  // Organization permissions
  ORG_VIEW: "org:view",
  ORG_UPDATE: "org:update",
  ORG_DELETE: "org:delete",
  
  // Subscription permissions
  SUBSCRIPTION_VIEW: "subscription:view",
  SUBSCRIPTION_UPDATE: "subscription:update",
  
  // Super admin permissions
  SUPER_ADMIN_VIEW: "super_admin:view",
  SUPER_ADMIN_MANAGE: "super_admin:manage",
} as const;

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  STUDENT: [
    PERMISSIONS.BOOKS_VIEW,
    PERMISSIONS.BORROW_CREATE,
    PERMISSIONS.BORROW_VIEW_OWN,
  ],
  LIBRARIAN: [
    PERMISSIONS.BOOKS_VIEW,
    PERMISSIONS.BOOKS_CREATE,
    PERMISSIONS.BOOKS_UPDATE,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.BORROW_CREATE,
    PERMISSIONS.BORROW_VIEW_OWN,
    PERMISSIONS.BORROW_VIEW_ALL,
    PERMISSIONS.BORROW_UPDATE,
  ],
  ADMIN: [
    PERMISSIONS.BOOKS_VIEW,
    PERMISSIONS.BOOKS_CREATE,
    PERMISSIONS.BOOKS_UPDATE,
    PERMISSIONS.BOOKS_DELETE,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE,
    PERMISSIONS.BORROW_CREATE,
    PERMISSIONS.BORROW_VIEW_OWN,
    PERMISSIONS.BORROW_VIEW_ALL,
    PERMISSIONS.BORROW_UPDATE,
    PERMISSIONS.BORROW_DELETE,
    PERMISSIONS.ORG_VIEW,
    PERMISSIONS.ORG_UPDATE,
    PERMISSIONS.SUBSCRIPTION_VIEW,
    PERMISSIONS.SUBSCRIPTION_UPDATE,
  ],
  SUPER_ADMIN: [
    // Super admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
};

export function hasPermission(userRole: Role | null, permission: string): boolean {
  if (!userRole) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
}

export function hasAnyPermission(userRole: Role | null, permissions: string[]): boolean {
  if (!userRole) return false;
  
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: Role | null, permissions: string[]): boolean {
  if (!userRole) return false;
  
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function canAccessResource(
  userRole: Role | null,
  requiredRole: Role
): boolean {
  if (!userRole) return false;
  
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function isSuperAdmin(userRole: Role | null): boolean {
  return userRole === "SUPER_ADMIN";
}

export function isAdmin(userRole: Role | null): boolean {
  return userRole === "ADMIN" || isSuperAdmin(userRole);
}

export function isLibrarian(userRole: Role | null): boolean {
  return userRole === "LIBRARIAN" || isAdmin(userRole);
}

export function canManageUsers(userRole: Role | null): boolean {
  return hasPermission(userRole, PERMISSIONS.USERS_CREATE) ||
         hasPermission(userRole, PERMISSIONS.USERS_UPDATE) ||
         hasPermission(userRole, PERMISSIONS.USERS_DELETE);
}

export function canManageBooks(userRole: Role | null): boolean {
  return hasPermission(userRole, PERMISSIONS.BOOKS_CREATE) ||
         hasPermission(userRole, PERMISSIONS.BOOKS_UPDATE) ||
         hasPermission(userRole, PERMISSIONS.BOOKS_DELETE);
}

export function canViewAllBorrowRecords(userRole: Role | null): boolean {
  return hasPermission(userRole, PERMISSIONS.BORROW_VIEW_ALL);
}

export function canManageOrganization(userRole: Role | null): boolean {
  return hasPermission(userRole, PERMISSIONS.ORG_UPDATE);
}

export function canManageSubscription(userRole: Role | null): boolean {
  return hasPermission(userRole, PERMISSIONS.SUBSCRIPTION_UPDATE);
}

export function getAccessibleRoles(userRole: Role | null): Role[] {
  if (!userRole) return [];
  
  const userLevel = ROLE_HIERARCHY[userRole];
  
  return Object.entries(ROLE_HIERARCHY)
    .filter(([_, level]) => level <= userLevel)
    .map(([role, _]) => role as Role);
}

export function validateRoleTransition(
  currentUserRole: Role | null,
  targetRole: Role,
  targetUserRole?: Role
): boolean {
  if (!currentUserRole) return false;
  
  // Super admin can assign any role
  if (isSuperAdmin(currentUserRole)) return true;
  
  // Users can only assign roles lower than their own
  const currentLevel = ROLE_HIERARCHY[currentUserRole];
  const targetLevel = ROLE_HIERARCHY[targetRole];
  
  // If updating existing user, check their current role too
  if (targetUserRole) {
    const targetUserLevel = ROLE_HIERARCHY[targetUserRole];
    // Can only modify users with lower or equal role
    if (targetUserLevel >= currentLevel) return false;
  }
  
  // Can only assign roles lower than current user's role
  return targetLevel < currentLevel;
}

export function getRoleDisplayName(role: Role): string {
  const displayNames: Record<Role, string> = {
    STUDENT: "Student",
    LIBRARIAN: "Librarian",
    ADMIN: "Administrator",
    SUPER_ADMIN: "Super Administrator",
  };
  
  return displayNames[role];
}

export function getRoleDescription(role: Role): string {
  const descriptions: Record<Role, string> = {
    STUDENT: "Can browse books and manage their own borrowing records",
    LIBRARIAN: "Can manage books and view all borrowing records",
    ADMIN: "Can manage users, books, and organization settings",
    SUPER_ADMIN: "Has full access to all organizations and system settings",
  };
  
  return descriptions[role];
}
