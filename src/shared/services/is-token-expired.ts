const jwtDecode = require('jwt-decode');

export function isTokenExpired(accessToken: string): boolean {
  const jwt = jwtDecode(accessToken);
  const now = Date.now() / 1000;
  return jwt.exp < (now - 60 * 60 * 30); // expires in 30 minutes
}
