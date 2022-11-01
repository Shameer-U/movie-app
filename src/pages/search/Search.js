import { useState , useEffect} from "react";
import './search.css';
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { fetchMoviesData, removeMoviesData } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/movieCard/MovieCard";


const Search = () => {
    const [pagination, setPagination] = useState({
        firstPage: false,
        previous: false,
        current : false,
        next : false,
        lastPage : false,
        totalPages: false,
    });
    const {state } = useLocation(); // searchTerm from Home page
    const moviesData = useSelector((state) => state.moviesState);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.searchState.term);

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

    }, [moviesData.isLoaded]);


    const changePage = (page) => {
        search(searchTerm, page)
    }

    const search = (searchTerm, page) => {
       dispatch(fetchMoviesData(searchTerm, page))
    }

  return (
    <>
        <Header searchWord={searchTerm} displayHeader={true}/>
        {moviesData?.fetching && <Spinner />}
        <div>
            <div className="card-container">
                { moviesData?.status ? ( moviesData?.data?.results?.map((item, index) => {
                       return <MovieCard item={item} index={index}/>
                })) : (
                <div className="no-result">
                        <h3>{moviesData?.message}</h3>
                </div> )
                }
            </div>
  
            { (moviesData?.status && moviesData?.data?.results?.length !== 0) &&
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