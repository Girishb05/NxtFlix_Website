import React from 'react'
import { GENRES } from '../data/movies'
import './GenreFilterBar.css'

class GenreFilterBar extends React.Component {
  render() {
    const activeGenre = this.props.activeGenre
    const onGenreClick = this.props.onGenreClick

    return (
      <div className="genre-filter-bar">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={genre === activeGenre ? 'genre-chip genre-chip-active' : 'genre-chip'}
            onClick={() => onGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    )
  }
}

export default GenreFilterBar
