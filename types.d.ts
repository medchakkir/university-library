export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  contactEmail: string;
  settings: {
    maxUsers?: number;
    maxBooks?: number;
    features?: string[];
  };
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: "FREE" | "PRO" | "PREMIUM";
  price: string;
  currency: string;
  interval: string;
  features: string[];
  limits: {
    maxUsers?: number;
    maxBooks?: number;
    maxBorrowDays?: number;
  };
  stripeProductId?: string;
  stripePriceId?: string;
  isActive: boolean;
  createdAt: Date | null;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "UNPAID" | "TRIALING";
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  trialStart?: Date;
  trialEnd?: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Book {
  id: string;
  organizationId: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isLoanedBook?: boolean;
}

export interface BookParams {
  organizationId: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

export interface User {
  id: string;
  organizationId: string;
  role: "STUDENT" | "LIBRARIAN" | "ADMIN" | "SUPER_ADMIN" | null;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string | null;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastActivityDate: string | null;
}

export interface UserParams {
  organizationId: string;
  role: "STUDENT" | "LIBRARIAN" | "ADMIN" | "SUPER_ADMIN" | null;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string | null;
}

export interface BorrowRecord {
  id: string;
  organizationId: string;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "BORROWED" | "RETURNED";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface SupportTicket {
  id: string;
  organizationId: string;
  userId: string;
  subject: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  priority: string;
  assignedTo?: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AuditLog {
  id: string;
  organizationId?: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date | null;
}
