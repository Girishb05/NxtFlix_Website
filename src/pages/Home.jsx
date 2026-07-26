import React from 'react'
import Header from '../components/Header'
import MovieCarousel from '../components/MovieCarousel'
import GenreFilterBar from '../components/GenreFilterBar'
import MovieCard from '../components/MovieCard'
import movies from '../data/movies'
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeGenre: 'All'
    }
  }

  handleGenreClick = (genre) => {
    this.setState({ activeGenre: genre })
  }

  getTrendingMovies = () => {
    // Sort a copy of the list by rating, highest first, then take the top 16.
    const sortedByRating = [...movies].sort((a, b) => Number(b.rating) - Number(a.rating))
    return sortedByRating.slice(0, 16)
  }

  getFreshReleases = () => {
    return movies.filter((movie) => movie.year >= 2015).slice(0, 16)
  }

  getFilteredMovies = () => {
    if (this.state.activeGenre === 'All') {
      return movies
    }
    return movies.filter((movie) => movie.genre === this.state.activeGenre)
  }

  render() {
    const trendingMovies = this.getTrendingMovies()
    const freshReleases = this.getFreshReleases()
    const filteredMovies = this.getFilteredMovies()

    return (
      <div className="home-page">
        <Header />

        <section className="hero">
          <h1 className="hero-title">Discover your next favourite</h1>
          <p className="hero-subtitle">
            Browse {movies.length} movies across every genre, and save the ones you love to your Watch Later list.
          </p>
        </section>

        <MovieCarousel title="Trending Now" movies={trendingMovies} direction="left" />
        <MovieCarousel title="Fresh Releases" movies={freshReleases} direction="right" />

        <section className="movie-grid-section">
          <GenreFilterBar activeGenre={this.state.activeGenre} onGenreClick={this.handleGenreClick} />

          {filteredMovies.length === 0 ? (
            <p className="movie-grid-empty">No movies found for this genre.</p>
          ) : (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    )
  }
}

export default Home
