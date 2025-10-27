import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from '@mui/icons-material/Delete'; // trash bin icon
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import img from "../images/film-poster-placeholder.png";
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';

export default function MovieCard({ movie, action, isPlaylistPage = false }) {
   const { favorites, addToFavorites, playlist, addToPlaylist, removeFromPlaylist } = useContext(MoviesContext);
   const isFavorite = favorites.includes(movie.id);
   const isInPlaylist = playlist.find((m) => m.id === movie.id);

   const handleAddToFavorite = (e) => {
     e.preventDefault();
     addToFavorites(movie);
   };

   const handlePlaylistAction = (e) => {
     e.preventDefault();
     if (isPlaylistPage) {
       removeFromPlaylist(movie);
     } else {
       isInPlaylist ? removeFromPlaylist(movie) : addToPlaylist(movie);
     }
   };

   return (
     <Card>
       <CardHeader
         avatar={
           isFavorite ? (
             <Avatar sx={{ backgroundColor: 'red' }}>
               <FavoriteIcon />
             </Avatar>
           ) : null
         }
         title={
           <Typography variant="h5" component="p">
             {movie.title}{" "}
           </Typography>
         }
       />

       <CardMedia
         sx={{ height: 500 }}
         image={
           movie.poster_path
             ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
             : img
         }
       />
       <CardContent>
         <Grid container>
           <Grid size={{ xs: 6 }}>
             <Typography variant="h6" component="p">
               <CalendarIcon fontSize="small" /> {movie.release_date}
             </Typography>
           </Grid>
           <Grid size={{ xs: 6 }}>
             <Typography variant="h6" component="p">
               <StarRateIcon fontSize="small" /> {movie.vote_average}
             </Typography>
           </Grid>
         </Grid>
       </CardContent>
       <CardActions disableSpacing>
         {action && action(movie)}
         <IconButton onClick={handlePlaylistAction}>
           {isPlaylistPage ? <DeleteIcon color="error" /> : <PlaylistAddIcon color={isInPlaylist ? "primary" : "default"} />}
         </IconButton>
         <Link to={`/movies/${movie.id}`}>
           <Button variant="outlined" size="medium" color="primary">
             More Info ...
           </Button>
         </Link>
       </CardActions>
     </Card>
   );
}
