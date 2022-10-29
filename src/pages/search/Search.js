import { useState , useEffect} from "react";
import './search.css';
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import Header from "../../components/header/Header";
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images'
import { useDispatch } from "react-redux";
import { fetchMoviesData, removeMoviesData } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import { useLocation, Link } from "react-router-dom";


const Search = () => {
    const [pagination, setPagination] = useState({
        firstPage: false,
        previous: false,
        current : false,
        next : false,
        lastPage : false,
        totalPages: false,
    })
    const {state } = useLocation();
    const moviesData = useSelector((state) => state.moviesState)
    const dispatch = useDispatch()
    const searchTerm = useSelector((state) => state.searchState.term)

    useEffect(() => {
      if (moviesData.isLoaded === true) {
         const {page, total_pages} = moviesData.data
        setPagination({
            firstPage: page > 2 ? 1 : false,
            previous: page > 1 ? Number(page) - 1 : false,
            current : page,
            next : (Number(page) + 1) <= total_pages ? Number(page) + 1 : false,
            lastPage: (Number(page) + 1) < total_pages ? total_pages : false,
            totalPages: total_pages
        })
      }

    }, [moviesData.isLoaded])


    const changePage = (page) => {
        search(searchTerm, page)
    }

    const search = (searchTerm, page) => {
       dispatch(fetchMoviesData(searchTerm, page))
    }

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

  return (
    <>
        <Header searchWord={state} displayHeader={true}/>
        {moviesData.fetching && <Spinner />}
        <div>
            <div className="card-container">
                { moviesData.status ? ( moviesData.data?.results?.map((item, index) => {
                    
                    return <div className="card-item" key={index}>
                                <Link to={`/movie/${item.id}`}>
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
                                </Link>
                            </div>
                })) : (
                <div className="no-result">
                        <h3>{moviesData?.message}</h3>
                </div> )
                }
            </div>
  
            { (moviesData.status && moviesData.data?.results?.length !== 0) &&
                <div className="pagination-container">
                    <div className="pagination">
                      { pagination.firstPage  && <button onClick={() => changePage(pagination.firstPage)}>First</button>}
                      { pagination.previous  && <button className="previous" onClick={() => changePage(pagination.previous)}></button>}
                      { pagination.current && <span>{pagination.current}</span> }
                      { pagination.next &&  <button className="next" onClick={() => changePage(pagination.next)}></button> }
                      { pagination.lastPage &&  <button onClick={() => changePage(pagination.lastPage)}>Last</button> }
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default Search