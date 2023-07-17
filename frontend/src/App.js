import { useState } from 'react';
import './App.css';
import { Autocomplete, TextField, Paper, Box } from "@mui/material";

const allMovies = [
  { title: 'Mean Girls' },
  { title: 'Hackers' },
  { title: 'The Grey' },
  { title: 'Sunshine' },
  { title: 'Ex Machina' },
];

function App() {
  const [movies, setMovies] = useState(allMovies);

  return (
    <div className="App">
      <Box className="boxes-container" sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, marginBottom: 6 }}>
        {movies.map((movie, index) => (
          <Box component={Paper} sx={{width: 200, height: 100, margin: 2 }} key={index} elevation={3}>
            <p>{movie.title}</p>
          </Box>
        ))}
      </Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allMovies.map((option) => option.title)}
        className="autocomplete"
        sx={{width:300}}
        renderInput={(params) => <TextField {...params} label="Movie" variant="outlined" />}
        onInputChange={(event, newInputValue) => {
          setMovies(
            allMovies.filter((movie) =>
              movie.title.toLowerCase().includes(newInputValue.toLowerCase())
            )
          );
        }}
      />
    </div>
  );
}

export default App;
