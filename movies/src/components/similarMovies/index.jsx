import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query"; 
import { getSimilarMovies } from "../../api/tmdb-api";

const SimilarMovies = ({ movieId }) => {
  const { data: similarMovies, isLoading, isError, error } = useQuery({
    queryKey: ["similarMovies", { id: movieId }],
    queryFn: getSimilarMovies,
  });

  if (isLoading) return <p>Loading similar movies...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const movies = similarMovies || []; // safe fallback

  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Similar Movies</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {movies.slice(0, 8).map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
            <div style={{ width: "150px", textAlign: "center" }}>
              {m.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                  alt={m.title}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              ) : (
                <p>No image</p>
              )}
              <p>{m.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
