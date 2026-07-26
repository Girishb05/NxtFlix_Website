import React from 'react'
import { Link } from 'react-router-dom'
import { formatMetaLine } from '../utils/formatters'
import './MovieCard.css'

class MovieCard extends React.Component {
  render() {
    const movie = this.props.movie

    return (
      <Link to={`/movies/${movie.id}`} className="movie-card">
        <div className="movie-card-poster-wrap">
          <img className="movie-card-poster" src={movie.poster} alt={movie.title} />

          <span className="movie-card-rating">
            <span className="movie-card-star">★</span>
            {movie.rating}
          </span>

          <span className="movie-card-play-overlay">▶</span>
        </div>

        <p className="movie-card-title">{movie.title}</p>
        <p className="movie-card-meta">{formatMetaLine(movie)}</p>
      </Link>
    )
  }
}

export default MovieCard
