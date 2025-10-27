import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";

const MovieCredits = ({ movieId }) => {
  const {
    data: credits,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  if (isLoading) {
    return <p>Loading credits...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Cast</h2>
      <ul>
        {credits.cast.slice(0, 10).map((person) => (
          <li key={person.id}>
            {person.name} — <em>{person.character}</em>
          </li>
        ))}
      </ul>

      <h2>Crew</h2>
      <ul>
        {credits.crew.slice(0, 10).map((person) => (
          <li key={person.id}>
            {person.name} — <em>{person.job}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
