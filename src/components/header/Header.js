import { useState } from "react";
import './header.css'
import { useDispatch } from "react-redux";
import { fetchMoviesData } from "../../redux/actions/movieActions";
import { addSearchTerm } from "../../redux/actions/searchActions";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(searchTerm === '') {
            return alert('Please enter search term')
        }
        dispatch(addSearchTerm(searchTerm))
        search(searchTerm, 1)
    }

    const search = (searchTerm, page) => {
        dispatch(fetchMoviesData(searchTerm, page))
    }

    return (
        <div className='header'>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input type="text" value={searchTerm} placeholder="Search Movies or Shows" onChange={(e) => setSearchTerm(e.target.value)} />
                    <button type="submit"><i className='fa fa-search'></i></button>
                </form>
            </div>
        </div> 
    )
}

export default Header