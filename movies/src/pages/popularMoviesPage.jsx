import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavourites'
import { getPopularMovies } from "../api/tmdb-api";

const popularMoviesPage = () => {
 const { data, error, isPending, isError  } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopularMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data;

     return (
  <PageTemplate
    title="Popular Movies"
    movies={movies}
    action={(movie) => <AddToFavoritesIcon movie={movie} />}
  />
);

   
}
export default popularMoviesPage;