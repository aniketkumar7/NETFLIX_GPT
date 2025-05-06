import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    nowtrailer: null,
    PopularMovies: null,
    TopRatedMovies: null,
    trendingMovies: null,
    upcomingMovies: null,
    movieInfo: null,
    cast: null,
    similarMovies: null,
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addnowtrailer: (state, action) => {
      state.nowtrailer = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.PopularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.TopRatedMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMovieInfo: (state, action) => {
      state.movieInfo = action.payload;
    },
    addCast: (state, action) => {
      state.cast = action.payload;
    },
    removeCast: (state) => {
      state.cast = null;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    }
  },
});

export default moviesSlice.reducer;
export const {
  addnowPlayingMovies,
  addnowtrailer,
  addPopularMovies,
  addTopRatedMovies,
  addTrendingMovies,
  addUpcomingMovies,
  addMovieInfo,
  addCast,
  removeCast,
  addSimilarMovies
} = moviesSlice.actions;
