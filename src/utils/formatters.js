// Builds the small "genre · year · duration" meta line used on movie cards.
export function formatMetaLine(movie) {
  return `${movie.genre} · ${movie.year} · ${movie.duration}`
}
