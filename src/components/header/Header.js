import { useState, useEffect, useRef } from "react";
import './header.css';
import { useDispatch } from "react-redux";
import { fetchMoviesData } from "../../redux/actions/movieActions";
import { addSearchTerm } from "../../redux/actions/searchActions";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Header = (props) => {
    //const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch(); 
    const location = useLocation();
    const navigate = useNavigate();
    const {searchWord, displaySearch} = props;
    const searchRef = useRef();
    
    const submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // if(searchTerm === '') {
        //     return alert('Please enter search term');
        // }
        // dispatch(addSearchTerm(searchTerm));
        // search(searchTerm, 1);

        const value = searchRef.current.value;
        dispatch(addSearchTerm(value));
        search(value, 1);
    
        //console.log(location.pathname);
        if(location.pathname !== '/search') {
            navigate('/search', { state : value});
        }

        //searchRef.current.value = ""; //removing value from seach input
    }

    const search = (term, page) => {
        dispatch(fetchMoviesData(term, page));
    }

    console.log('Header load');

    useEffect(() => {
        if (searchRef.current.value === '' && searchWord !== undefined) {
            //setSearchTerm(searchWord);
            searchRef.current.value = searchWord;
        }
    },[]);

    return (
        <div className="header">
            <div className='header-container'>
                <div className="app-name" onClick={() => navigate('/')}>
                    <h4>Movie App</h4>
                </div>
                { displaySearch &&
                    (<div className='search-bar'>
                        <form onSubmit={submitHandler}>
                            {/* <input type="text" value={searchTerm} placeholder="Search Movies" onChange={(e) => setSearchTerm(e.target.value)} /> */}
                            <input type="text" ref={searchRef} placeholder="Search Movies" />
                            <button type="submit"><FaSearch /></button>
                        </form>
                    </div>)
                }
            </div>
        </div> 
    );
}

Header.defaultProps = {
    displaySearch: false,
};

export default Header;