import { useState, useEffect } from "react";
import './header.css';
import { useDispatch } from "react-redux";
import { fetchMoviesData } from "../../redux/actions/movieActions";
import { addSearchTerm } from "../../redux/actions/searchActions";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch() 
    const location = useLocation()
    const navigate = useNavigate()
    const {searchWord, displayHeader} = props
    
    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(searchTerm === '') {
            return alert('Please enter search term')
        }
        dispatch(addSearchTerm(searchTerm))
        search(searchTerm, 1)
    
        //console.log(location.pathname);
        if(location.pathname !== '/search') {
            navigate('/search', { state : searchTerm})
        }
    }

    const search = (searchTerm, page) => {
        dispatch(fetchMoviesData(searchTerm, page))
    }

    useEffect(() => {
        if (searchTerm === '' && searchWord !== undefined) {
            setSearchTerm(searchWord)
        }
    },[])

    return (
        <div className='header'>
            <div className="app-name" onClick={() => navigate('/')}>
                <h4>Movie App</h4>
            </div>
            { displayHeader &&
                <div className='search-bar'>
                    <form onSubmit={submitHandler}>
                        <input type="text" value={searchTerm} placeholder="Search Movies or Shows" onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="submit"><i className='fa fa-search'></i></button>
                    </form>
                </div>
            }
        </div> 
    )
}

export default Header