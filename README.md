# 🎬 MovieLand: Premium Movie Discovery App

MovieLand is a highly interactive, beautifully designed movie discovery web application built with modern React. It allows users to search, filter, and save their favorite movies, series, and episodes using the OMDb API. 

This project was built with a heavy focus on **performance**, **scalability**, and **premium UI/UX**, showcasing advanced React architectural patterns and modern web APIs.

## ✨ Features

- 🎙️ **Voice Search Integration:** Uses the native browser Web Speech API to allow users to search for movies entirely hands-free.
- ⚡ **Debounced Auto-Search:** Automatically fetches results as you type with an 800ms debounce to prevent unnecessary API calls and rate limiting.
- 🔗 **Shareable Links:** Implements native History API syncing to update the URL dynamically (`?movie=tt1234567`). Copying and sharing the link instantly opens the exact movie modal for the recipient.
- 💖 **Favorites Watchlist:** Users can add movies to their personal favorites tab, which is persistently stored using a custom `localStorage` hook.
- 🎬 **Trailer Integration:** Direct integration with YouTube search to instantly find and play official trailers for any specific movie.
- 🦴 **Cinematic Skeleton Loaders:** Uses highly polished, animated skeleton cards that mirror the movie grid to provide a premium loading experience.
- 📱 **Responsive Glassmorphism UI:** Features a completely custom-built CSS architecture utilizing frosted glass effects, cinematic ambient background glows, and sleek, fluid animations.
- 🛡️ **Robust Fallbacks:** Implements reliable `onError` image handlers to substitute broken API poster links with high-quality cinematic placeholder images.

## 🛠️ Tech Stack

- **Framework:** React 18 (migrated from CRA to **Vite** for optimized HMR and build speeds).
- **Styling:** Vanilla CSS3 (Custom properties, Flexbox/Grid, Animations, Glassmorphism).
- **Data Fetching:** Fetch API interacting with the [OMDb API](http://www.omdbapi.com/).


## 🚀 Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Het15Shah/MovieLand.git
   ```
2. Navigate into the directory:
   ```bash
   cd movieland
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add your OMDb API key:
     ```env
     VITE_API_URL=https://www.omdbapi.com?apikey=YOUR_KEY_HERE
     ```
5. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
