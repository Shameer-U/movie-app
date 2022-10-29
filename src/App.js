import './App.css';
import Search from './pages/search/Search';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieDetail from './pages/movieDetail/MovieDetail';

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={ <Home /> } />
                <Route path="/search" element={ <Search /> } />
                <Route path="/movie/:movieId" element={ <MovieDetail /> } />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
