import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
  boolean,
  decimal,
  json,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const ROLE_ENUM = pgEnum("role", [
  "STUDENT", 
  "LIBRARIAN", 
  "ADMIN", 
  "SUPER_ADMIN"
]);

export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const SUBSCRIPTION_STATUS_ENUM = pgEnum("subscription_status", [
  "ACTIVE",
  "CANCELED",
  "PAST_DUE",
  "UNPAID",
  "TRIALING",
]);

export const PLAN_TYPE_ENUM = pgEnum("plan_type", [
  "FREE",
  "PRO",
  "PREMIUM",
]);

// Organizations table - primary tenant boundary
export const organizations = pgTable("organizations", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  logo: text("logo"),
  website: text("website"),
  contactEmail: text("contact_email").notNull(),
  settings: json("settings").$type<{
    maxUsers?: number;
    maxBooks?: number;
    features?: string[];
  }>().default({}),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Subscription plans
export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  type: PLAN_TYPE_ENUM("type").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  interval: varchar("interval", { length: 20 }).notNull(), // monthly, yearly
  features: json("features").$type<string[]>().default([]),
  limits: json("limits").$type<{
    maxUsers?: number;
    maxBooks?: number;
    maxBorrowDays?: number;
  }>().default({}),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Organization subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  planId: uuid("plan_id")
    .references(() => subscriptionPlans.id)
    .notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeCustomerId: text("stripe_customer_id"),
  status: SUBSCRIPTION_STATUS_ENUM("status").default("TRIALING"),
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  trialStart: timestamp("trial_start", { withTimezone: true }),
  trialEnd: timestamp("trial_end", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  role: ROLE_ENUM("role").default("STUDENT"),
  isActive: boolean("is_active").default(true),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Support tickets for super admin
export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  priority: varchar("priority", { length: 20 }).default("MEDIUM"),
  assignedTo: uuid("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Audit logs for tracking changes
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 100 }).notNull(),
  resource: varchar("resource", { length: 100 }).notNull(),
  resourceId: uuid("resource_id"),
  details: json("details").$type<Record<string, any>>().default({}),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
