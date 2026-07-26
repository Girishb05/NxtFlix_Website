import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/cookies'

// Checks if the jwt_token cookie exists.
// If it exists, it shows the page. If not, it sends the user to /login.
// No state is needed here, so this stays a plain function, not a hook.
function ProtectedRoute(props) {
  const token = getToken()

  if (token === undefined) {
    return <Navigate to="/login" replace />
  }

  return props.children
}

export default ProtectedRoute
