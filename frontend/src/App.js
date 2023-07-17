import { useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, useNavigate, Routes, Route} from 'react-router-dom'
import './App.css';
import { Autocomplete, TextField, Paper, Box, CircularProgress } from "@mui/material";
import Movie from './Movie.js'
export const AppContext = createContext()
function App() {
const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:8081/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
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
    
    <div className="App">
      <Box className="boxes-container" sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, marginBottom: 6 }}>
        {movies.map((movie, index) => (
          <Box component={Paper} sx={{width: 200, height: 100, margin: 2,
          ':hover': {
            boxShadow: '0 0 11px rgba(33,33,33,.2)', 
            cursor: 'pointer' 
          } }} key={index} elevation={3}
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
        renderInput={(params) => <TextField {...params} label="Movie" variant="outlined" />}
        onInputChange={(event, newInputValue) => {
          setMovies(
            movies.filter((movie) =>
              movie.title.toLowerCase().includes(newInputValue.toLowerCase())
            )
          );
        }}
      />
    </div>
     
    <AppContext.Provider value={movies}>

        <Routes>
            <Route path="/movie/:title" element={<Movie/>}/>
        </Routes>
      </AppContext.Provider>
      
  </Router>
    
  );
}

export default App;
