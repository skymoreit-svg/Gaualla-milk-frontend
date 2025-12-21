// Admin API Configuration
// Use environment variable NEXT_PUBLIC_ADMIN_API_URL or fallback to localhost
const ADMIN_API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://api.gauallamilk.com';

// export const adminurl = `${ADMIN_API_BASE}/admin`;
// export const adminimg = ADMIN_API_BASE;

// For backward compatibility - you can also set these directly:
export const adminurl = `http://localhost:9002/admin`
export const adminimg = `http://localhost:9002`
