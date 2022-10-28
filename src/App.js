import './App.css';
import Search from './pages/search/Search';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={ <Home /> } />
                <Route path="/search" element={ <Search /> } />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
