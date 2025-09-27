const API_KEY = "00b0287e01677b0d03eed86e9c785592";
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    const results = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await results.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const results = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await results.json();
    return data.results;
}