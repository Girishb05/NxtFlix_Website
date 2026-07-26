import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../api/auth'
import { saveToken } from '../utils/cookies'
import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true, errorMessage: '' })

    try {
      const token = await signIn(this.state.email, this.state.password)
      saveToken(token)
      this.props.navigate('/')
    } catch (error) {
      this.setState({ isLoading: false, errorMessage: error.message })
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-brand-panel">
          <h1 className="login-logo">NXTFLIX</h1>
          <p className="login-tagline">
            Unlimited movies, shows and more. Watch anywhere. Cancel anytime.
          </p>
        </div>

        <div className="login-form-panel">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2 className="login-form-title">Sign In</h2>

            {this.state.errorMessage && (
              <p className="login-error-banner" role="alert">
                {this.state.errorMessage}
              </p>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={this.state.email}
              onChange={this.handleEmailChange}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <button type="submit" disabled={this.state.isLoading}>
              {this.state.isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// Wrapper so the class component can still use react-router's navigate function.
function LoginWithNavigate() {
  const navigate = useNavigate()
  return <Login navigate={navigate} />
}

export default LoginWithNavigate
