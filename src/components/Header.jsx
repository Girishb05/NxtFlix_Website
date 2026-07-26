import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { WatchLaterContext } from '../context/WatchLaterContext'
import { removeToken } from '../utils/cookies'
import './Header.css'

class Header extends React.Component {
  // This lets the class component read WatchLaterContext through
  // this.context, without needing the useContext hook.
  static contextType = WatchLaterContext

  handleLogoutClick = () => {
    removeToken()
    this.props.navigate('/login')
  }

  render() {
    const watchLaterCount = this.context.watchLater.length

    return (
      <header className="header">
        <Link to="/" className="header-brand">
          NXTFLIX
        </Link>

        <nav className="header-nav" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/watch-later" className="header-watch-later-link">
            Watch Later
            {watchLaterCount > 0 && <span className="header-badge">{watchLaterCount}</span>}
          </Link>
          <button className="header-logout" onClick={this.handleLogoutClick}>
            Logout
          </button>
        </nav>
      </header>
    )
  }
}

// Wrapper so the class component can still use react-router's navigate function.
function HeaderWithNavigate() {
  const navigate = useNavigate()
  return <Header navigate={navigate} />
}

export default HeaderWithNavigate
