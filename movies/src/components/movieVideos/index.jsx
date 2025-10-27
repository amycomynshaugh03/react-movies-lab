import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MovieVideos = ({ movieId }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["videos", { id: movieId }],
    queryFn: getMovieVideos,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const videos = data.results.filter((v) => v.site === "YouTube");

  if (videos.length === 0) {
    return <Typography variant="h6">No videos available for this movie.</Typography>;
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h5" gutterBottom>
        Official Videos
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {videos.map((video) => (
          <iframe
            key={video.id}
            width="360"
            height="200"
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            allowFullScreen
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieVideos;
