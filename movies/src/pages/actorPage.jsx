import React from "react";
import { useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const ActorPage = () => {
  const { id } = useParams();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getPersonDetails,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const actor = data;

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            style={{ borderRadius: "1em" }}
          />
        )}
        <Box>
          <Typography variant="h4" gutterBottom>
            {actor.name}
          </Typography>
          <Typography variant="subtitle1">
            Born: {actor.birthday} {actor.place_of_birth && `in ${actor.place_of_birth}`}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {actor.biography || "No biography available."}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActorPage;
