/**
 * Centralized Configuration for API and Image URLs
 * 
 * This file manages all base URLs and image URLs for the entire project.
 * All URLs can be configured via environment variables with sensible defaults.
 * 
 * Environment Variables:
 * - NEXT_PUBLIC_API_BASE_URL: Base API URL (default: http://localhost:9002)
 * - NEXT_PUBLIC_IMAGE_BASE_URL: Base URL for images (default: same as API base)
 * 
 * Usage:
 *   import { API_BASE_URL, IMAGE_BASE_URL, API_ENDPOINTS, IMAGE_PATHS } from '@/app/config/constants';
 */

// Base API URL - can be overridden with NEXT_PUBLIC_API_BASE_URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://api.gauallamilk.com';
// 'http://localhost:8000';

// Base URL for images - defaults to API base URL if not specified
export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // User API endpoints
  USER_BASE: `${API_BASE_URL}/api/user`,

  // Admin API endpoints
  ADMIN_BASE: `${API_BASE_URL}/admin`,

  // Rider API endpoints
  RIDER_BASE: `${API_BASE_URL}/api/rider`,
  RIDER_AUTH: `${API_BASE_URL}/api/rider/auth`,

  // Image paths
  UPLOADS: `${IMAGE_BASE_URL}/uploads`,
};

// Image URL helpers
export const IMAGE_PATHS = {
  // Base uploads directory
  UPLOADS: `${IMAGE_BASE_URL}/uploads`,

  // Full base URL for images (when you need just the base)
  BASE: IMAGE_BASE_URL,
};

// Legacy exports for backward compatibility
// These will be deprecated but kept for now to ensure smooth migration
export const baseurl = API_ENDPOINTS.USER_BASE;
export const imageurl = IMAGE_PATHS.UPLOADS;
export const imageurl2 = IMAGE_BASE_URL;
export const adminurl = API_ENDPOINTS.ADMIN_BASE;
export const adminimg = IMAGE_BASE_URL;

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If imagePath already contains http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${IMAGE_BASE_URL}/${cleanPath}`;
};

// Helper function to get upload image URL
export const getUploadImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If imagePath already contains http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${IMAGE_PATHS.UPLOADS}/${cleanPath}`;
};


// Add this at the bottom or top
export const GOOGLE_MAPS_KEY = "AIzaSyDUns7-K4KmSoWv5zsQnqzbQ814yCMWZpo";
