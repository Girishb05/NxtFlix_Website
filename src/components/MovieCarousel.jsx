import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCarousel.css'

class MovieCarousel extends React.Component {
  render() {
    const title = this.props.title
    const movies = this.props.movies
    const direction = this.props.direction || 'left'

    // The list is duplicated so the CSS animation can loop seamlessly:
    // once the track has scrolled through the first copy, it snaps back
    // to the start of the (identical) second copy without a visible jump.
    const duplicatedMovies = [...movies, ...movies]

    // Longer lists get a longer animation so every carousel scrolls at
    // roughly the same visual speed no matter how many movies it holds.
    const animationSeconds = movies.length * 4

    return (
      <section className="carousel-section">
        <h2 className="carousel-title">{title}</h2>

        <div className="carousel-viewport">
          <div
            className={`carousel-track carousel-track-${direction}`}
            style={{ animationDuration: `${animationSeconds}s` }}
          >
            {duplicatedMovies.map((movie, index) => (
              <Link to={`/movies/${movie.id}`} className="carousel-item" key={`${movie.id}-${index}`}>
                <img className="carousel-item-poster" src={movie.poster} alt={movie.title} />
                <div className="carousel-item-overlay">
                  <p className="carousel-item-title">{movie.title}</p>
                  <p className="carousel-item-meta">{movie.genre} · {movie.rating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default MovieCarousel
