/**
 * API Configuration
 * 
 * This file re-exports URLs from the centralized config.
 * All URLs are now managed in: app/config/constants.js
 * 
 * @deprecated - Consider importing directly from '@/app/config/constants' for new code
 */

// Re-export from centralized config
export {
  baseurl,
  imageurl,
  imageurl2,
  adminurl,
  API_BASE_URL,
  IMAGE_BASE_URL,
  API_ENDPOINTS,
  IMAGE_PATHS,
  getImageUrl,
  getUploadImageUrl,
} from '../../config/constants';
