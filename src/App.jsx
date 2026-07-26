import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WatchLaterProvider } from './context/WatchLaterContext'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'
import Login from './pages/Login'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import WatchLater from './pages/WatchLater'
import NotFound from './pages/NotFound'

// App.jsx wraps everything in WatchLaterProvider (so any page can read
// the Watch Later list) and BrowserRouter (so the whole app works even
// if some outer tool only ever loads App.jsx).
function App() {
  return (
    <WatchLaterProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/watch-later"
            element={
              <ProtectedRoute>
                <WatchLater />
              </ProtectedRoute>
            }
          />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </WatchLaterProvider>
  )
}

export default App
