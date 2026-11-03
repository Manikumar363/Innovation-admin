/**
 * Centralized API Base URL configuration.
 * Reads backend base URL from Vite environment variables with automatic fallback to localhost:5000.
 * Automatically trims whitespace and removes any trailing slashes to prevent malformed URLs.
 */
export const API_BASE: string = (
  (import.meta.env.VITE_REACT_APP_API_BASE_URL as string | undefined) ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  (import.meta.env.VITE_API_URL as string | undefined) ||
  'http://localhost:5000'
)
  .trim()
  .replace(/\/+$/, '');

