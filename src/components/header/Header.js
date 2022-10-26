import { useState , useEffect} from "react";
import movieApi from "../../constants/movieApi";
import { ENDPOINTS, TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import './header.css'
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images'

const Header = () => {
    const [term, setTerm] = useState('')
    const [searchResults, setsearchResults] = useState({})
    const [pagination, setPagination] = useState({
        previous:0,
        current : 0,
        next : 0,
        totalPages: 0
    })


    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(term === '') {
            return alert('Please enter search term')
        }

        search(term, 1)
    }

    const search = async (term, page) => {
        const response = await movieApi.get(
            `/search/movie?page=${page}&query=${term}`
        );
        
        setsearchResults(response.data)
        console.log(response.data)
        setPagination({
            previous: Number(response.data.page) - 1,
            current : response.data.page,
            next : Number(response.data.page) + 1,
            totalPages: response.data.total_pages
        })
    }

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

    const changePage = (page) => {
        search(term, page)
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
                {searchResults.results !== undefined ? ( searchResults.results.map((item, index) => {
                    
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