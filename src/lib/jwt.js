// JWT utility functions for token creation and verification
// Note: In production, use a proper JWT library like jsonwebtoken on backend
// This is a simplified version for demonstration

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Create a simple JWT-like token (for demo purposes)
 * In production, this should be done on the backend
 */
export function createToken(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
  }));
  
  // In production, use proper HMAC signing
  const signature = btoa('dummy-signature');
  
  return `${header}.${body}.${signature}`;
}

/**
 * Decode and verify JWT token
 * In production, use proper JWT verification on backend
 */
export function decodeToken(token) {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }
    
    return payload;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

/**
 * Check if token is valid
 */
export function isTokenValid(token) {
  const payload = decodeToken(token);
  return payload !== null;
}

/**
 * Get user role from token
 */
export function getTokenRole(token) {
  const payload = decodeToken(token);
  return payload?.role || null;
}
