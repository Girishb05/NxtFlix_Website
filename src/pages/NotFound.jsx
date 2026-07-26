import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-heading">Page Not Found</h2>
        <p className="not-found-text">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="not-found-link">
          Back to Home
        </Link>
      </div>
    )
  }
}

export default NotFound
