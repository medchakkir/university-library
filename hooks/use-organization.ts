import { useSession } from "next-auth/react";
import { Organization, Subscription, SubscriptionPlan } from "@/types";
import { useMemo } from "react";

export function useOrganization() {
  const { data: session } = useSession();

  const organization = useMemo(() => {
    if (!session?.user) return null;

    return {
      id: session.user.organizationId,
      name: session.user.organizationName,
      slug: session.user.organizationSlug,
    };
  }, [session]);

  return {
    organization,
    isLoading: !session,
  };
}

export function useOrganizationLimits() {
  // This would typically fetch from an API endpoint
  // For now, we'll return a placeholder
  return {
    limits: {
      maxUsers: 10,
      maxBooks: 50,
      maxBorrowDays: 14,
    },
    current: {
      users: 0,
      books: 0,
    },
    isLoading: false,
  };
}

export function useSubscription() {
  // This would typically fetch from an API endpoint
  // For now, we'll return a placeholder
  return {
    subscription: null as (Subscription & { plan: SubscriptionPlan }) | null,
    isLoading: false,
    error: null,
  };
}
