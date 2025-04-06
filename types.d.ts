interface Book {
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

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
}

interface BookParams {
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

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface User {
  id: string;
  role: "USER" | "ADMIN" | "TEACHER" | "STUDENT" | null;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  lastActivityDate: string | null;
  createdAt: Date | null;
}
