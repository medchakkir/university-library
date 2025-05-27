export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface Book {
  id: string;
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
  createdAt: Date | null;
  isLoanedBook?: boolean;
}

export interface BookParams {
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
  role: "USER" | "ADMIN" | null;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string | null;
  createdAt: Date | null;
  lastActivityDate: string | null;
}

export interface UserParams {
  role: "USER" | "ADMIN" | null;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string | null;
}
