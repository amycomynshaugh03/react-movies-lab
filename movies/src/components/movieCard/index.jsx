import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import { Grid, Grow } from "@mui/material";
import { Link } from "react-router";
import img from "../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action, isPlaylistPage = false, showPlaylistButton = true }) {
  const { favorites, playlist, addToPlaylist, removeFromPlaylist } = useContext(MoviesContext);
  const isInPlaylist = playlist.find((m) => m.id === movie.id);

  const handlePlaylistAction = (e) => {
    e.preventDefault();
    if (isPlaylistPage) removeFromPlaylist(movie);
    else isInPlaylist ? removeFromPlaylist(movie) : addToPlaylist(movie);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in timeout={300}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 300,
            height: 500,
            m: 1,
            boxShadow: 3,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "translateY(-10px)", boxShadow: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 350 }}
            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
            alt={movie.title}
          />
          <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
              title={movie.title}
            >
              {movie.title}
            </Typography>
            <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="subtitle2">{movie.release_date}</Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <StarRateIcon fontSize="small" sx={{ mr: 0.5, color: "#fbc02d" }} />
                <Typography variant="subtitle2">{movie.vote_average.toFixed(1)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            {action && action(movie)}
            {showPlaylistButton && (
              <IconButton sx={{ "&:hover": { transform: "scale(1.2)", transition: "0.2s" } }} onClick={handlePlaylistAction}>
                {isPlaylistPage ? <DeleteIcon color="error" /> : <PlaylistAddIcon color={isInPlaylist ? "primary" : "default"} />}
              </IconButton>
            )}
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  background: "linear-gradient(90deg, #6ec1e4, #00aaff)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(90deg, #00aaff, #6ec1e4)",
                    transform: "scale(1.05)"
                  }
                }}
              >
                More Info
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grow>
    </Grid>
  );
}
