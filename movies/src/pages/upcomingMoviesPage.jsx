import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  const handleAddToPlayList = (movie) => (
    <IconButton>
      <PlaylistAddIcon color="primary"  />
    </IconButton>
  );

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={handleAddToPlayList}
    />
  );
};

export default UpcomingMoviesPage;
