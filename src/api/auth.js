const LOGIN_URL = 'https://serverless-api-teal.vercel.app/api/auth/signin'

// Signs the user in with email and password.
// On success, returns the token string.
// On failure, throws an Error with the message from the API.
export async function signIn(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const responseJson = await response.json()

  if (!response.ok) {
    throw new Error(responseJson.message || responseJson.error || 'Something went wrong')
  }

  return extractToken(responseJson)
}

// The API can send the token back under a few different field names,
// so this checks each of them one at a time.
function extractToken(responseJson) {
  if (responseJson.jwt_token) {
    return responseJson.jwt_token
  }
  if (responseJson.token) {
    return responseJson.token
  }
  if (responseJson.jwtToken) {
    return responseJson.jwtToken
  }
  if (responseJson.data && responseJson.data.token) {
    return responseJson.data.token
  }
  return null
}
