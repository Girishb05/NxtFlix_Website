import Cookies from 'js-cookie'

// Simple helper functions to work with the jwt_token cookie.
// Keeping these in one place so every page uses the same cookie name.

const TOKEN_COOKIE_NAME = 'jwt_token'

export function saveToken(token) {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7 })
}

export function getToken() {
  return Cookies.get(TOKEN_COOKIE_NAME)
}

export function removeToken() {
  Cookies.remove(TOKEN_COOKIE_NAME)
}
