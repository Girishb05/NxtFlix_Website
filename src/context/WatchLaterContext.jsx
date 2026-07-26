import React from 'react'

const STORAGE_KEY = 'nxtflix_watch_later'

// Reads the saved Watch Later list from localStorage.
// If the value is missing or not valid JSON, this returns an empty list.
function readSavedList() {
  try {
    const savedText = localStorage.getItem(STORAGE_KEY)
    const savedList = JSON.parse(savedText)
    return Array.isArray(savedList) ? savedList : []
  } catch (error) {
    return []
  }
}

export const WatchLaterContext = React.createContext(null)

// This is a plain class component, not a hook-based context provider.
// Class components can read this.context using "static contextType",
// so nothing here needs useContext.
export class WatchLaterProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      watchLater: readSavedList()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.watchLater !== this.state.watchLater) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.watchLater))
    }
  }

  isInWatchLater = (id) => {
    return this.state.watchLater.some((movie) => movie.id === id)
  }

  toggleWatchLater = (movie) => {
    const alreadySaved = this.isInWatchLater(movie.id)

    if (alreadySaved) {
      this.setState((prevState) => ({
        watchLater: prevState.watchLater.filter((item) => item.id !== movie.id)
      }))
    } else {
      this.setState((prevState) => ({
        watchLater: [...prevState.watchLater, movie]
      }))
    }
  }

  render() {
    const contextValue = {
      watchLater: this.state.watchLater,
      isInWatchLater: this.isInWatchLater,
      toggleWatchLater: this.toggleWatchLater
    }

    return (
      <WatchLaterContext.Provider value={contextValue}>
        {this.props.children}
      </WatchLaterContext.Provider>
    )
  }
}
