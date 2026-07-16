import React, { useState, useEffect } from "react";
import SearchIcon from "../search.svg";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [isListening, setIsListening] = useState(false);

  // Auto-search (debounce) as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        onSearch(searchTerm);
      }
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Search.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      setSearchTerm(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search movies or click mic to speak..."
      />
      <button 
        className={`mic-btn ${isListening ? 'listening' : ''}`} 
        onClick={handleVoiceSearch} 
        title="Voice Search"
      >
        {isListening ? "🎙️" : "🎤"}
      </button>
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => onSearch(searchTerm)}
      />
    </div>
  );
};

export default SearchBar;
