import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import { Autocomplete, TextField, Paper, Box, CircularProgress } from "@mui/material";
import Movie from './Movie.js'

export const AppContext = createContext()

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />; 
  }

  return (
    <Router>
      <AppContext.Provider value={movies}>
        <Routes>
          <Route path="/" element={<Home movies={movies} setFilteredMovies={setFilteredMovies} filteredMovies={filteredMovies} />} />
          <Route path="/movie/:title" element={<Movie/>}/>
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

function Home({ movies, setFilteredMovies, filteredMovies }) {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Box className="boxes-container" sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, marginBottom: 6 }}>
        {filteredMovies.map((movie, index) => (
          <Box 
            component={Paper} 
            sx={{width: 200, height: 100, margin: 2,':hover': { boxShadow: '0 0 11px rgba(33,33,33,.2)', cursor: 'pointer' }}} 
            key={index} 
            elevation={3}
            onClick={() => navigate(`/movie/${movie.title}`)}
          >
            <p>{movie.title}</p>
          </Box>
        ))}
      </Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={movies.map((option) => option.title)}
        className="autocomplete"
        sx={{width:300}}
        renderInput={(params) => <TextField {...params} placeholder="Movies" />}
        onInputChange={(event, newInputValue) => {
         
          setFilteredMovies(
            movies.filter((movie) =>
              movie.title.toLowerCase().includes(newInputValue.toLowerCase())
            )
          );
        }}
      />
    </div>
  );
}

export default App;
