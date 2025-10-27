import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import img from '../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

   const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>

        <FormControl sx={{ ...formControl }}>
          <TextField
            label="Search"
            variant="filled"
            type="search"
            value={props.titleFilter}
            onChange={(e) => handleChange(e, "name", e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <TextField
            select
            label="Genre"
            variant="filled"
            value={props.genreFilter}
            onChange={(e) => handleChange(e, "genre", e.target.value)}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <TextField
            select
            label="Minimum Rating"
            variant="filled"
            value={props.ratingFilter}
            onChange={(e) => handleChange(e, "rating", e.target.value)}
          >
            {["0","5","6","7","8"].map((value) => (
              <MenuItem key={value} value={value}>
                {value === "0" ? "All" : `${value}+`}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <TextField
            label="Release Year"
            variant="filled"
            value={props.yearFilter}
            onChange={(e) => handleChange(e, "year", e.target.value)}
            placeholder="e.g. 2023"
          />
        </FormControl>

      </CardContent>

      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}
