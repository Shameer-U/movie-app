import { useState , useEffect} from "react";
import { ENDPOINTS, TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import './header.css'
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images'
import { useDispatch } from "react-redux";
import { fetchMovieData, removeMovieData } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";

const Header = () => {
    const [term, setTerm] = useState('')
    const [pagination, setPagination] = useState({
        previous:0,
        current : 0,
        next : 0,
        totalPages: 0
    })
    const movieData = useSelector((state) => state.movieReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (movieData.length != 0) {
            setPagination({
                previous: Number(movieData.page) - 1,
                current : movieData.page,
                next : Number(movieData.page) + 1,
                totalPages: movieData.total_pages
            })
        }

        return () => {
            dispatch(removeMovieData());
        }
    }, [])


    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(term === '') {
            return alert('Please enter search term')
        }

        search(term, 1)
    }

    const search = (term, page) => {
        dispatch(fetchMovieData(term, page))
    }

    const changePage = (page) => {
        search(term, page)
    }

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

    return (
        <>
        <div className='header'>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input type="text" value={term} placeholder="Search Movies or Shows" onChange={(e) => setTerm(e.target.value)} />
                    <button type="submit"><i className='fa fa-search'></i></button>
                </form>
            </div>
        </div> 
        <div>
            <div className="card-container">
                {movieData.movies.length !== 0 ? ( movieData.movies.map((item, index) => {
                    
                    return <div className="card-item">
                                <div className="card-inner">
                                    <div className="card-top">
                                        <img className="card-poster" src={`${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`} alt='' />
                                        <div className='card-rating'>
                                            <img src={IMAGES.IMDB} />
                                            <span >{item.vote_average}</span>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <div className="movie-title">
                                            <h4>{(item.title.length > 40) ? item.title.substring(0, 40) + '...' : item.title}</h4>
                                        </div>
                                        <div className="movie-subtitle">
                                            <p>{getLanguage(item.original_language).english_name}</p>
                                            <span><i className='fa fa-heart'></i>{item.vote_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })) : 
                <div className="no-result">
                        <h3>No results found</h3>
                </div>
                }
            </div>
            {pagination.current !==0 &&
                <div className="pagination-container">
                    <div className="pagination">
                        <button onClick={() => changePage(pagination.previous)}>previous</button>
                        <span>{pagination.current}</span>
                        <button onClick={() => changePage(pagination.next)}>next</button>
                    </div>
                </div>
            }
        </div>
        </>
    )
}

export default Header