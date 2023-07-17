import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Paper } from "@mui/material";

export default function Movie() {
  const { title } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8081/movie/${title}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data[0]); 
      })
      .catch(err => console.error(err));
  }, [title]);

  return (
    <Box component={Paper} sx={{width: 200, height: 100, margin: 2}}>
        <p>{movie.title}</p>
        <p>{movie.director}</p>
        <p>{movie.year}</p>
    </Box>
  );
}
