import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { WatchLaterContext } from '../context/WatchLaterContext'
import movies from '../data/movies'
import './MovieDetails.css'

class MovieDetails extends React.Component {
  // Lets this class component read the Watch Later list and its
  // toggle function through this.context, without useContext.
  static contextType = WatchLaterContext

  handleGoBackClick = () => {
    this.props.navigate(-1)
  }

  handleWatchLaterClick = (movie) => {
    this.context.toggleWatchLater(movie)
  }

  render() {
    const movieId = Number(this.props.id)
    const movie = movies.find((item) => item.id === movieId)

    // If nothing matches this id, send the user to the Not Found page.
    if (!movie) {
      return <Navigate to="/not-found" replace />
    }

    const isSaved = this.context.isInWatchLater(movie.id)

    return (
      <div className="movie-details-page">
        <Header />

        <div className="movie-details-backdrop" style={{ backgroundImage: `url(${movie.backdrop})` }}>
          <div className="movie-details-backdrop-fade" />
        </div>

        <div className="movie-details-content">
          <img className="movie-details-poster" src={movie.poster} alt={movie.title} />

          <div className="movie-details-info">
            <button className="movie-details-back" onClick={this.handleGoBackClick}>
              ← Go Back
            </button>

            <h1 className="movie-details-title">{movie.title}</h1>

            <div className="movie-details-meta">
              <span className="movie-details-genre-tag">{movie.genre}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="movie-details-rating">★ {movie.rating}</span>
            </div>

            <p className="movie-details-overview">{movie.overview}</p>

            <button
              className={isSaved ? 'watch-later-button watch-later-button-added' : 'watch-later-button'}
              onClick={() => this.handleWatchLaterClick(movie)}
            >
              {isSaved ? '✓ Added to Watch Later' : '+ Watch Later'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// Wrapper so the class component can read the :id route param
// and use react-router's navigate function.
function MovieDetailsWithRouter() {
  const params = useParams()
  const navigate = useNavigate()
  return <MovieDetails id={params.id} navigate={navigate} />
}

export default MovieDetailsWithRouter
