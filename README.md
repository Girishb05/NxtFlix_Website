# Nxtflix

A movie browsing app built with React and React Router: sign in, browse
carousels and a genre-filterable grid, view movie details, and save movies
to a Watch Later list that persists in the browser.

This project intentionally uses **class components only** (no `useState` /
`useEffect` hooks). State lives in the constructor, data loads in
`componentDidMount`, and event handlers are ordinary class methods.

React Router's `useNavigate` and `useParams` only exist as hooks, so each
one is read once in a tiny wrapper function at the bottom of a file and
passed into the class component as a normal prop. The Watch Later context
is read the same hook-free way, using `static contextType` on the class
instead of `useContext`.

## Project structure

```
src/
  main.jsx                          -> renders <App /> only
  App.jsx                           -> WatchLaterProvider + BrowserRouter + routes
  index.css                         -> global color tokens and base styles
  api/
    auth.js                         -> signIn(email, password) API call
  context/
    WatchLaterContext.jsx           -> class-based provider, backed by localStorage
  components/
    Header.jsx / Header.css         -> sticky nav, Watch Later badge, logout
    MovieCard.jsx / MovieCard.css   -> poster card used in grids
    MovieCarousel.jsx / .css        -> auto-scrolling carousel row
    GenreFilterBar.jsx / .css       -> genre filter chips
    ProtectedRoute.jsx              -> redirects to /login if no token
    RedirectIfAuthenticated.jsx     -> redirects logged-in users away from /login
  pages/
    Login.jsx / Login.css           -> /login
    Home.jsx / Home.css             -> / (hero, carousels, genre grid)
    MovieDetails.jsx / .css         -> /movies/:id
    WatchLater.jsx / .css           -> /watch-later
    NotFound.jsx / .css             -> /not-found and *
  data/
    movies.js                       -> the static 50-movie catalog + GENRES
  utils/
    cookies.js                      -> get/set/remove the jwt_token cookie
    formatters.js                   -> "genre · year · duration" helper
```

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at **http://localhost:3000**.

To create a production build (output goes to `build/`, not the Vite default `dist/`):

```bash
npm run build
npm run preview
```

## Test credentials

```
Email:    admin@example.com
Password: admin123
```

## How authentication works

1. The Sign In form calls `signIn(email, password)` in `src/api/auth.js`,
   which posts to the login endpoint.
2. On success, the token is pulled out of the response body (checking
   `jwt_token`, `token`, `jwtToken`, and `data.token`, since the API may
   use any of these) and saved in a cookie named `jwt_token` that expires
   in 7 days.
3. On failure, the API's error message is shown on the Sign In page and
   the user stays there.
4. `ProtectedRoute` checks for the `jwt_token` cookie before showing `/`,
   `/movies/:id`, or `/watch-later`; if it's missing, the user is sent to
   `/login`. Logging out removes the cookie and returns to `/login`.

## How Watch Later works

- `WatchLaterProvider` (a class component) loads the saved list from
  `localStorage` (key `nxtflix_watch_later`) when the app starts, and
  writes it back to `localStorage` every time the list changes.
- The list stores full movie objects, not just ids.
- Any class component can read `watchLater`, `isInWatchLater(id)`, and
  `toggleWatchLater(movie)` through `this.context`, by declaring
  `static contextType = WatchLaterContext` — no hooks involved.
- Adding or removing only happens on the Movie Details page; the Watch
  Later page itself is read-only and just lists whatever has been saved.

## Movie data

Movie data is static, not fetched from any API. All 50 movies live in
`src/data/movies.js`, copied exactly from the spec's JSON, with a named
`GENRES` export used by the genre filter bar.

## Challenges, assumptions, and deployment notes

**Assumptions**
- "No hooks" is followed everywhere except the two places where React
  Router itself only offers a hook API (`useNavigate`, `useParams`); those
  are isolated in one-line wrapper functions so the class components never
  touch a hook directly.
- The Watch Later context also avoids `useContext` by using the class-based
  `static contextType` pattern instead, which is plain class-component API,
  not a hook.
- "Trending Now" sorts the full catalog by `Number(rating)` descending and
  takes the top 16; ties keep their original catalog order since `Array.sort`
  is stable in modern JS engines.
- "Fresh Releases" filters for `year >= 2015` and takes the first 16 matches
  in catalog order, rather than re-sorting by year.
- The carousel duplicates its movie list once and loops with a plain CSS
  keyframe animation (`translateX`) rather than JavaScript-driven scrolling,
  which keeps the component simple and avoids needing any timers or hooks.
  Hovering or focusing the track pauses the animation.

**Challenges**
- Reaching into React Router's hook-only APIs from class components was the
  main challenge; solved with the small `XWithNavigate` / `XWithParams`
  wrapper functions at the bottom of each affected file.
- Getting the carousel to loop seamlessly without JavaScript required
  duplicating the movie list and animating exactly to `-50%`, so the track
  "resets" into an identical copy of itself instead of visibly jumping.

**Deployment**
- No environment variables are required — the login URL is hardcoded per
  the spec, and movie data ships with the app.
- The production build outputs to `build/` (configured in `vite.config.js`),
  which is the folder to point Vercel or Netlify at.
- Deploying to Vercel/Netlify needs a SPA fallback rule so direct visits or
  refreshes on routes like `/movies/12` or `/watch-later` serve `index.html`
  instead of 404ing at the host level before React Router loads.
- Watch Later data is stored in the browser's `localStorage`, so it is
  per-browser/per-device and won't sync across devices or browsers.
