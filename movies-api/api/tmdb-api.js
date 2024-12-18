import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
  try {
    console.log('Fetching upcoming movies from TMDB...');
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      console.error('Error fetching upcoming movies:', response.status, response.statusText);
      throw new Error('Failed to fetch upcoming movies');
    }

    const data = await response.json();
    console.log('Upcoming movies fetched:', data);  // Log the data for debugging
    return data;
  } catch (error) {
    console.error('Error in getUpcomingMovies:', error);
    throw error;  // Rethrow to propagate error to your route handler
  }
};
