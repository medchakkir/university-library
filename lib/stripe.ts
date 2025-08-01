import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Up to 50 books",
      "Up to 10 users",
      "Basic borrowing system",
      "Email support",
    ],
    limits: {
      maxUsers: 10,
      maxBooks: 50,
      maxBorrowDays: 14,
    },
  },
  PRO: {
    name: "Pro",
    price: 29,
    interval: "month",
    features: [
      "Up to 500 books",
      "Up to 100 users",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
      "API access",
    ],
    limits: {
      maxUsers: 100,
      maxBooks: 500,
      maxBorrowDays: 30,
    },
  },
  PREMIUM: {
    name: "Premium",
    price: 99,
    interval: "month",
    features: [
      "Unlimited books",
      "Unlimited users",
      "Advanced analytics",
      "Custom branding",
      "24/7 phone support",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    limits: {
      maxUsers: -1, // unlimited
      maxBooks: -1, // unlimited
      maxBorrowDays: 60,
    },
  },
} as const;

export async function createStripeCustomer(
  email: string,
  name: string,
  organizationId: string,
) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      organizationId,
    },
  });

  return customer;
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  organizationId: string,
  successUrl: string,
  cancelUrl: string,
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      organizationId,
    },
  });

  return session;
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return subscription;
}

export async function reactivateSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });

  return subscription;
}
