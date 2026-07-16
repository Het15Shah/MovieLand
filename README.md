# 🎬 MovieLand

MovieLand is a sleek, responsive React web application that allows users to search for their favorite movies and TV shows. It utilizes the OMDb API to fetch and display movie posters, titles, years, and types in a beautiful, grid-based layout.

## ✨ Features

- **Search Functionality:** Easily search for any movie or TV series.
- **Responsive Design:** Fully responsive layout that looks great on mobile, tablet, and desktop screens.
- **Dynamic Data:** Fetches real-time data from the [OMDb API](http://www.omdbapi.com/).
- **Modern UI/UX:** Features a sleek dark mode theme with glassmorphism effects and smooth hover animations.
- **Interactive States:** Includes loading spinners and error handling for a seamless user experience.

## 🚀 Live Demo
*(You can add your deployed link here)*

## 🛠️ Tech Stack

- **React.js** - Frontend JavaScript library
- **Vanilla CSS** - Styling and animations
- **OMDb API** - Movie data source

## ⚙️ Getting Started

### Prerequisites

You will need Node.js installed on your machine. You will also need to get a free API key from OMDb API.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/react-movie-project.git
   cd react-movie-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your OMDb API key:
     ```env
     REACT_APP_API_URL=https://www.omdbapi.com?apikey=YOUR_API_KEY
     ```

4. **Run the application:**
   ```bash
   npm start
   ```
   The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📂 Project Structure

```text
├── public/          # Public assets and index.html
├── src/
│   ├── App.css      # Global styles and responsive rules
│   ├── App.js       # Main application component and API logic
│   ├── index.js     # React application entry point
│   ├── MovieCard.jsx# Reusable movie display component
│   └── search.svg   # Search icon asset
├── .env             # Environment variables (API Key)
└── package.json     # Project metadata and dependencies
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
