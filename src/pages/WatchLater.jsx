import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import MovieCard from '../components/MovieCard'
import { WatchLaterContext } from '../context/WatchLaterContext'
import './WatchLater.css'

class WatchLater extends React.Component {
  // Lets this class component read the Watch Later list through
  // this.context, without needing the useContext hook.
  static contextType = WatchLaterContext

  render() {
    const watchLaterMovies = this.context.watchLater

    return (
      <div className="watch-later-page">
        <Header />

        <div className="watch-later-content">
          <h1>Watch Later</h1>

          {watchLaterMovies.length === 0 ? (
            <div className="watch-later-empty">
              <p>Your Watch Later list is empty.</p>
              <Link to="/" className="watch-later-browse-link">
                Browse Movies
              </Link>
            </div>
          ) : (
            <div className="movie-grid">
              {watchLaterMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default WatchLater
