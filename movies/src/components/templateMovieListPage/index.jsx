import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const genreId = Number(genreFilter);

  const keywords = nameFilter.toLowerCase().trim().split(" ").filter(Boolean);

  let displayedMovies = movies
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => (ratingFilter === "0" ? true : m.vote_average >= Number(ratingFilter)))
    .filter((m) => !yearFilter || m.release_date.startsWith(yearFilter))
    .filter((m) => {
      return keywords.every((kw) =>
        m.title.toLowerCase().includes(kw) ||
        (m.overview && m.overview.toLowerCase().includes(kw)) ||
        (m.director && m.director.toLowerCase().includes(kw)) ||
        (m.actors && m.actors.some(a => a.toLowerCase().includes(kw)))
      );
    })
    .slice();

  if (sortBy) {
    switch (sortBy) {
      case "title-asc":
        displayedMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        displayedMovies.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "release-asc":
        displayedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case "release-desc":
        displayedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case "rating-asc":
        displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case "rating-desc":
        displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "runtime":
        displayedMovies.sort((a, b) => (b.runtime || 0) - (a.runtime || 0));
        break;
      default:
        break;
    }
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            yearFilter={yearFilter}
            sortBy={sortBy}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
