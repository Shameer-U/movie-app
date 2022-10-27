import { useState , useEffect} from "react";
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import Header from "../../components/header/Header";
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images'
import { useDispatch } from "react-redux";
import { fetchMoviesData, removeMoviesData } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Spinner from "../../components/spinner/Spinner";


const Search = () => {
    const [pagination, setPagination] = useState({
        previous:0,
        current : 0,
        next : 0,
        totalPages: 0
    })
    const moviesData = useSelector((state) => state.moviesState)
    const dispatch = useDispatch()
    const searchTerm = useSelector((state) => state.searchState.term)

    useEffect(() => {
      if (moviesData.fetching == false) {
        setPagination({
            previous: Number(moviesData.data.page) - 1,
            current : moviesData.data.page,
            next : Number(moviesData.data.page) + 1,
            totalPages: moviesData.data.total_pages
        })
      }
    }, [moviesData.fetching])


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
        <Header/>
        {moviesData.fetching && <Spinner />}
        <div>
            <div className="card-container">
                { moviesData.status ? ( moviesData.data.results.map((item, index) => {
                    
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
                        <h3>{moviesData?.message}</h3>
                </div>
                }
            </div>
  
            { (moviesData.status && moviesData.data.results.length !== 0) &&
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

export default Search