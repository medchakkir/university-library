import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

/**
 * Standard error response format for server actions and API routes
 */
export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}

/**
 * Standard success response format for server actions and API routes
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

/**
 * Type for all API responses
 */
export type ApiResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;

/**
 * Handles errors in a consistent way across server actions and API routes
 * @param error The error object
 * @param defaultMessage Default error message to show if error is not recognized
 * @param logError Whether to log the error to console
 * @returns Standardized error response
 */
export const handleError = (
  error: unknown,
  defaultMessage = "An unexpected error occurred",
  logError = true
): ErrorResponse => {
  if (logError) {
    console.error(error);
  }

  // Handle known error types
  if (error instanceof Error) {
    return {
      success: false,
      error: error.message || defaultMessage,
      code: error.name,
      details: error.stack,
    };
  }

  // Handle string errors
  if (typeof error === "string") {
    return {
      success: false,
      error,
    };
  }

  // Handle unknown error types
  return {
    success: false,
    error: defaultMessage,
    details: error,
  };
};

/**
 * Creates a standardized success response
 * @param data Optional data to include in the response
 * @param message Optional success message
 * @returns Standardized success response
 */
export const createSuccessResponse = <T>(
  data?: T,
  message?: string
): SuccessResponse<T> => {
  return {
    success: true,
    data,
    message,
  };
};
