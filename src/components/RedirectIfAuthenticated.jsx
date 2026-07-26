import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/cookies'

// Used only on the /login route.
// If the user already has a token, send them to the Home page instead.
function RedirectIfAuthenticated(props) {
  const token = getToken()

  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  return props.children
}

export default RedirectIfAuthenticated
