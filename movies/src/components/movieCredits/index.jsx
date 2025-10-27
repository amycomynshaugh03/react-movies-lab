import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { Link } from "react-router";

const MovieCredits = ({ movieId }) => {
  const { data: credits, error, isLoading, isError } = useQuery({
    queryKey: ["movieCredits", { id: movieId }],
    queryFn: () => getMovieCredits(movieId),
  });

  if (isLoading) return <p>Loading credits...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const imageBase = "https://image.tmdb.org/t/p/w185"; // small poster size

  return (
    <div>
      <h2>Cast</h2>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap" }}>
        {credits.cast.slice(0, 10).map((person, index) => (
          <li key={`${person.id}-${index}`} style={{ margin: "1rem", textAlign: "center" }}>
            {person.profile_path && (
              <img
                src={`${imageBase}${person.profile_path}`}
                alt={person.name}
                style={{ width: "100px", borderRadius: "8px" }}
              />
            )}
            <div>
              <Link to={`/actors/${person.id}`}>{person.name}</Link>
            </div>
            <div><em>{person.character}</em></div>
          </li>
        ))}
      </ul>

      <h2>Crew</h2>
      <ul>
        {credits.crew.slice(0, 10).map((person, index) => (
          <li key={`${person.id}-${index}`}>
            {person.name} — {person.job}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
