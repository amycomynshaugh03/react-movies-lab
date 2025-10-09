import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites';

const UpcomingMoviesPage = () => {

  const { data: movies, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies, // returns an array directly
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error?.message || "Failed to fetch upcoming movies"}</h1>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies || []} // ensure fallback
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
