import { db } from "@/database/drizzle";
import { organizations, users, subscriptions, subscriptionPlans } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { Organization, User, Subscription, SubscriptionPlan } from "@/types";

export async function getOrganizationById(id: string): Promise<Organization | null> {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, id))
    .limit(1);

  return result[0] || null;
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, slug))
    .limit(1);

  return result[0] || null;
}

export async function createOrganization(data: {
  name: string;
  slug: string;
  description?: string;
  contactEmail: string;
  logo?: string;
  website?: string;
}): Promise<Organization> {
  const result = await db
    .insert(organizations)
    .values({
      ...data,
      settings: {
        maxUsers: 10,
        maxBooks: 50,
        features: ["basic"],
      },
    })
    .returning();

  return result[0];
}

export async function updateOrganization(
  id: string,
  data: Partial<Organization>
): Promise<Organization | null> {
  const result = await db
    .update(organizations)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, id))
    .returning();

  return result[0] || null;
}

export async function getOrganizationUsers(organizationId: string): Promise<User[]> {
  const result = await db
    .select()
    .from(users)
    .where(and(
      eq(users.organizationId, organizationId),
      eq(users.isActive, true)
    ));

  return result;
}

export async function getOrganizationSubscription(
  organizationId: string
): Promise<(Subscription & { plan: SubscriptionPlan }) | null> {
  const result = await db
    .select({
      subscription: subscriptions,
      plan: subscriptionPlans,
    })
    .from(subscriptions)
    .innerJoin(subscriptionPlans, eq(subscriptions.planId, subscriptionPlans.id))
    .where(eq(subscriptions.organizationId, organizationId))
    .limit(1);

  if (!result[0]) return null;

  return {
    ...result[0].subscription,
    plan: result[0].plan,
  };
}

export async function checkOrganizationLimits(
  organizationId: string,
  resource: "users" | "books"
): Promise<{ withinLimits: boolean; current: number; limit: number }> {
  const subscription = await getOrganizationSubscription(organizationId);
  
  if (!subscription) {
    return { withinLimits: false, current: 0, limit: 0 };
  }

  const limits = subscription.plan.limits;
  const limit = resource === "users" ? limits.maxUsers : limits.maxBooks;

  // -1 means unlimited
  if (limit === -1) {
    return { withinLimits: true, current: 0, limit: -1 };
  }

  let current = 0;
  if (resource === "users") {
    const userCount = await db
      .select({ count: users.id })
      .from(users)
      .where(and(
        eq(users.organizationId, organizationId),
        eq(users.isActive, true)
      ));
    current = userCount.length;
  } else {
    // For books, we'll implement this when we refactor the books queries
    current = 0;
  }

  return {
    withinLimits: current < (limit || 0),
    current,
    limit: limit || 0,
  };
}

export function generateOrganizationSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

export async function isSlugAvailable(slug: string): Promise<boolean> {
  const existing = await getOrganizationBySlug(slug);
  return !existing;
}

export async function getUniqueSlug(baseName: string): Promise<string> {
  let slug = generateOrganizationSlug(baseName);
  let counter = 1;

  while (!(await isSlugAvailable(slug))) {
    slug = `${generateOrganizationSlug(baseName)}-${counter}`;
    counter++;
  }

  return slug;
}
