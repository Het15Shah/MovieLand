const API_URL = import.meta.env.VITE_API_URL?.replace('http://', 'https://');

export const fetchMovies = async (search, page = 1, type = "") => {
  if (!API_URL) throw new Error("API URL is missing. Please restart your local server.");
  
  const typeParam = type && type !== "all" ? `&type=${type}` : "";
  const response = await fetch(`${API_URL}&s=${search}&page=${page}${typeParam}`);
  const data = await response.json();
  
  if (data.Response === "True") {
    return { movies: data.Search, totalResults: parseInt(data.totalResults) };
  } else {
    throw new Error(data.Error);
  }
};

export const fetchMovieDetails = async (id) => {
  if (!API_URL) throw new Error("API URL is missing.");
  
  const response = await fetch(`${API_URL}&i=${id}&plot=full`);
  const data = await response.json();
  
  if (data.Response === "True") {
    return data;
  } else {
    throw new Error(data.Error);
  }
};
